import ScheduleCard from "./ScheduleCard";

export default function HomeLatestGames({ games }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{games.reverse().map((game, index) => (
				<ScheduleCard game={game} key={index} />
			))}
		</div>
	);
}
