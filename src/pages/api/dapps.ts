import { NextApiRequest, NextApiResponse } from "next";

const getdapps = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case "GET":
			const response = await fetch(
				"https://api-a.meroku.store/dapp?page=1&limit=100"
			);

			const dappsList = await response.json();

			res.send({ alldapps: dappsList });
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default getdapps;
