import AppRoot from "@/components/layouts/AppRoot";
import { getDapps } from "@/network/getDapps";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function App() {
	const { data } = useQuery({
		queryKey: ["dappsList"],
		queryFn: getDapps,
	});

	useEffect(() => {
		console.log("effect called");
		if (data) {
			console.log(data);
		}
	}, [data]);

	return (
		<AppRoot>
			<div className="flex flex-col items-center">
				<button className="btn rounded-full font-display">
					welcome to spill tea!
				</button>
				<p>share your web3 stack and show off your explorations</p>
			</div>
		</AppRoot>
	);
}
