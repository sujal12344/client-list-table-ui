import { Button } from "../ui/button";
import { useFilterStore } from "@/store/filter-store";

interface FilterPanelProps {
  onClose: () => void;
}

export function FilterPanel({ onClose }: FilterPanelProps) {
  const { status, type, toggleStatus, toggleType, clearAllFilters } =
    useFilterStore();

  return (
    <div className="absolute right-0 top-10 z-50 w-[400px] bg-white rounded-md border shadow-lg p-6">
      <div className="text-xl font-medium mb-5">Filter By</div>

      <div className="space-y-6">
        <div>
          <div className="font-medium text-lg mb-3">Status</div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status-active"
                checked={status.active}
                onChange={() => toggleStatus("active")}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="status-active" className="ml-2 text-base">
                Active
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status-inactive"
                checked={status.inactive}
                onChange={() => toggleStatus("inactive")}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="status-inactive" className="ml-2 text-base">
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="font-medium text-lg mb-3">Type</div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="type-individual"
                checked={type.individual}
                onChange={() => toggleType("individual")}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="type-individual" className="ml-2 text-base">
                Individual
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="type-company"
                checked={type.company}
                onChange={() => toggleType("company")}
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="type-company" className="ml-2 text-base">
                Company
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t mt-6">
        <button
          onClick={clearAllFilters}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          Clear all
        </button>

        <Button
          className="bg-black text-white hover:bg-black/90 px-6"
          onClick={onClose}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
