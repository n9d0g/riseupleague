import { Suspense } from "react";
import { Metadata } from "next";
import Hero from "@/components/home/hero";
import HomeRegister from "@/components/home/HomeRegister";
import SecondaryHeader from "@/components/structure/header/SecondaryHeader";
import SetYourScheduleButton from "@/components/home/SetYourScheduleButton";
import SecondaryHeaderSkeleton from "@/components/skeleton/SecondaryHeaderSkeleton";
import MVPLadderSkeleton from "@/components/skeleton/MVPLadderSkeleton";
import PlayersOfTheWeekSkeleton from "@/components/skeleton/PlayersOfTheWeekSkeleton";
import HomeLeaders from "@/components/home/HomeLeaders";
import HomeLeadersSkeleton from "@/components/skeleton/HomeLeadersSkeleton";
import HomeMVPLadder from "@/components/home/HomeMVPLadder";
import HomePlayersOfTheWeek from "@/components/home/HomePlayersOfTheWeek";
import HomeSocials from "@/components/home/HomeSocials";
import HomeFaq from "@/components/home/HomeFaq";
import HomeContactUs from "@/components/home/HomeContactUs";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Rise Up League | Home",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function Page(): JSX.Element {
	return (
		<div className="container mx-auto min-h-[100dvh]">
			{/* <Suspense fallback={<SecondaryHeaderSkeleton />}>
				<SecondaryHeader />
			</Suspense>
			<SetYourScheduleButton />
			<Hero />
			<HomeRegister />
			<Suspense fallback={<PlayersOfTheWeekSkeleton />}>
				<HomePlayersOfTheWeek />
			</Suspense>
			<Suspense fallback={<HomeLeadersSkeleton />}>
				<HomeLeaders />
			</Suspense>
			<Suspense fallback={<MVPLadderSkeleton />}>
				<HomeMVPLadder />
			</Suspense>
			<HomeSocials />
			<HomeFaq />
			<HomeContactUs /> */}
			<div className="flex h-[90dvh] flex-col items-center justify-center gap-2">
				<Image
					alt="Rise Up Logo"
					src="/images/riseup-logo.png"
					width={200}
					height={100}
					priority
				/>
				<h1>
					Site is currently under maintenance! <br /> Sorry for the
					inconvenience, please come back at a later time.
				</h1>
			</div>
		</div>
	);
}
