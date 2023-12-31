"use client";

import React from "react";
import BarChart from "./BarChart";
import PointsCircle from "./PointsCircle";
import ChevronUpIcon from "@/components/general/icons/ChevronUpIcon";

const AverageStatistics = ({ player, allAvg }) => {
	return (
		<div className="font-barlow">
			<div
				style={{ borderColor: "#282828" }}
				className="mb-10 flex items-center justify-between border-b pb-5 pt-10"
			>
				<h3>Average Statistics</h3>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				<div
					className="flex items-center justify-between border p-4 text-center"
					style={{ borderColor: "#292929" }}
				>
					<div className="-ml-2 sm:ml-0">
						<PointsCircle
							player={player}
							pointsAverage={player.averageStats?.points}
						/>
					</div>
					<ul className="flex flex-1 flex-col justify-between pl-4 sm:flex-row">
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span
									style={{ backgroundColor: "#E16B3D" }}
									className=" mr-2 inline-block h-2 w-2 rounded-full"
								></span>
								2PG
							</div>
							<span className="text-lg font-bold text-gray-300">
								{player.averageStats.twosMade.toFixed(1)}
							</span>
						</li>
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span
									className=" mr-2 inline-block h-2 w-2 rounded-full"
									style={{ backgroundColor: "    #FAFAFA" }}
								></span>
								3PG
							</div>
							<span className="text-lg font-bold text-gray-300">
								{player.averageStats.threesMade.toFixed(1)}
							</span>
						</li>
						<li className="mb-4 flex flex-1 flex-col items-center sm:mb-0">
							<div className="text-sm text-gray-300">
								<span
									style={{ backgroundColor: "#6366F1" }}
									className=" mr-2 inline-block h-2 w-2 rounded-full"
								></span>
								FTM/G
							</div>
							<span className="text-lg font-bold text-gray-300">
								{player.averageStats.freeThrowsMade.toFixed(1)}
							</span>
						</li>
					</ul>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div
						className="border p-4 text-center"
						style={{ borderColor: "#292929" }}
					>
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{player.averageStats.rebounds.toFixed(1)}
							<span className="absolute">
								{player.averageStats.rebounds > allAvg.rebounds && (
									<ChevronUpIcon />
								)}
							</span>
						</div>

						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Rebounds Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							RPG
						</div>
					</div>
					<div
						className="border p-4 text-center"
						style={{ borderColor: "#292929" }}
					>
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{player.averageStats.assists.toFixed(1)}{" "}
							<span className="absolute">
								{player.averageStats.assists > allAvg.assists && (
									<ChevronUpIcon />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Assists Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							APG
						</div>
					</div>
					<div
						className="border p-4 text-center"
						style={{ borderColor: "#292929" }}
					>
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{player.averageStats.blocks.toFixed(1)}{" "}
							<span className="absolute">
								{player.averageStats.blocks > allAvg.blocks && (
									<ChevronUpIcon />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Blocks Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							BPG
						</div>
					</div>
					<div
						className="border p-4 text-center"
						style={{ borderColor: "#292929" }}
					>
						<div className="relative text-xl font-bold text-white sm:text-3xl">
							{player.averageStats.steals.toFixed(1)}{" "}
							<span className="absolute">
								{player.averageStats.steals > allAvg.steals && (
									<ChevronUpIcon />
								)}
							</span>
						</div>
						<div className="hidden text-sm font-semibold text-gray-300 lg:block">
							Steals Per Game
						</div>
						<div className="block text-sm font-semibold text-gray-300 lg:hidden">
							SPG
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10">
				<div className="flex w-full flex-col lg:flex-row">
					<BarChart
						stats={player.averageStats}
						allAvg={allAvg}
						avgLabel={`Average Player`}
						label={player.playerName}
					/>
				</div>
			</div>
		</div>
	);
};

export default AverageStatistics;
