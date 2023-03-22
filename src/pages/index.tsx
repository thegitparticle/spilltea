import { Router, useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	const handleLogin = async () => {
		const body = {
			username: "san",
		};

		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		if (response.ok) {
			router.push("/app");
		} else {
			console.log("login failed");
		}
	};

	return (
		<main className="flex-col justify-center items-center flex-1 flex">
			<button
				className="btn rounded-full font-display"
				onClick={() => handleLogin()}
			>
				spill tea bestie!
			</button>
			<p>share your web3 stack</p>
		</main>
	);
}
