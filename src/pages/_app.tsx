import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Albert_Sans } from "next/font/google";

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
			<link rel="icon" href="/favicon.ico" />
		</>
	);
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--font-albert-sans: ${albertSans.style.fontFamily};
				}
			`}</style>
			<HeadMetaData />
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</>
	);
}
