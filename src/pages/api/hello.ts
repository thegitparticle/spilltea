import { NextApiRequest, NextApiResponse } from "next";

export default async function helloRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		res.status(200).send("hello");
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
}
