import Image from "next/image";
import Link from "next/link";
import thirtyPtBadge from "@/public/images/badges/thirtyPtBadge.svg";
import twentyPtBadge from "@/public/images/badges/twentyPtBadge.svg";

export default function PlayerCard({ player }) {
	let badges = new Array(5).fill("");

	const allStats = player.allStats;
	let avgStats = [
		{
			label: "APG",
			average: player.averageStats.assists,
		},
		{
			label: "RPG",
			average: player.averageStats.rebounds,
		},
		{
			label: "BPG",
			average: player.averageStats.blocks,
		},
		{
			label: "SPG",
			average: player.averageStats.steals,
		},
	].sort((a, b) => (a.average < b.average ? 1 : -1));

	avgStats = [
		{
			label: "PPG",
			average: player.averageStats.points,
		},
		...avgStats,
	];

	// 20 pt game
	if (allStats.filter((game) => game.points >= 20).length > 0) {
		badges.unshift(twentyPtBadge.src);
		badges.pop();
	}

	// 30 pt game
	if (allStats.filter((game) => game.points >= 30).length > 0) {
		badges.unshift(thirtyPtBadge.src);
		badges.pop();
	}

	return (
		<div className="h-fit rounded border border-neutral-600 bg-neutral-700">
			{/* pic / name / team / division */}
			<div className="flex justify-between border-b border-neutral-600 px-6 py-3.5">
				<div className="flex items-center gap-3">
					<figure className="h-[52px] w-[52px] rounded-full bg-[#d9d9d9]"></figure>
					<div>
						<h6 className="font-barlow font-medium uppercase text-neutral-500">
							team {player.team.substring(0, 5)}... | #{player.jerseyNumber}
						</h6>
						<Link
							href={`/players/${player._id}`}
							className="font-barlow text-2xl uppercase text-neutral-100 transition hover:opacity-80"
						>
							{player.playerName}
						</Link>
					</div>
				</div>
				<div>
					<div className="flex justify-center rounded-md bg-neutral-600 px-4 py-1">
						<p className="font-barlow text-xs font-medium uppercase">div</p>
					</div>
				</div>
			</div>

			{/* stats table */}
			<div className=" flex h-[112px] items-center justify-center border-b border-neutral-600">
				<p className="font-barlow text-xl uppercase">table</p>
			</div>

			{/* badges */}
			<div className="flex justify-center gap-x-2 border-b border-neutral-600 px-5 py-3">
				{badges.map((badge, index) => {
					const hasBadge = badge.length > 0;

					return (
						<div
							className={`flex h-[60px] w-[60px] justify-center rounded-xl bg-neutral-600 ${
								hasBadge &&
								"cursor-pointer transition hover:scale-150 hover:border hover:border-neutral-300"
							}`}
							key={index}
						>
							{hasBadge ? (
								<Image
									src={badge}
									alt={""}
									width={200}
									height={200}
									className="h-full w-auto"
								/>
							) : (
								""
							)}
						</div>
					);
				})}
			</div>

			{/* avg stats */}
			<div className="flex justify-center gap-4 border-b border-neutral-600 px-4 py-3">
				{avgStats.slice(0, 3).map((stat, index) => (
					<div
						key={index}
						className="font-barlow flex w-full flex-col justify-center rounded-lg bg-neutral-600 py-4"
					>
						<h6 className="text-center">{stat.label}</h6>
						<h3 className="text-center text-[31px] font-medium">
							{stat.average}
						</h3>
					</div>
				))}
			</div>

			{/* view player profile */}
			<div className="px-2.5 py-4">
				<Link
					href={`/players/${player._id}`}
					className="font-barlow flex h-[38px] w-full items-center justify-center rounded bg-neutral-100 font-semibold text-black transition hover:-translate-y-1"
				>
					View Player Profile
				</Link>
			</div>
		</div>
	);
}
