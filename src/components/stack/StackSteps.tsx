import { User } from "@/types/user";

export default function StackSteps(userDetails: { userDetails: User }) {
	return (
		<ul className="steps my-16">
			<li className="step step-info">Fly to moon</li>
			<li className="step step-info">Shrink the moon</li>
			<li className="step step-info">Grab the moon</li>
			<li className="step step-error" data-content="?">
				Sit on toilet
			</li>
		</ul>
	);
}
