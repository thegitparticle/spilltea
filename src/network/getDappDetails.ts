import { Dapp } from "@/types/dapp";

export const getDappDetails = async ({ queryKey }): Promise<Dapp[]> => {
	const [_, dappId] = queryKey;

	const options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	const dappsDetails = await fetch(
		`https://api-a.meroku.store/dapp/searchById?dappId=${dappId}`,
		options
	);

	return dappsDetails.json() as Promise<Dapp[]>;
};
