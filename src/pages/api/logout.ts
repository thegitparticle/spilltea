import { withSessionRoute } from "@/config/withsession";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";

export default withSessionRoute(logoutRoute);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	req.session.destroy();
	res.json({ isLoggedIn: false, userDetails: null });
}
