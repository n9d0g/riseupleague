import { getUserPlayerPayment } from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { getRegisterDivisionById } from "@/api-helpers/controllers/divisions-controller";
import { connectToDatabase } from "@/api-helpers/utils";

export default async function Success({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	const resDivision = await getRegisterDivisionById(params.id);
	const { division } = await resDivision.json();
	const session = await getServerSession();
	if (!session || !session.user) {
		redirect("/");
	}

	return (
		<main className="font-barlow container  mx-auto min-h-[100dvh] text-white">
			<h1 className=" mt-5 text-center text-4xl font-bold uppercase md:mt-20 md:text-6xl">
				You have successfully registered your team!{" "}
			</h1>
			<h2 className=" mt-2 text-center text-2xl font-semibold uppercase text-neutral-300 md:text-3xl">
				An email has been sent to {session.user.email}
			</h2>

			<h3 className=" mt-10 text-3xl uppercase">Season Summary </h3>
			<ul className="rounded border-neutral-600 uppercase text-white">
				<li>Division: {division.divisionName}</li>
				<li>Arena: {division.location}</li>
				<li>
					Game Days: {division.day} at {division.startTime} - {division.endTime}
				</li>
				<li>Season Length: 7 Regular games + 1 guaranteed playoff game</li>
			</ul>

			<h3 className=" mt-10 text-3xl uppercase">Registration Next Steps</h3>

			<section className="mt-10 flex flex-col gap-10 md:flex-row">
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">Team Jersey</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>
							Customize your team's jersey. You decide your own colors and
							designs!
						</p>
					</div>
					<Button className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
						Coming Soon
					</Button>
				</div>
				<div className="flex flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
					<div>
						<h3 className=" text-2xl font-semibold uppercase ">
							Team's Schedule
						</h3>
						<Separator
							orientation="horizontal"
							className="mb-3 mt-1 bg-white"
						/>{" "}
						<p>You decide on what time your team will play in. </p>{" "}
					</div>
					<Button className="font-barlow rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200">
						Coming Soon
					</Button>
				</div>
			</section>
		</main>
	);
}
