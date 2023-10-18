import BarChart from "./BarChart";

const AdvanceStatistics = ({ player, allAvg }) => {
	return (
		<div className="mt-10">
			<div
				style={{ borderColor: "#282828" }}
				className="my-10 flex items-center justify-between border-b pb-5 pt-10 "
			>
				<h2 className="font-barlow text-2xl  font-semibold text-white ">
					Advanced Stats
				</h2>
			</div>

			<div className="flex w-full flex-col lg:flex-row">
				<BarChart
					stats={player.averageStats}
					allAvg={allAvg}
					avgLabel={`Average Player`}
					label={player.playerName}
				/>
			</div>
		</div>
	);
};

export default AdvanceStatistics;
