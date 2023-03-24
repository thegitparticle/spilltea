import { User } from "@/types/user";
import Publish from "./Publish";
import SetStack from "./SetStack";
import SetUsername from "./SetUsername";

const userNameStepCopy = "create username";
const stackStepCopy = "choose your web3 stack";
const publishStepCopy = "customize & publish";

export default function StackSteps({ userDetails }: { userDetails: User }) {
	if (!userDetails.user_name) {
		return (
			<div className="flex flex-col items-center flex-wrap">
				<ul className="steps my-16">
					<li className="step step-error mx-32" data-content="?">
						{userNameStepCopy}
					</li>
					<li className="step" data-content="!">
						{stackStepCopy}
					</li>
					<li className="step" data-content="!">
						{publishStepCopy}
					</li>
				</ul>
				<SetUsername userDetails={userDetails} />
			</div>
		);
	} else if (userDetails.user_name && !userDetails.top_ten_dapps) {
		return (
			<div className="flex flex-col items-center">
				<ul className="steps my-16">
					<li className="step step-info mx-32">{userNameStepCopy}</li>
					<li className="step step-error" data-content="?">
						{stackStepCopy}
					</li>
					<li className="step" data-content="!">
						{publishStepCopy}
					</li>
				</ul>
				<SetStack userDetails={userDetails} />
			</div>
		);
	} else if (
		userDetails.user_name &&
		userDetails.top_ten_dapps &&
		!userDetails.published_stack
	) {
		return (
			<div className="flex flex-col items-center">
				<ul className="steps my-16">
					<li className="step step-info mx-32">{userNameStepCopy}</li>
					<li className="step step-info">{stackStepCopy}</li>
					<li className="step step-error" data-content="?">
						{publishStepCopy}
					</li>
					<Publish userDetails={userDetails} />
				</ul>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col items-center">
				<ul className="steps my-16">
					<li className="step step-info mx-32">{userNameStepCopy}</li>
					<li className="step step-info">{stackStepCopy}</li>
					<li className="step step-info">{publishStepCopy}</li>
				</ul>
			</div>
		);
	}
}
