import SignInButton from "./SignInButton";
import * as React from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { add } from "lodash";

export function Profile() {
	const { isConnected } = useAccount();
	const { address, isConnecting, isDisconnected } = useAccount();

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
				{/* Account content goes here */}

				{state.address ? (
					<div>
						<div>Signed in as {state.address}</div>
						<button
							onClick={async () => {
								await fetch("/api/logout");
								setState({});
							}}
						>
							Sign Out
						</button>
					</div>
				) : (
					<SignInButton
						onSuccess={({ address }) =>
							setState((x) => ({ ...x, address }))
						}
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
