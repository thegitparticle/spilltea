/* eslint-disable @next/next/no-img-element */
import { withSessionSsr } from "@/config/withsession";
import { chainsList } from "@/info/chains";
import { getDappDetails } from "@/network/getDappDetails";
import { getUserDetailsbyUsername } from "@/network/getUserDetailsbyUsername";
import { Dapp } from "@/types/dapp";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

function Footer() {
	return (
		<footer className="footer footer-center p-10 bg-primary text-primary-content">
			<div>
				<p>
					get your own stack link at{" "}
					<a
						href="https://github.com/thegitparticle"
						target="_blank"
						className="text-accent"
					>
						☕️ spilltea.xyz
					</a>
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
					/>
				</svg>

				<p>
					built by{" "}
					<a
						href="https://github.com/thegitparticle"
						target="_blank"
						className="text-accent"
					>
						san
					</a>
					<br />
					powered by{" "}
					<a
						href="https://www.dappstorekit.io/"
						target="_blank"
						className="text-accent"
					>
						polygon dApp store kit
					</a>
				</p>
			</div>
		</footer>
	);
}

export default function Stack({
	userDetails,
	myDapps,
}: {
	userDetails: User;
	myDapps: Dapp[];
}) {
	function DappModal({ dapp }: { dapp: Dapp }) {
		const handleClickToDapp = () => {
			window.open(dapp.appUrl, "_blank");
		};

		return (
			<div className="modal-box">
				<img
					src={dapp.images?.logo}
					alt="dapp-logo"
					className="rounded-full max-h-56 p-2"
				/>
				<h3 className="font-bold text-xl">{dapp.name}</h3>
				<p className="py-4 text-base">{dapp.description}</p>
				{dapp.chains
					? dapp.chains.map((chainId, key) => {
							return (
								<div
									key={key}
									className="badge badge-outline text-xs mx-1"
								>
									{
										chainsList.find(
											(chain) => chain.chainId === chainId
										)?.name
									}
								</div>
							);
					  })
					: null}
				<div className="modal-action">
					<button
						className="btn btn-accent"
						onClick={() => handleClickToDapp()}
					>
						visit dapp
					</button>
					<label htmlFor={`my-modal-${dapp.dappId}`} className="btn">
						CLOSE
					</label>
				</div>
			</div>
		);
	}

	function DappThumbnail({ dapp }: { dapp: Dapp }) {
		return (
			<label htmlFor={`my-modal-${dapp.dappId}`} className="">
				<div className="card card-side shadow-xl bg-base-100 hover:scale-110">
					<figure className="flex-col p-2">
						<img
							src={dapp.images?.logo}
							alt="dapp-logo"
							className="rounded-full max-h-56 p-2"
						/>
					</figure>
					<div className="card-body">
						<p className="card-title text-base -mx-4">
							{dapp.name}
						</p>
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
				<input
					type="checkbox"
					id={`my-modal-${dapp.dappId}`}
					className="modal-toggle"
				/>
				<div className="modal modal-bottom sm:modal-middle">
					<DappModal dapp={dapp} />
				</div>
			</label>
		);
	}

	return (
		<div className="flex w-full flex-1 flex-col bg-base-300 items-center justify-center">
			<div className="flex card-body items-center">
				<div className="text-2xl font-bold mx-2 my-2 text-primary">
					{userDetails.user_name}&apos;s web3 stack
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 pb-8 w-full md:w-4/6">
					{myDapps.map((dapp, key) => (
						<DappThumbnail key={key} dapp={dapp} />
					))}
				</div>
			</div>
			<Footer />
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
