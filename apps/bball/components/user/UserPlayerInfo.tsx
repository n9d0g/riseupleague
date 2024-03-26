"use client";

import { useState } from "react";
import { updatePlayer } from "@/actions/player-actions";
import { Loader2 } from "lucide-react";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/components/use-toast";
import UserPlayerJerseyInfo from "./UserPlayerJerseyInfo";
import UserPlayerSeasonInfo from "./UserPlayerSeasonInfo";
import { useFormStatus } from "react-dom";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";

const UserPlayerInfo = ({ player }) => {
	const { toast } = useToast();
	const [playerInfo, setPlayerInfo] = useState(player);
	const [errors, setErrors] = useState([]);
	const [open, setOpen] = useState(false);

	const customizeJersey = player.register || player.freeAgent;

	const handleUpdatePlayer = async (playerData: FormData) => {
		const result = await updatePlayer(player._id, playerData);

		// invalid fields + keep sheet open
		if (result?.status === 422) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});

			const errorsArray = Object.values(result.errors);
			return setErrors(errorsArray);
		}

		// no player found
		if (result?.status === 404) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}

		// internal server error
		if (result?.status === 500) {
			toast({
				variant: "destructive",
				title: "Error",
				description: result.message,
			});
		}

		// successfully updated player info
		if (result?.status === 200) {
			toast({
				variant: "success",
				title: "Success!",
				description: result.message,
			});

			setPlayerInfo({
				...playerInfo,
				playerName: playerData.get("playerName") as string,
				instagram: playerData.get("instagram") as string,
				jerseyName: playerData.get("jerseyName") as string,
				jerseyNumber: playerData.get("jerseyNumber") as string,
				jerseySize: playerData.get("jerseySize") as string,
				shortSize: playerData.get("shortSize") as string,
			});
		}

		setErrors([]);
		setOpen(false);
	};

	return (
		<div className="font-barlow grid grid-cols-1 gap-4 uppercase sm:grid-cols-2">
			<div className="order-last sm:order-first">
				<UserPlayerSeasonInfo player={playerInfo} />

				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button className="my-4 w-full" onClick={() => setOpen(!open)}>
							Edit Player
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-full bg-neutral-900">
						<form action={handleUpdatePlayer}>
							<SheetHeader>
								<SheetTitle className="font-barlow text-2xl uppercase">
									Edit Player
								</SheetTitle>
								<SheetDescription className="text-sm text-neutral-500">
									Please note that there will be a deadline (TBD) to change your
									custom jersey information. After this deadline, we will not be
									able to change it. Stay tuned to our socials to be notified!
								</SheetDescription>
							</SheetHeader>
							<div className="font-barlow">
								<div className="mt-4 flex flex-col gap-4">
									<div className="flex flex-col gap-3">
										<Label htmlFor="playerName" className="uppercase">
											Player Name
										</Label>
										<Input
											type="text"
											name="playerName"
											id="playerName"
											defaultValue={playerInfo?.playerName}
											className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
										/>
									</div>
									<div className="flex flex-col gap-3">
										<Label htmlFor="instagram" className="uppercase">
											Instagram
										</Label>
										<Input
											type="text"
											name="instagram"
											id="instagram"
											defaultValue={playerInfo?.instagram}
											className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
										/>
									</div>

									{customizeJersey && (
										<>
											<div className="flex flex-col gap-3">
												<Label htmlFor="jerseyName" className="uppercase">
													Custom Jersey Name
												</Label>
												<Input
													type="text"
													name="jerseyName"
													id="jerseyName"
													defaultValue={playerInfo?.jerseyName}
													className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
												/>
											</div>

											<div className="flex flex-col gap-3">
												<Label htmlFor="jerseyNumber" className="uppercase">
													Jersey Number
												</Label>
												<Input
													type="number"
													name="jerseyNumber"
													id="jerseyNumber"
													defaultValue={playerInfo?.jerseyNumber}
													min="0"
													className="font-barlow border border-neutral-600 bg-neutral-900 p-2 uppercase"
												/>
											</div>
											<div className="flex flex-col gap-3">
												<Label htmlFor="jerseySize" className="uppercase">
													Jersey Size
												</Label>
												<select
													name="jerseySize"
													id="jerseySize"
													defaultValue={playerInfo?.jerseySize}
													className="rounded border border-neutral-600 bg-neutral-900 p-2"
												>
													<option value="SM">SM</option>
													<option value="MD">MD</option>
													<option value="LG">LG</option>
													<option value="XL">XL</option>
													<option value="XXL">XXL</option>
													<option value="XXXL">XXXL</option>
													<option value="XXXXL">XXXXL</option>
												</select>
											</div>
											<div className="flex flex-col gap-3">
												<Label htmlFor="shortSize" className="uppercase">
													Short Size
												</Label>
												<select
													name="shortSize"
													id="shortSize"
													defaultValue={playerInfo?.shortSize}
													className="rounded border border-neutral-600 bg-neutral-900 p-2"
												>
													<option value="SM">SM</option>
													<option value="MD">MD</option>
													<option value="LG">LG</option>
													<option value="XL">XL</option>
													<option value="XXL">XXL</option>
													<option value="XXXL">XXXL</option>
													<option value="XXXXL">XXXXL</option>
												</select>
											</div>
										</>
									)}
								</div>
							</div>
							<SheetFooter className="mt-10 flex gap-2">
								<SubmitButton />
							</SheetFooter>
						</form>

						{errors.length > 0 && (
							<div className="my-4">
								{errors.map((error) => (
									<p key={error} className="text-primary text-base">
										{error}
									</p>
								))}
							</div>
						)}
					</SheetContent>
				</Sheet>
			</div>

			<UserPlayerJerseyInfo player={playerInfo} />
		</div>
	);
};

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		// <SheetClose asChild>
		<Button type="submit" disabled={pending} className="w-full">
			{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
		</Button>
		// </SheetClose>
	);
};

export default UserPlayerInfo;
