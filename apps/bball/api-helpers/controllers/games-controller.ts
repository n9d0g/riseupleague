import { NextResponse } from "next/server";
import Game from "@/api-helpers/models/Game";
import Team from "@/api-helpers/models/Team";
import Season from "@/api-helpers/models/Season";

export const getAllUpcomingGames = async () => {
	try {
		// const activeSeason = await Season.find({ active: "true" });

		const games = await Game.find({ status: false })
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.select("status homeTeam awayTeam division date gameName location")
			.limit(12);

		const allUpcomingGames = games.map((game) => ({
			...game.toObject(), // Convert the Mongoose document to a plain JavaScript object
			date: new Date(game.date).toLocaleDateString("en-US", {
				timeZone: "America/Toronto",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		}));
		return NextResponse.json({ allUpcomingGames });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllPastGames = async () => {
	try {
		const games = await Game.find({ status: true })
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select: "teamName teamNameShort",
			})
			.populate({
				path: "awayTeam",
				select: "teamName teamNameShort",
			})
			.select(
				"status homeTeam awayTeam homeTeamScore awayTeamScore division date gameName location"
			)
			// .sort({ date: -1 }) // Sort by date in descending order (most recent first)
			.limit(12);

		const allPastGames = games.map((game) => ({
			...game.toObject(), // Convert the Mongoose document to a plain JavaScript object
			date: new Date(game.date).toLocaleDateString("en-US", {
				timeZone: "America/Toronto",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		}));
		return NextResponse.json({ allPastGames });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getGamesByDate = async () => {
	try {
		const activeSeason = await Season.find({ active: "true" });

		// Retrieve all games (you can add any necessary filters)
		const allGames = await Game.find({ status: false })
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.populate({
				path: "awayTeam",
				select:
					"teamName teamNameShort primaryColor secondaryColor tertiaryColor",
			})
			.select("status homeTeam awayTeam division date gameName location");

		// Combine grouping and sorting of games
		const gamesByDate = allGames.reduce((accumulator, game) => {
			const date = new Date(game.date);
			const formattedDate = date.toLocaleDateString("en-US", {
				timeZone: "America/Toronto",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});

			// Find the dateObject or create a new one
			const dateObject = accumulator.find(
				(obj) => obj.date === formattedDate
			) || {
				date: formattedDate,
				games: [],
			};

			// Push the game into the dateObject's games array
			dateObject.games.push(game);

			// Sort the dateObject's games array by time
			dateObject.games.sort((game1, game2) => {
				const time1 = new Date(game1.date).getTime(); // Get the timestamp
				const time2 = new Date(game2.date).getTime(); // Get the timestamp
				return time1 - time2;
			});

			// If the dateObject is not already in the accumulator, add it
			if (!accumulator.includes(dateObject)) {
				accumulator.push(dateObject);
			}

			return accumulator;
		}, []);

		// Return the gamesByDate as the response
		return NextResponse.json({ gamesByDate });

		// Return the gamesByDate as the response
		return NextResponse.json({ gamesByDate });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getGameById = async (id) => {
	try {
		const game = await Game.findById(id)
			.populate({
				path: "homeTeam",
				select: "teamName teamNameShort wins losses averageStats",
				populate: [
					{
						path: "players",
						select: "playerName averageStats jerseyNumber",
						options: { sort: { date: -1 } },
						populate: {
							path: "allStats",
							match: { gameId: id },
							options: { limit: 1 },
						},
					},
					{
						path: "seasonStatistics",
						match: { gameId: id },
						options: { limit: 1 },
					},
				],
			})
			.populate({
				path: "awayTeam",
				select: "teamName teamNameShort wins losses averageStats",
				populate: [
					{
						path: "players",
						select: "playerName averageStats jerseyNumber",
						options: { sort: { date: -1 } },
						populate: {
							path: "allStats",
							match: { gameId: id },
							options: { limit: 1 },
						},
					},
					{
						path: "seasonStatistics",
						match: { gameId: id },
						options: { limit: 1 },
					},
				],
			})
			.populate("division", "divisionName")
			.populate("season", "seasonName");

		if (!game) {
			return NextResponse.json(
				{ message: "Internal Server Error" },
				{ status: 500 }
			);
		}
		return NextResponse.json({ game });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};

export const getAllPlayersOfTheWeek = async () => {
	try {
		const allPlayersOfTheWeek = await Game.find({ status: true })
			.populate({
				path: "playerOfTheGame",
				select: "playerName jerseyNumber team division averageStats allStats",
			})
			.populate({
				path: "division",
				select: "divisionName",
			})
			.populate({
				path: "homeTeam",
				select: "teamNameShort",
			})
			.populate({
				path: "awayTeam",
				select: "teamNameShort",
			})
			.select("homeTeam awayTeam gameName");

		return NextResponse.json({ allPlayersOfTheWeek });
	} catch (e) {
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
};
