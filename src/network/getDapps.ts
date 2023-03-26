export const getDapps = async () => {
	const res = await fetch("/api/dapps");

	const parsedResponse = await res.json();

	const dappsList = parsedResponse.alldapps;

	return dappsList;
};
