export const ironOptions = {
	cookieName: "spilltea",
	password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD as string,
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === "production" ? true : false,
	},
};
