import { Filter, useFilterState } from "@/state/filterState";
import { useState } from "react";

export default function SearchBar() {
	const filterState = useFilterState();

	const [searchString, setSearchString] = useState<string>("");

	const updateSearchString = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearchString(event.target.value);

		if (event.target.value.length === 0) {
			clearSearch();
		}
	};

	const handleSearch = () => {
		if (searchString.length > 0) {
			let filter: Filter = {
				searchString: searchString,
				chainId: 0,
			};

			filterState.setFilter(filter);
		}
	};

	const clearSearch = () => {
		setSearchString("");
		filterState.setFilter({ searchString: "", chainId: 0 });
	};

	return (
		<div className="flex w-full justify-center items-center my-8">
			<input
				type="text"
				id="dapp-search"
				placeholder="search dapps"
				className="input w-3/6"
				onChange={updateSearchString}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						handleSearch();
					}
				}}
			/>
			<button
				className="btn btn-square mx-2"
				onClick={() => handleSearch()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</button>
		</div>
	);
}
