/* eslint-disable @next/next/no-img-element */
import { supabase } from "@/config/supabase";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useEnsName } from "wagmi";

export default function SetUsername({ userDetails }: { userDetails: User }) {
	const router = useRouter();

	function handleSetUsername(newUsername: string) {
		supabase
			.from("user")
			.update({ user_name: newUsername })
			.eq("wallet_address", userDetails.wallet_address)
			.then((res) => {
				if (res.error) {
					console.log("handle set username error", res.error);
				} else {
					console.log("handle set username works", res);
					router.reload();
				}
			});
	}

	function ENSName() {
		const { data, isError, isLoading } = useEnsName({
			address: userDetails.wallet_address as `0x${string}`,
			// address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		});

		useEffect(() => {
			console.log("ens", data, isError, isLoading);
		}, [data, isError, isLoading]);

		const [ensMatches, setEnsMatches] = useState<boolean | null>(null);

		useEffect(() => {
			async function checkEns() {
				await supabase
					.from("user")
					.select("*")
					.eq("user_name", data?.slice(0, -4))
					.then((res) => {
						if (res.data === null || res.data!.length === 0) {
							setEnsMatches(false);
						} else {
							console.log("user already exists");
							setEnsMatches(true);
						}
					});
			}

			if (data !== null) {
				checkEns();
			}
		}, [data]);

		return (
			<>
				{isLoading ? (
					<progress
						className="progress progress-accent w-56"
						value="40"
						max="100"
					></progress>
				) : data !== null ? (
					<div className="flex flex-row">
						<h2 className="card-title">
							<p className="text-primary">{data?.slice(0, -4)}</p>
							<p className="text-base-content">.eth</p>
						</h2>
						{ensMatches === null ? (
							<progress className="progress w-24 progress-accent"></progress>
						) : (
							<>
								{ensMatches ? (
									<button
										className="btn btn-primary mx-2"
										disabled
									>
										Set
									</button>
								) : (
									<button
										className="btn btn-primary mx-2"
										onClick={() => {
											handleSetUsername(
												data!?.slice(0, -4)
											);
										}}
									>
										Set
									</button>
								)}
							</>
						)}
					</div>
				) : (
					<h2 className="card-title">you dont have ens</h2>
				)}
			</>
		);
	}

	function TypeUsername() {
		const [usernameString, setUsernameString] = useState<string>("");

		const updateUsernameString = (event: {
			target: { value: React.SetStateAction<string> };
		}) => {
			setUsernameString(event.target.value);
		};

		return (
			<div className="flex flex-row">
				<div className="form-control w-full max-w-xs">
					<input
						type="text"
						placeholder="type username"
						className="input input-bordered input-primary w-full max-w-xs"
						onChange={updateUsernameString}
					/>
					<label className="label">
						<span className="label-text">
							between 3 to 30 chars
						</span>
					</label>
				</div>
				<button
					className="btn btn-primary mx-2"
					onClick={() => {
						if (
							usernameString.length >= 2 &&
							usernameString.length <= 30
						) {
							handleSetUsername(usernameString);
						}
					}}
				>
					Set
				</button>
			</div>
		);
	}

	return (
		<div className="card w-full bg-base-100 shadow-xl image-full">
			<figure>
				{/* <img
					src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
					alt="Shoes"
				/> */}
			</figure>
			<div className="card-body items-center">
				<TypeUsername />
				<p className="my-4">or</p>
				<ENSName />
			</div>
		</div>
	);
}
