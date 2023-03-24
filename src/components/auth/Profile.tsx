import { useRouter } from "next/router";
import * as React from "react";
import { useAccount } from "wagmi";
import SignInButton from "./SignInButton";

export function Profile() {
	const { isConnected } = useAccount();
	const router = useRouter();

	const [state, setState] = React.useState<{
		address?: string;
		error?: Error;
		loading?: boolean;
	}>({});

	// Fetch user when:
	React.useEffect(() => {
		const handler = async () => {
			try {
				const res = await fetch("/api/me");
				const json = await res.json();
				setState((x) => ({ ...x, address: json.address }));
			} catch (_error) {}
		};
		// 1. page loads
		handler();

		// 2. window is focused (in case user logs out of another window)
		window.addEventListener("focus", handler);
		return () => window.removeEventListener("focus", handler);
	}, []);

	if (isConnected) {
		return (
			<div>
				{state.address ? (
					<div>
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn m-1">
								logged in as {state.address.substring(0, 6)}...
								{state.address.substring(
									state.address.length - 4
								)}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-6 h-6 mx-3"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<button
										onClick={async () => {
											await fetch("/api/logout");
											setState({});
											router.push("/");
										}}
									>
										Sign Out
									</button>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<SignInButton
						onSuccess={({ address }) => {
							setState((x) => ({ ...x, address }));
							router.push("/app");
						}}
						onError={({ error }) =>
							setState((x) => ({ ...x, error }))
						}
					/>
				)}
			</div>
		);
	}

	return <div></div>;
}
