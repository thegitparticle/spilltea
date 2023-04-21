import { supabase } from "@/config/supabase";
import { NextApiRequest, NextApiResponse } from "next";

const refreshDapps = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case "GET":
			const response = await fetch(
				"https://api-a.meroku.store/dapp?page=1&limit=100"
			);

			const dappsList = await response.json();

			supabase
				.from("dapps")
				.update({ dapps_list: dappsList.response })
				.eq("id", 2)
				.then((data) => {
					if (data.error) {
						res.send({ refreshed: false, error: data.error });
					} else {
						res.send({ refreshed: true });
					}
				});

			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default refreshDapps;
