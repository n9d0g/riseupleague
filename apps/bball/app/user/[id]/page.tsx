import {
	getCurrentUser,
	getUserPlayerPayment,
} from "@/api-helpers/controllers/users-controller";
import { Separator } from "@ui/components/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@ui/components/button";
import { connectToDatabase } from "@/api-helpers/utils";
import { Metadata } from "next";
import UserProfile from "@/components/user/UserProfile";

export const metadata: Metadata = {
	title: "Rise Up League | User",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default async function User({
	params,
}: {
	params: { id: string };
}): Promise<JSX.Element> {
	await connectToDatabase();
	const session = await getServerSession();

	if (!session || !session.user) redirect("/");

	const resUser = await getCurrentUser(session.user.email);
	const { user } = await resUser.json();

	return (
		<section className="container mx-auto">
			<h1 className="mb-40">{session.user.name}&apos;s Profile</h1>
			{/* <p className="text-primary flex h-[50dvh] items-center justify-center text-center text-2xl">
				We&apos;re still updating your personal user page. Please come back at a
				later time.
			</p> */}

			<UserProfile session={session} user={user} />
		</section>
	);
}
