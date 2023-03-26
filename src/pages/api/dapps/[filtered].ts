import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	const { filtered } = req.query;
	switch (method) {
		case "GET":
			const response = await fetch(
				"https://api-a.meroku.store/dapp?limit=50&search=" + filtered
			);

			const dappsList = await response.json();

			res.send({ alldapps: dappsList });
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default handler;
