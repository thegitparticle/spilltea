import AllDapps from "@/components/dapps/AllDapps";
import FilteredDapps from "@/components/dapps/FilteredDapps";
import SearchBar from "@/components/dapps/SearchBar";
import AppRoot from "@/components/layouts/AppRoot";
import { useFilterState } from "@/state/filterState";

export default function App() {
	const filterState = useFilterState();

	return (
		<AppRoot>
			<div className="flex flex-col items-center grow">
				<SearchBar />
				{filterState.filter.chainId !== 0 ||
				filterState.filter.searchString.length > 0 ? (
					<FilteredDapps />
				) : (
					<AllDapps />
				)}
			</div>
		</AppRoot>
	);
}
