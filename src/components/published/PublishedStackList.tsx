/* eslint-disable @next/next/no-img-element */
import { chainsList } from "@/info/chains";
import { getDappDetails } from "@/network/getDappDetails";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function PublishedStackList({
	userDetails,
}: {
	userDetails: User;
}) {
	function DappThumbnail({ dappId }: { dappId: string }) {
		const { isLoading, isError, data, error } = useQuery({
			queryKey: ["dappDetails", dappId],
			queryFn: getDappDetails,
		});

		if (isLoading) {
			return <span>Loading...</span>;
		}

		if (isError) {
			return <span>Error ...</span>;
		}

		return (
			<div className="card card-side shadow-xl bg-base-100">
				<figure className="flex-col p-2">
					<img
						src={data[0].images?.logo}
						alt="dapp-logo"
						className="rounded-full max-h-56 p-2"
					/>
				</figure>
				<div className="card-body">
					<p className="card-title text-base -mx-4">{data[0].name}</p>
					<p className="text-xs -mx-4">
						{data[0].description.substring(0, 100)}
					</p>
					<div className="flex card-actions justify-end flex-row">
						{data[0].chains
							? data[0].chains.map((chainId, key) => {
									return (
										<div
											key={key}
											className="badge badge-outline text-xs "
										>
											{
												chainsList.find(
													(chain) =>
														chain.chainId ===
														chainId
												)?.name
											}
										</div>
									);
							  })
							: null}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex max-h-96 overflow-scroll overflow-y-visible">
			<div className="flex card-body items-center">
				<div className="text-2xl font-bold mx-2 my-2 text-primary">
					{userDetails.user_name}&apos;s web3 stack
				</div>
				<div className="grid grid-cols-2 gap-6 mx-4 pb-8">
					{userDetails.top_ten_dapps?.map((dappId, key) => (
						<DappThumbnail key={key} dappId={dappId} />
					))}
				</div>
			</div>
		</div>
	);
}
