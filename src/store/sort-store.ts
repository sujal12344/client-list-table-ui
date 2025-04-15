import { SortCriterion, SortDirection } from "@/types/sort";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface SortStore {
  sortCriteria: SortCriterion[];
  addSortCriterion: (field: string, direction?: SortDirection) => void;
  removeSortCriterion: (id: string) => void;
  updateSortDirection: (id: string, direction: SortDirection) => void;
  reorderSortCriteria: (startIndex: number, endIndex: number) => void;
  clearAllSortCriteria: () => void;
}

export const useSortStore = create<SortStore>()(
  persist(
    (set) => ({
      sortCriteria: [],

      addSortCriterion: (field, direction = "asc") => {
        set((state) => ({
          sortCriteria: [
            ...state.sortCriteria,
            { id: uuidv4(), field, direction },
          ],
        }));
      },

      removeSortCriterion: (id) => {
        set((state) => ({
          sortCriteria: state.sortCriteria.filter(
            (criterion) => criterion.id !== id
          ),
        }));
      },

      updateSortDirection: (id, direction) => {
        set((state) => ({
          sortCriteria: state.sortCriteria.map((criterion) =>
            criterion.id === id ? { ...criterion, direction } : criterion
          ),
        }));
      },

      reorderSortCriteria: (startIndex, endIndex) => {
        set((state) => {
          const newSortCriteria = [...state.sortCriteria];
          const [removed] = newSortCriteria.splice(startIndex, 1);
          newSortCriteria.splice(endIndex, 0, removed);
          return { sortCriteria: newSortCriteria };
        });
      },

      clearAllSortCriteria: () => {
        set({ sortCriteria: [] });
      },
    }),
    {
      name: "client-sort-storage",
    }
  )
);
