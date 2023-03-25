/* eslint-disable @next/next/no-img-element */
import { supabase } from "@/config/supabase";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import PublishedStackList from "../published/PublishedStackList";

export default function Publish({ userDetails }: { userDetails: User }) {
	const router = useRouter();

	function SpillTeaLink() {
		return (
			<div className="btn btn-active btn-base-100 mx-4 my-2">
				<div className="place-items-center flex flex-row">
					<div className="text-base mx-2">
						{userDetails.user_name}.spilltea.in
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-6 h-6 mx-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
						/>
					</svg>
				</div>
			</div>
		);
	}

	function PublishButton() {
		function handlePublishStack() {
			supabase
				.from("user")
				.update({ published_stack: true })
				.eq("wallet_address", userDetails.wallet_address)
				.then((res) => {
					if (res.error) {
						console.log("handle set username error", res.error);
					} else {
						console.log("handle set username works", res);
						router.reload();
					}
				});
		}

		return (
			<button
				className="btn btn-active btn-primary mx-4"
				onClick={() => handlePublishStack()}
			>
				Publish
			</button>
		);
	}

	return (
		<div className="card w-4/6 bg-base-100 shadow-xl image-full">
			<div className="card-body flex items-center">
				<div className="flex flex-row items-center">
					<SpillTeaLink />
					<PublishButton />
				</div>
				<div className="divider"></div>
				<div className="mockup-window border bg-base-300">
					<PublishedStackList userDetails={userDetails} />
				</div>
			</div>
		</div>
	);
}
