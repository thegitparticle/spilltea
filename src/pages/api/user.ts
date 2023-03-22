import { withSessionRoute } from "@/config/withsession";
import { NextApiRequest, NextApiResponse } from "next";

// This is where we specify the typings of req.session.*
declare module "iron-session" {
	interface IronSessionData {
		user?: User;
	}
}

export type User = {
	isLoggedIn: boolean;
	userDetails: any;
};

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.session.user) {
		// in a real world application you might read the user id from the session and then do a database request
		// to get more information on the user if needed
		return res.json({
			...req.session.user,
			isLoggedIn: true,
		});
	} else {
		return res.json({
			isLoggedIn: false,
			userDetails: null,
		});
	}
}
