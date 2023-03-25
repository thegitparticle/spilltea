/* eslint-disable @next/next/no-img-element */
import { User } from "@/types/user";
import AllDapps from "@/components/dapps/AllDapps";
import FilteredDapps from "@/components/dapps/FilteredDapps";
import SearchBar from "@/components/dapps/SearchBar";
import AppRoot from "@/components/layouts/AppRoot";
import { useFilterState } from "@/state/filterState";
import { useEffect, useState } from "react";
import { Dapp } from "@/types/dapp";
import { supabase } from "@/config/supabase";
import { useRouter } from "next/router";

export default function SetStack({ userDetails }: { userDetails: User }) {
	const router = useRouter();
	const filterState = useFilterState();

	const [addedDapps, setAddedDapps] = useState<Dapp[]>([]);

	function handleSetStack() {
		if (addedDapps.length < 11 && addedDapps.length > 0) {
			let top_ten_dapps = addedDapps.map((dapp) => dapp.dappId);

			supabase
				.from("user")
				.update({ top_ten_dapps: top_ten_dapps })
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
	}

	function AddDappThumbnail({ dapp }: { dapp: Dapp }) {
		return (
			<div className="indicator">
				<span
					className="indicator-item badge badge-ghost hover:cursor-pointer"
					onClick={() =>
						setAddedDapps(
							addedDapps.filter(
								(addedDapp) => addedDapp.name !== dapp.name
							)
						)
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-3 h-3"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</span>
				<div className="card card-side w-40 bg-base-100 shadow-xl my-2">
					<img
						src={dapp.images?.logo}
						alt="dapp-logo"
						className="rounded-full max-h-12 p-2"
					/>
					<p className="card-title text-sm">{dapp.name}</p>
				</div>
			</div>
		);
	}

	function AddedDapps() {
		return (
			<div className="flex flex-col h-full w-2/6 items-center my-4">
				{addedDapps.length > 0 ? (
					<div className="flex flex-col items-center">
						<p className="">here are your dapps</p>
						<div className="grid grid-cols-2 gap-6 my-8">
							{addedDapps.map((dapp: Dapp, key: number) => (
								<AddDappThumbnail key={key} dapp={dapp} />
							))}
						</div>
						{addedDapps.length > 0 ? (
							<button
								className="btn btn-primary mx-2"
								onClick={() => {
									handleSetStack();
								}}
							>
								add to stack
							</button>
						) : null}
					</div>
				) : (
					<p className="">choose your top 10 dapps</p>
				)}
			</div>
		);
	}

	return (
		<div className="card w-full bg-base-100 shadow-xl image-full ">
			<div className="card-body flex-row">
				<div className="flex flex-col w-4/6 items-center">
					<SearchBar />
					<div className="flex max-h-96 overflow-scroll">
						{filterState.filter.chainId !== 0 ||
						filterState.filter.searchString.length > 0 ? (
							<FilteredDapps
								addDapp={({ dapp }) => {
									if (addedDapps.length < 10) {
										if (
											addedDapps.find(
												(addedDapp) =>
													addedDapp.name === dapp.name
											)
										)
											return;
										setAddedDapps([...addedDapps, dapp]);
									}
								}}
							/>
						) : (
							<AllDapps
								addDapp={({ dapp }) => {
									if (addedDapps.length < 10) {
										if (
											addedDapps.find(
												(addedDapp) =>
													addedDapp.name === dapp.name
											)
										)
											return;
										setAddedDapps([...addedDapps, dapp]);
									}
								}}
							/>
						)}
					</div>
				</div>
				<div className="divider divider-horizontal"></div>
				<AddedDapps />
			</div>
		</div>
	);
}
