import { Profile } from "@/components/auth/Profile";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
	return (
		<main className="flex-col justify-center items-center flex-1 flex min-h-screen">
			<div className="my-8">
				<p className="text-9xl font-extrabold">🧋</p>
				<p className="text-4xl font-bold italic">spillTea</p>
			</div>
			<div className="my-8 flex flex-col items-center">
				<p className="text-xl font-medium my-1">
					spill tea about which web3 dapps you love! 💜
				</p>
				<p className="text-xl font-medium my-1">
					create a shareable link of your fav dapps in 3 small steps
				</p>
			</div>
			<div className="my-8 flex flex-col items-center">
				<ConnectButton />
				<div className="h-8"></div>
				<Profile />
			</div>
		</main>
	);
}
