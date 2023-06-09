import { getDapps } from "@/network/getDapps";
import { Dapp } from "@/types/dapp";
import { useQuery } from "@tanstack/react-query";
import DappThumbnail from "./DappThumbnail";

export default function AllDapps({
	addDapp,
}: {
	addDapp: (args: { dapp: Dapp }) => void;
}) {
	const { data } = useQuery({
		queryKey: ["dappsList"],
		queryFn: getDapps,
	});
	return (
		<div className="grid grid-cols-2 gap-6 my-8">
			{data &&
				data.map((dapp: Dapp, key: number) => (
					<DappThumbnail
						dapp={dapp}
						key={key}
						addDapp={() => addDapp({ dapp })}
					/>
				))}
		</div>
	);
}
