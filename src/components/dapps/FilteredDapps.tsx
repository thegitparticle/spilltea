import { getDapps } from "@/network/getDapps";
import { getDappsFiltered } from "@/network/getDappsFiltered";
import { Dapp } from "@/types/dapp";
import { useQuery } from "@tanstack/react-query";
import DappThumbnail from "./DappThumbnail";

export default function FilteredDapps() {
	const { data } = useQuery({
		queryKey: ["dappsListFiltered"],
		queryFn: getDappsFiltered,
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
