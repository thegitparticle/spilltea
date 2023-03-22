import { withSessionRoute } from "@/config/withsession";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const { username } = await req.body;

	console.log("1", username);

	try {
		console.log("login api called");

		console.log("2", username);

		const user = { isLoggedIn: true, userDetails: username } as User;

		req.session.user = user;
		await req.session.save();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
}
