import Hero from "@/components/home/hero";
import FeaturedSponsors from "@/components/home/FeaturedSponsors";
import AboutRiseUp from "@/components/home/AboutRiseUp";
import PlayersOfTheWeek from "@/components/home/PlayersOfTheWeek";
import LatestGames from "@/components/home/LatestGames";
import MVPLadder from "@/components/home/MVPLadder";
import ContactUs from "@/components/home/ContactUs";
import HomeRegister from "@/components/home/HomeRegister";
import SecondaryHeader from "@/components/structure/header/secondary-header";
import { Metadata } from "next";
import { connectToDatabase } from "@/api-helpers/utils";
import SetYourScheduleButton from "@/components/home/SetYourScheduleButton";
import { Suspense } from "react";
import SocialsSection from "@/components/home/SocialsSection";
import FAQs from "@/components/home/FAQs";

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function Page(): Promise<JSX.Element> {
	await connectToDatabase();

	return (
		<div className="container mx-auto min-h-[100dvh]">
			<Suspense fallback={null}>
				<SecondaryHeader />
			</Suspense>
			<SetYourScheduleButton />
			<Hero />
			<HomeRegister />
			{/* 
			<FeaturedSponsors />
			<AboutRiseUp /> */}
			<Suspense fallback={null}>
				<PlayersOfTheWeek />
			</Suspense>
			<LatestGames />
			{/* <MVPLadder /> */}
			<SocialsSection />
			<FAQs />
			<ContactUs />
		</div>
	);
}
