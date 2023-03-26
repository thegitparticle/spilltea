import { supabase } from "@/config/supabase";

export const getUserDetails = async (address: string) => {
	const { data, error } = await supabase
		.from("user")
		.select("*")
		.eq("wallet_address", address);

	if (error) {
		console.log("error fetching userDetails", error);
		return [];
	}

	return data![0];
};
