import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterState {
  status: {
    active: boolean;
    inactive: boolean;
  };
  type: {
    individual: boolean;
    company: boolean;
  };
  searchTerm: string;
}

interface FilterStore extends FilterState {
  toggleStatus: (status: "active" | "inactive") => void;
  toggleType: (type: "individual" | "company") => void;
  clearAllFilters: () => void;
  setSearchTerm: (term: string) => void;
  getActiveFilterCount: () => number;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      status: {
        active: false,
        inactive: false,
      },
      type: {
        individual: false,
        company: false,
      },
      searchTerm: "",

      toggleStatus: (status) => {
        set((state) => ({
          status: {
            ...state.status,
            [status]: !state.status[status],
          },
        }));
      },

      toggleType: (type) => {
        set((state) => ({
          type: {
            ...state.type,
            [type]: !state.type[type],
          },
        }));
      },

      clearAllFilters: () => {
        set({
          status: {
            active: false,
            inactive: false,
          },
          type: {
            individual: false,
            company: false,
          },
        });
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      getActiveFilterCount: () => {
        const state = get();
        let count = 0;

        if (state.status.active) count++;
        if (state.status.inactive) count++;
        if (state.type.individual) count++;
        if (state.type.company) count++;

        return count;
      },
    }),
    {
      name: "client-filter-storage",
    }
  )
);
