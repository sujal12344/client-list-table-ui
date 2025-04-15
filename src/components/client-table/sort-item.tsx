"use client";

import { sortableFields } from "@/data/mock-clients";
import { useSortStore } from "@/store/sort-store";
import { SortCriterion } from "@/types/sort";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { ChevronDown, ChevronUp, GridIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, User2 } from "lucide-react";

interface SortItemProps {
  sortCriterion: SortCriterion;
}

export function SortItem({ sortCriterion }: SortItemProps) {
  const { id, field, direction } = sortCriterion;
  const removeSortCriterion = useSortStore(
    (state) => state.removeSortCriterion
  );
  const updateSortDirection = useSortStore(
    (state) => state.updateSortDirection
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case "name":
        return <User2 className="h-4 w-4 text-gray-500" />;
      case "createdAt":
      case "updatedAt":
        return <CalendarIcon className="h-4 w-4 text-gray-500" />;
      case "id":
        return <GridIcon className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const isDateField = field === "createdAt" || field === "updatedAt";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center py-1 px-0", isDragging ? "z-10" : "")}
    >
      <div
        {...attributes}
        {...listeners}
        className="grid grid-cols-6 place-items-center h-6 w-6 cursor-grab text-gray-400"
      >
        ⋮⋮
      </div>

      <div className="flex items-center gap-1.5 ml-2">
        {getFieldIcon(field)}
        {sortableFields[field]}
      </div>

      <div className="flex ml-auto gap-1">
        {isDateField ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 border rounded-md ${
                direction === "asc"
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-white"
              }`}
              onClick={() => updateSortDirection(id, "asc")}
            >
              <ChevronUp className="h-4 w-4 mr-1 text-blue-600" />
              Newest to Oldest
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 border rounded-md ${
                direction === "desc"
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-white"
              }`}
              onClick={() => updateSortDirection(id, "desc")}
            >
              <ChevronDown className="h-4 w-4 mr-1 text-blue-600" />
              Oldest to Newest
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 border rounded-md ${
                direction === "asc"
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-white"
              }`}
              onClick={() => updateSortDirection(id, "asc")}
            >
              <ChevronUp className="h-4 w-4 mr-1 text-blue-600" />
              A-Z
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 border rounded-md ${
                direction === "desc"
                  ? "bg-blue-50 text-blue-600 border-blue-100"
                  : "bg-white"
              }`}
              onClick={() => updateSortDirection(id, "desc")}
            >
              <ChevronDown className="h-4 w-4 mr-1 text-blue-600" />
              Z-A
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400"
          onClick={() => removeSortCriterion(id)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
