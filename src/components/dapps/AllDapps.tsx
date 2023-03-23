import { getDapps } from "@/network/getDapps";
import { Dapp } from "@/types/dapp";
import { useQuery } from "@tanstack/react-query";
import DappThumbnail from "./DappThumbnail";

export default function AllDapps() {
	const { data } = useQuery({
		queryKey: ["dappsList"],
		queryFn: getDapps,
	});
	return (
		<div className="grid grid-cols-3 gap-4 my-8">
			{data &&
				data.response.map((dapp: Dapp, key: number) => (
					<DappThumbnail dapp={dapp} key={key} />
				))}
		</div>
	);
}
