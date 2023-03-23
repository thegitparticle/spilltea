import DappThumbnail from "@/components/dapps/DappThumbnail";
import AppRoot from "@/components/layouts/AppRoot";
import { getDapps } from "@/network/getDapps";
import { Dapp } from "@/types/dapp";
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
			<div className="flex flex-col items-center grow">
				<div className="grid grid-cols-3 gap-4 my-8">
					{data &&
						data.response.map((dapp: Dapp, key: number) => (
							<DappThumbnail dapp={dapp} key={key} />
						))}
				</div>
			</div>
		</AppRoot>
	);
}
