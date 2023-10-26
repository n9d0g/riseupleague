"use client";

import { useState, useEffect } from "react";
import FilterByDivision from "../filters/FilterByDivision";
import FilterByTeam from "../filters/FilterByTeam";
import ScheduleCard from "./ScheduleCard";
import FilterAll from "../filters/FilterAll";
import { Button } from "@ui/components/button";
import CloseX from "../general/icons/CloseX";

export default function ScheduleFilterPage({
	gamesByDate,
	divisionsNameAndId,
	teamsNameDivisionAndId,
	divisionParams,
	teamsParams,
	initialDivisionCheckboxState,
	initialTeamCheckboxState,
}) {
	const [allGames, setAllGames] = useState(gamesByDate);
	const [teamCheckboxState, setTeamCheckboxState] = useState(
		initialTeamCheckboxState
	);
	const [divisionCheckboxState, setDivisionCheckboxState] = useState(
		initialDivisionCheckboxState
	);

	console.log(allGames);

	const [closeDivisions, setCloseDivisions] = useState(divisionParams);
	const [closeTeams, setCloseTeams] = useState(teamsParams);

	// Use a useEffect to handle filtering when selectedDivisions or selectedTeams change
	useEffect(() => {
		// Use the selected divisions and teams to filter gamesByDate

		if (closeDivisions.length !== 0 || closeTeams.length !== 0) {
			const filteredGamesByDate = gamesByDate.map((dateObject) => ({
				...dateObject,
				games: dateObject.games.filter((game) => {
					// Check if the game's division ID is in the selected divisions array
					const divisionMatch = closeDivisions.includes(
						game.division.divisionName
					);

					// Check if the game's team ID (awayTeam or homeTeam) is in the selected teams array
					const teamMatch =
						closeTeams.includes(game.awayTeam.teamName) ||
						closeTeams.includes(game.homeTeam.teamName);

					// Return the game if it matches either the selected divisions or selected teams
					return divisionMatch || teamMatch;
				}),
			}));

			setAllGames(filteredGamesByDate);
		}
	}, []);

	const handleFilterChange = ({ divisions, teams }) => {
		// Use the selected divisions and teams to filter gamesByDate
		const selectedTeams = Object.keys(teams).filter((teamId) => teams[teamId]);
		const selectedDivisions = Object.keys(divisions).filter(
			(divisionId) => divisions[divisionId]
		);

		setCloseDivisions(selectedDivisions);
		setCloseTeams(selectedTeams);

		// Construct the query parameters for the URL
		const queryParams = [];
		if (selectedDivisions.length > 0) {
			queryParams.push(`divisions=${selectedDivisions.join(",")}`);
		}
		if (selectedTeams.length > 0) {
			queryParams.push(`teams=${selectedTeams.join(",")}`);
		}

		// Update the URL with the query parameters
		const newUrl =
			queryParams.length > 0 ? `/games?${queryParams.join("&")}` : "/games";
		window.history.pushState({}, "", newUrl);

		if (selectedTeams.length === 0 && selectedDivisions.length === 0) {
			setAllGames(gamesByDate);
		} else {
			const filteredGamesByDate = gamesByDate.map((dateObject) => ({
				...dateObject,
				games: dateObject.games.filter((game) => {
					// Check if the game's division ID is in the selected divisions array
					const divisionMatch = selectedDivisions.includes(
						game.division.divisionName
					);

					// Check if the game's team ID (awayTeam or homeTeam) is in the selected teams array
					const teamMatch =
						selectedTeams.includes(game.awayTeam.teamName) ||
						selectedTeams.includes(game.homeTeam.teamName);

					// Return the game if it matches either the selected divisions or selected teams
					return divisionMatch || teamMatch;
				}),
			}));

			// Now, filteredGamesByDate contains the filtered games
			setDivisionCheckboxState(divisions);

			setAllGames(filteredGamesByDate);
		}
	};

	const handleDivisionClick = (divisionId) => {
		const updatedDivisionState = {
			...divisionCheckboxState,
			[divisionId]: false,
		};

		setDivisionCheckboxState(updatedDivisionState);
		handleFilterChange({
			divisions: updatedDivisionState,
			teams: teamCheckboxState,
		});
	};

	const handleTeamClick = (teamId) => {
		const updatedTeamState = {
			...teamCheckboxState,
			[teamId]: false,
		};
		setTeamCheckboxState(updatedTeamState);
		handleFilterChange({
			divisions: divisionCheckboxState,
			teams: updatedTeamState,
		});
	};

	return (
		<div>
			<div className="mb-10 flex flex-col gap-5 md:flex-row">
				<FilterAll
					divisions={divisionsNameAndId}
					teams={teamsNameDivisionAndId}
					onFilterChange={handleFilterChange}
					teamCheckboxState={teamCheckboxState}
					divisionCheckboxState={divisionCheckboxState}
					setTeamCheckboxState={setTeamCheckboxState}
					setDivisionCheckboxState={setDivisionCheckboxState}
				/>
			</div>
			<div className="flex flex-wrap space-x-2">
				{closeDivisions.map((division) => (
					<Button
						variant="outline"
						size="sm"
						key={division}
						onClick={() => handleDivisionClick(division)}
						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
					>
						<CloseX /> {division}
					</Button>
				))}
				{closeTeams.map((team) => (
					<Button
						variant="outline"
						size="sm"
						key={team}
						onClick={() => handleTeamClick(team)}
						className="mb-4 flex items-center gap-2" // Adjust padding and margin as needed
					>
						<CloseX /> {team}
					</Button>
				))}
			</div>
			{allGames?.map((games) => {
				if (games.games.length === 0) {
					// If there are no games for this date, return nothing
					return null;
				}
				return (
					<div key={games.date}>
						<h3 className="font-barlow mb-8 mt-16  text-2xl uppercase">
							{games.date}
						</h3>
						<hr className="my-4 border border-neutral-600" />
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
							{games?.games.map((game, index) => {
								const isoDate = game.date;

								const date = new Date(isoDate);

								const time = date.toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								});
								return <ScheduleCard game={game} key={index} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
