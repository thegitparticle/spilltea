/* eslint-disable @next/next/no-img-element */
import { chainsList } from "@/info/chains";
import { Dapp } from "@/types/dapp";

export interface DappThumbnailProps {
	dapp: Dapp;
}

export default function DappThumbnail(props: DappThumbnailProps) {
	return (
		<div className="card card-side w-80 bg-base-100 shadow-xl">
			<figure>
				<img
					src={props.dapp.images?.logo}
					alt="dapp-logo"
					className="rounded-full max-h-56 p-2"
				/>
			</figure>
			<div className="card-body">
				<p className="card-title text-base -mx-4">{props.dapp.name}</p>
				<p className="text-xs -mx-4">
					{props.dapp.description.substring(0, 100)}
				</p>
				<div className="flex card-actions justify-end flex-row">
					{props.dapp.chains
						? props.dapp.chains.map((chainId, key) => {
								return (
									<div
										key={key}
										className="badge badge-outline text-xs "
									>
										{
											chainsList.find(
												(chain) =>
													chain.chainId === chainId
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
