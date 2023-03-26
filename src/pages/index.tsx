import { Profile } from "@/components/auth/Profile";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

function Footer() {
	return (
		<footer className="footer p-10 bg-neutral text-neutral-content">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
					/>
				</svg>

				<p>
					built by{" "}
					<a
						href="https://github.com/thegitparticle"
						target="_blank"
						className="text-primary"
					>
						san
					</a>
					<br />
					powered by{" "}
					<a
						href="https://www.dappstorekit.io/"
						target="_blank"
						className="text-primary"
					>
						polygon dApp store kit
					</a>
				</p>
			</div>
			<div>
				<span className="footer-title">Socials</span>
				<p>
					coming soon. until then,{" "}
					<a
						href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
						target="_blank"
						className="text-primary"
					>
						enjoy this
					</a>
				</p>
			</div>
		</footer>
	);
}

export default function Home() {
	return (
		<>
			<main className="flex-col justify-center items-center flex-1 flex min-h-screen">
				<div className="my-8 flex flex-col items-center">
					<Image
						src="/spilltea-logo-light.svg"
						width={100}
						height={100}
						alt="logo-light"
					/>
					<p className="text-2xl font-black my-2">spillTea</p>
				</div>
				<div className="my-8 flex flex-col items-center w-5/6 md:w-3/6">
					<p className="text-3xl md:text-5xl font-black mb-2 text-center">
						a link to show which web3 dapps you use & love! 💜
					</p>
					<p className="text-lg md:text-2xl font-light mt-2 text-center">
						create one today in 3 simple steps and share on your
						socials!
					</p>
				</div>
				<div className="my-8 flex flex-col items-center">
					<ConnectButton />
					<div className="h-8"></div>
					<Profile />
				</div>
			</main>
			<Footer />
		</>
	);
}
