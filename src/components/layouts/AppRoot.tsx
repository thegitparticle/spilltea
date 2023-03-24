import { Profile } from "../auth/Profile";

export default function AppRoot({ children }) {
	function NavBar() {
		return (
			<div className="navbar bg-base-100 flex flex-row justify-between">
				<a className="btn btn-ghost normal-case text-xl">spillTea🧋</a>
				<Profile />
			</div>
		);
	}

	return (
		<main className="flex flex-1 flex-col min-h-screen bg-base-100">
			<NavBar />
			{children}
		</main>
	);
}
