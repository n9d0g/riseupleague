import { getAllSeasons } from "@/api-helpers/controllers/seasons-controller";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	const resSeasons = await getAllSeasons();
	const { seasons } = await resSeasons.json();

	redirect(`/team-management/season/${seasons[seasons.length - 1]._id}`);
}

export const metadata: Metadata = {
	title: "Rise Up Admin | Team Management",
};
