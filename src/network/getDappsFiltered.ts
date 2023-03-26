import { useFilterState } from "@/state/filterState";

export const getDappsFiltered = async () => {
	const options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	let filterState = useFilterState.getState().filter;

	const res = await fetch(`api/dapps/${filterState.searchString}`);

	const parsedResponse = await res.json();

	const dappsList = parsedResponse.alldapps;

	// const dappsList = await fetch(
	// 	`https://api-a.meroku.store/dapp?limit=50&chainId${filterState.chainId}&search=${filterState.searchString}`,
	// 	options
	// );

	return dappsList;
};
