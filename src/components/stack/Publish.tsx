/* eslint-disable @next/next/no-img-element */
import { User } from "@/types/user";

export default function Publish({ userDetails }: { userDetails: User }) {
	return (
		<div className="card w-4/6 bg-base-100 shadow-xl image-full">
			<div className="card-body">
				<h2 className="card-title">Customize & Publish</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div>
	);
}
