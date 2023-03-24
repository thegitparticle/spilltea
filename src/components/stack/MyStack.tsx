import { User } from "@/types/user";

export default function MyStack(userDetails: { userDetails: User }) {
	return (
		<div className="card w-96 glass my-8">
			<figure>
				<img
					src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
					alt="car!"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">Life hack</h2>
				<p>How to park your car at your garage?</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Learn now!</button>
				</div>
			</div>
		</div>
	);
}
