import Hero from "@/components/home/hero";
import FeaturedSponsors from "@/components/home/featured-sponsors";
import AboutRiseUp from "@/components/home/about-rise-up";
import PlayersOfTheWeek from "@/components/home/players-of-the-week";
import LatestGames from "@/components/home/latest-games";
import MVPLadder from "@/components/home/mvp-ladder";
import Socials from "@/components/home/socials";
import FAQs from "@/components/home/faqs";
import ContactUs from "@/components/home/contact-us";

export default function Page(): JSX.Element {
	return (
		<div className="container mx-auto min-h-[100dvh]">
			{/* hero */}
			<Hero />

			{/* featured sponsors */}
			<FeaturedSponsors />

			{/* about */}
			<AboutRiseUp />

			{/* players of the week */}
			<PlayersOfTheWeek />

			{/* latest games */}
			<LatestGames />

			{/* mvp ladder */}
			<MVPLadder />

			{/* socials */}
			<Socials />

			{/* faqs */}
			<FAQs />

			{/* contact us */}
			<ContactUs />

			{/* register */}
		</div>
	);
}
