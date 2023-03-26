/* eslint-disable @next/next/no-img-element */
import { withSessionSsr } from "@/config/withsession";
import { chainsList } from "@/info/chains";
import { getDappDetails } from "@/network/getDappDetails";
import { getUserDetailsbyUsername } from "@/network/getUserDetailsbyUsername";
import { Dapp } from "@/types/dapp";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

export default function Stack({
	userDetails,
	myDapps,
}: {
	userDetails: User;
	myDapps: Dapp[];
}) {
	function DappThumbnail({ dapp }: { dapp: Dapp }) {
		// const { isLoading, isError, data, error } = useQuery({
		// 	queryKey: ["dappDetails", dappId],
		// 	queryFn: getDappDetails,
		// });

		// if (isLoading) {
		// 	return <span>Loading...</span>;
		// }

		// if (isError) {
		// 	return <span>Error ...</span>;
		// }

		return (
			<div className="card card-side shadow-xl bg-base-100 hover:scale-110">
				<figure className="flex-col p-2">
					<img
						src={dapp.images?.logo}
						alt="dapp-logo"
						className="rounded-full max-h-56 p-2"
					/>
				</figure>
				<div className="card-body">
					<p className="card-title text-base -mx-4">{dapp.name}</p>
					<p className="text-xs -mx-4">
						{dapp.description.substring(0, 100)}
					</p>
					<div className="flex card-actions justify-end flex-row">
						{dapp.chains
							? dapp.chains.map((chainId, key) => {
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
		<div className="flex w-full flex-1 bg-base-300 items-center justify-center">
			<div className="flex card-body items-center">
				<div className="text-2xl font-bold mx-2 my-2 text-primary">
					{userDetails.user_name}&apos;s web3 stack
				</div>
				<div className="grid grid-cols-2 gap-6 mx-4 pb-8">
					{myDapps.map((dapp, key) => (
						<DappThumbnail key={key} dapp={dapp} />
					))}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
	async ({ params }: any) => {
		const { user_name } = params;

		console.log(user_name);

		const userDetails = await getUserDetailsbyUsername(user_name as string);

		let myDapps: Dapp[] = [];

		if (userDetails.top_ten_dapps !== null) {
			for (const item of userDetails.top_ten_dapps) {
				const options = {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				};

				const dappsDetails = await fetch(
					`https://api-a.meroku.store/dapp/searchById?dappId=${item}`,
					options
				);

				const res = await dappsDetails.json();

				myDapps.push(await res[0]);
			}
		}

		return {
			props: {
				userDetails: JSON.parse(JSON.stringify(userDetails)),
				myDapps,
			},
		};
	}
);
