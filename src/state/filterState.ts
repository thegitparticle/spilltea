import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Filter {
	searchString: string;
	chainId: number;
}

interface FilterState {
	filter: Filter;
	setFilter: (filter: Filter) => void;
	clearFilter: () => void;
}

export const useFilterState = create<FilterState>()(
	devtools(
		persist(
			(set) => ({
				filter: {
					searchString: "",
					chainId: 0,
				},
				setFilter: (filter: Filter) => set({ filter }),
				clearFilter: () =>
					set({ filter: { searchString: "", chainId: 0 } }),
			}),
			{
				name: "filter-state",
			}
		)
	)
);
