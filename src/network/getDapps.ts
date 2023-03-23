export const getDapps = async () => {
	const options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};

	const dappsList = await fetch(
		"https://api-a.meroku.store/dapp?page=2&limit=100&chainId=1",
		options
	);

	return dappsList.json();
};
