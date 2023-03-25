/* eslint-disable @next/next/no-img-element */
import { User } from "@/types/user";
import AllDapps from "@/components/dapps/AllDapps";
import FilteredDapps from "@/components/dapps/FilteredDapps";
import SearchBar from "@/components/dapps/SearchBar";
import AppRoot from "@/components/layouts/AppRoot";
import { useFilterState } from "@/state/filterState";
import { useState } from "react";
import { Dapp } from "@/types/dapp";

export default function SetStack({ userDetails }: { userDetails: User }) {
	const filterState = useFilterState();

	const [addedDapps, setAddedDapps] = useState<Dapp[]>([]);

	function AddedDapps() {
		return (
			<div className="flex flex-col h-full w-2/6 items-center justify-center my-4">
				{addedDapps.length > 0 ? (
					<>
						{addedDapps.map((dapp: Dapp) => {
							<div className="badge badge-lg">{dapp.name}</div>;
						})}
					</>
				) : (
					<p className="">choose your top 10 dapps below</p>
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
							<FilteredDapps />
						) : (
							<AllDapps />
						)}
					</div>
				</div>
				<div className="divider divider-horizontal"></div>
				<AddedDapps />
			</div>
		</div>
	);
}
