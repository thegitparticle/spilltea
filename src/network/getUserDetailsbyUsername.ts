import { supabase } from "@/config/supabase";

export const getUserDetailsbyUsername = async (user_name: string) => {
	const { data, error } = await supabase
		.from("user")
		.select("*")
		.eq("user_name", user_name);

	if (error) {
		console.log("error", error);
		return [];
	}

	return data![0];
};
