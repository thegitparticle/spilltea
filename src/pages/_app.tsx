import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Albert_Sans } from "next/font/google";

import {
	darkTheme,
	getDefaultWallets,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const albertSans = Albert_Sans({
	variable: "--font-albert-sans",
	display: "swap",
	subsets: ["latin"],
});

function HeadMetaData() {
	return (
		<>
			<title>SpillTea</title>
			<meta name="description" content="share your web3 stack" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<link rel="icon" href="/tea-emoji-apple-15.png" />
		</>
	);
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const { chains, provider } = configureChains(
		[mainnet, polygon, optimism],
		[
			alchemyProvider({
				apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
			}),
		]
	);

	const { connectors } = getDefaultWallets({
		appName: "My RainbowKit App",
		chains,
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider,
	});

	return (
		<>
			<style jsx global>{`
				:root {
					--font-albert-sans: ${albertSans.style.fontFamily};
				}
			`}</style>
			<HeadMetaData />

			<main className={`${albertSans.variable} font-sans`}>
				<QueryClientProvider client={queryClient}>
					<WagmiConfig client={wagmiClient}>
						<RainbowKitProvider
							chains={chains}
							theme={darkTheme({
								accentColor: "#DB924B",
								accentColorForeground: "#3b1d00",
							})}
						>
							<Component {...pageProps} />
						</RainbowKitProvider>
					</WagmiConfig>
				</QueryClientProvider>
			</main>
		</>
	);
}
