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

export default function MyStack({
	userDetails,
	myDapps,
}: {
	userDetails: User;
	myDapps: Dapp[];
}) {
	const router = useRouter();
	const filterState = useFilterState();

	const [addedDapps, setAddedDapps] = useState<Dapp[]>(myDapps);

	function handleSaveChanges() {
		if (addedDapps.length < 11 && addedDapps.length > 0) {
			let top_ten_dapps = addedDapps.map((dapp) => dapp.dappId);

			supabase
				.from("user")
				.update({ top_ten_dapps: top_ten_dapps })
				.eq("wallet_address", userDetails.wallet_address)
				.then((res) => {
					if (res.error) {
						console.log("handle save changes error", res.error);
					} else {
						console.log("handle save changes works", res);
						router.reload();
					}
				});
		}
	}

	function SpillTeaLink() {
		return (
			<div
				className="btn btn-active btn-base-100 mx-4 my-2"
				onClick={() => {
					navigator.clipboard
						.writeText(`spilltea.xyz/${userDetails.user_name}
			`);
				}}
			>
				<div className="place-items-center flex flex-row">
					<div className="text-base mx-2">
						spilltea.xyz/{userDetails.user_name}
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-6 h-6 mx-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
						/>
					</svg>
				</div>
			</div>
		);
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
									handleSaveChanges();
								}}
							>
								save changes
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
		<div className="w-full my-8 flex flex-col items-center">
			<SpillTeaLink />
			<div className="divider w-5/6 self-center">EDIT</div>
			<div className="card w-5/6 bg-base-100 shadow-xl image-full my-2">
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
														addedDapp.name ===
														dapp.name
												)
											)
												return;
											setAddedDapps([
												...addedDapps,
												dapp,
											]);
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
														addedDapp.name ===
														dapp.name
												)
											)
												return;
											setAddedDapps([
												...addedDapps,
												dapp,
											]);
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
		</div>
	);
}
