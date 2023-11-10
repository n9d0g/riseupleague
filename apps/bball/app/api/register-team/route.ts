import { NextResponse } from "next/server";

import { connectToDatabase } from "@/api-helpers/utils";
import Team from "@/api-helpers/models/Team";
import Division from "@/api-helpers/models/Division";

export async function POST(req: Request) {
	try {
		await connectToDatabase();

		// Extract user data from the request body
		const { teamName, teamNameShort, teamCode, division, season } =
			await req.json();

		// Check for required input fields
		console.log(teamName, teamNameShort, teamCode, division, season);
		if (
			!teamName ||
			teamName.trim() === "" ||
			!teamNameShort ||
			teamNameShort.trim() === "" ||
			!teamCode ||
			teamCode.trim() === "" ||
			!division ||
			!season
		) {
			return NextResponse.json({ message: "Invalid Inputs" }, { status: 422 });
		}

		const newTeam = new Team({
			paid: false,
			teamName,
			teamNameShort,
			teamCode,
			wins: 0,
			losses: 0,
			pointDifference: 0,
			averageStats: {
				points: 0,
				rebounds: 0,
				assists: 0,
				blocks: 0,
				steals: 0,
				threesMade: 0,
				twosMade: 0,
				freeThrowsMade: 0,
			},
			division: division,
			season: season,
		});

		// Save the new team to the database
		const savedTeam = await newTeam.save();
		const updatedDivision = await Division.findById(division);
		console.log(updatedDivision);
		updatedDivision.teams = updatedDivision.teams.concat(savedTeam._id);
		await updatedDivision.save();

		return NextResponse.json({ team: savedTeam }, { status: 201 });
	} catch (error) {
		console.error("Error during user registration:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
