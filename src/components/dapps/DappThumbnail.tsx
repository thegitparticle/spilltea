/* eslint-disable @next/next/no-img-element */
import { chainsList } from "@/info/chains";
import { Dapp } from "@/types/dapp";
import { useState } from "react";

export interface DappThumbnailProps {
	dapp: Dapp;
	addDapp: () => void;
}

export default function DappThumbnail(props: DappThumbnailProps) {
	const [added, setAdded] = useState<boolean>(false);

	return (
		<div className="card card-side w-80 bg-base-100 shadow-xl">
			<figure className="flex-col p-2">
				<img
					src={props.dapp.images?.logo}
					alt="dapp-logo"
					className="rounded-full max-h-56 p-2"
				/>
				<button
					className="btn gap-1 btn-xs text-xs my-2"
					onClick={() => props.addDapp()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					add
				</button>
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
