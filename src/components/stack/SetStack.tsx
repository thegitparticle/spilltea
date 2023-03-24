/* eslint-disable @next/next/no-img-element */
import { User } from "@/types/user";

export default function SetStack({ userDetails }: { userDetails: User }) {
	return (
		<div className="card w-4/6 bg-base-100 shadow-xl image-full">
			<figure>
				<img
					src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
					alt="Shoes"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">Set Stack</h2>
				<p>If a dog chews shoes whose shoes does he choose?</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div>
	);
}