import { connectToDatabase } from "@/api-helpers/utils";
import FeaturedPlayerCard from "../general/FeaturedPlayerCard";
import { getAllPastGames } from "@/api-helpers/controllers/games-controller";

export default async function PlayersOfTheWeek(): Promise<JSX.Element> {
	await connectToDatabase();

	const resGames = await getAllPastGames();
	const { games } = await resGames.json();

	const playerOfTheGames = games
		?.map((game) => game.playerOfTheGame)
		.filter((player) => player !== undefined);

	return (
		<section className="font-barlow mb-8 text-neutral-100">
			<h3 className="my-6">players of the week</h3>
			<hr />
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
				{playerOfTheGames.map((player, index) => (
					<FeaturedPlayerCard player={player} key={index} />
				))}
			</div>
		</section>
	);
}
