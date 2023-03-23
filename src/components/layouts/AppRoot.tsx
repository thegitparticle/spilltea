export default function AppRoot({ children }) {
	function NavBar() {
		return (
			<div className="navbar bg-base-100">
				<a className="btn btn-ghost normal-case text-xl">spillTea🧋</a>
			</div>
		);
	}

	return (
		<main className="flex flex-1 flex-col h-min-screen">
			<NavBar />
			{children}
		</main>
	);
}
