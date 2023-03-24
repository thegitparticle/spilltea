import { ironOptions } from "@/config/ironsession";
import { supabase } from "@/config/supabase";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				const { message, signature, address } = req.body;
				const siweMessage = new SiweMessage(message);
				const fields = await siweMessage.validate(signature);

				if (fields.nonce !== req.session.nonce)
					return res.status(422).json({ message: "Invalid nonce." });

				req.session.siwe = fields;
				await req.session.save();

				await supabase
					.from("user")
					.select("*")
					.eq("wallet_address", address)
					.then((res) => {
						if (res.data!.length === 0) {
							supabase
								.from("user")
								.insert([{ wallet_address: address }])
								.then((res) => {
									if (!res.error) {
										console.log("new user created");
									} else {
										console.log("error creating new user");
									}
								});
						} else {
							console.log("user already exists");
						}
					});

				res.json({ ok: true });
			} catch (_error) {
				res.json({ ok: false });
			}
			break;
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default withIronSessionApiRoute(handler, ironOptions);
