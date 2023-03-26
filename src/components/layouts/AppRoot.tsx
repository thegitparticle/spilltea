import { Profile } from "../auth/Profile";

export default function AppRoot({ children }: { children: React.ReactNode }) {
	function NavBar() {
		return (
			<div className="navbar bg-base-100/0  fixed z-40 bottom-0 flex flex-row justify-between">
				<a className="btn btn-ghost normal-case text-md">spillTea☕️</a>
				<Profile />
			</div>
		);
	}

	return (
		<main className="flex flex-1 flex-col min-h-screen bg-transparent">
			{children}
			<NavBar />
		</main>
	);
}
