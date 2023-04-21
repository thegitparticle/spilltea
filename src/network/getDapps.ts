import { supabase } from "@/config/supabase";

export const getDapps = async () => {
	const { data, error } = await supabase.from("dapps").select("*");

	if (error) {
		console.log("error fetching dapps", error);
		return [];
	}

	return data![0].dapps_list;
};
