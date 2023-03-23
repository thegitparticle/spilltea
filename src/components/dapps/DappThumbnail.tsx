import { chainsList } from "@/info/chains";
import { Dapp } from "@/types/dapp";

export interface DappThumbnailProps {
	dapp: Dapp;
}

export default function DappThumbnail(props: DappThumbnailProps) {
	return (
		<div className="card w-80 bg-base-100 shadow-xl">
			<figure>
				<img
					src={props.dapp.images?.logo}
					alt="dapp-logo"
					width={200}
					height={200}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					{props.dapp.name}
					{/* <div className="badge badge-secondary">
						{props.dapp.chains
							? props.dapp.chains[0]
							: "unknown chain"}
					</div> */}
				</h2>
				<p>{props.dapp.description.substring(0, 200)}</p>
				<div className="card-actions justify-end">
					{props.dapp.chains
						? props.dapp.chains.map((chainId, key) => {
								return (
									<div
										key={key}
										className="badge badge-outline"
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
