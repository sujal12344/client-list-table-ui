"use client";

import { useSortStore } from "@/store/sort-store";
import { Button } from "../ui/button";
import { sortableFields } from "@/data/mock-clients";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CalendarIcon, GridIcon, User2, X } from "lucide-react";

interface SortPanelProps {
  onClose?: () => void;
}

export function SortPanel({ onClose }: SortPanelProps) {
  const {
    sortCriteria,
    addSortCriterion,
    removeSortCriterion,
    updateSortDirection,
    reorderSortCriteria,
    clearAllSortCriteria,
  } = useSortStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = sortCriteria.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = sortCriteria.findIndex((item) => item.id === over.id);
      reorderSortCriteria(activeIndex, overIndex);
    }
  }

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

  // Fields that are available to add (not already in sortCriteria)
  const availableFields = {
    name: "Client Name",
    id: "Client ID",
    createdAt: "Created At",
    updatedAt: "Updated At",
  };

  // Check if field is already used in sort criteria
  const isFieldInUse = (field: string) => {
    return sortCriteria.some((criterion) => criterion.field === field);
  };

  return (
    <div className="w-[600px] bg-white rounded-md border shadow-lg p-6">
      <div className="font-medium text-lg mb-4">Sort By</div>

      {/* Active sort criteria - items that can be dragged */}
      <div className="space-y-1 mb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortCriteria.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortCriteria.map((criterion) => (
              <div key={criterion.id} className="py-1">
                <SortableItem
                  criterion={criterion}
                  onRemove={() => removeSortCriterion(criterion.id)}
                  onUpdateDirection={(direction) =>
                    updateSortDirection(criterion.id, direction)
                  }
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Available sort options */}
      <div className="space-y-2">
        {!isFieldInUse("updatedAt") && (
          <div className="flex items-center py-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Updated At</span>
            </div>
            <div className="ml-auto flex space-x-2">
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("updatedAt", "asc")}
              >
                <span className="mr-1">↑</span> Newest to Oldest
              </button>
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("updatedAt", "desc")}
              >
                <span className="mr-1">↓</span> Oldest to Newest
              </button>
            </div>
          </div>
        )}

        {!isFieldInUse("id") && (
          <div className="flex items-center py-2">
            <div className="flex items-center gap-1.5">
              <GridIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Client ID</span>
            </div>
            <div className="ml-auto flex space-x-2">
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("id", "asc")}
              >
                <span className="mr-1">↑</span> A-Z
              </button>
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("id", "desc")}
              >
                <span className="mr-1">↓</span> Z-A
              </button>
            </div>
          </div>
        )}

        {!isFieldInUse("name") && (
          <div className="flex items-center py-2">
            <div className="flex items-center gap-1.5">
              <User2 className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Client Name</span>
            </div>
            <div className="ml-auto flex space-x-2">
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("name", "asc")}
              >
                <span className="mr-1">↑</span> A-Z
              </button>
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("name", "desc")}
              >
                <span className="mr-1">↓</span> Z-A
              </button>
            </div>
          </div>
        )}

        {!isFieldInUse("createdAt") && (
          <div className="flex items-center py-2">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Created At</span>
            </div>
            <div className="ml-auto flex space-x-2">
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("createdAt", "asc")}
              >
                <span className="mr-1">↑</span> Newest to Oldest
              </button>
              <button
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm"
                onClick={() => addSortCriterion("createdAt", "desc")}
              >
                <span className="mr-1">↓</span> Oldest to Newest
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex justify-between pt-4 border-t mt-4">
        <button
          onClick={clearAllSortCriteria}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Clear all
        </button>

        <Button
          className="bg-black text-white hover:bg-black/90"
          onClick={onClose}
        >
          Apply Sort
        </Button>
      </div>
    </div>
  );
}

// Sortable item component for active sort criteria
function SortableItem({
  criterion,
  onRemove,
  onUpdateDirection,
}: {
  criterion: { id: string; field: string; direction: "asc" | "desc" };
  onRemove: () => void;
  onUpdateDirection: (direction: "asc" | "desc") => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: criterion.id,
  });

  const isDateField =
    criterion.field === "createdAt" || criterion.field === "updatedAt";
  const fieldLabel =
    criterion.field === "name"
      ? "Client Name"
      : criterion.field === "id"
      ? "Client ID"
      : criterion.field === "createdAt"
      ? "Created At"
      : "Updated At";

  const getIcon = () => {
    switch (criterion.field) {
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

  return (
    <div className="flex items-center py-1">
      {/* Drag handle */}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="flex items-center cursor-grab text-gray-400 mr-2"
      >
        ⋮⋮
      </div>

      {/* Field name with icon */}
      <div className="flex items-center gap-1.5 min-w-[120px]">
        {getIcon()}
        <span className="text-gray-800">{fieldLabel}</span>
      </div>

      {/* Sort direction buttons */}
      <div className="flex space-x-2 ml-auto">
        {isDateField ? (
          <>
            <button
              onClick={() => onUpdateDirection("asc")}
              className={`flex items-center px-3 py-1.5 text-sm border rounded-md ${
                criterion.direction === "asc"
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <span className="mr-1">↑</span> Newest to Oldest
            </button>
            <button
              onClick={() => onUpdateDirection("desc")}
              className={`flex items-center px-3 py-1.5 text-sm border rounded-md ${
                criterion.direction === "desc"
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <span className="mr-1">↓</span> Oldest to Newest
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onUpdateDirection("asc")}
              className={`flex items-center px-3 py-1.5 text-sm border rounded-md ${
                criterion.direction === "asc"
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <span className="mr-1">↑</span> A-Z
            </button>
            <button
              onClick={() => onUpdateDirection("desc")}
              className={`flex items-center px-3 py-1.5 text-sm border rounded-md ${
                criterion.direction === "desc"
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <span className="mr-1">↓</span> Z-A
            </button>
          </>
        )}

        {/* Remove button */}
        <button
          type="button"
          aria-label="Remove sort criterion"
          onClick={onRemove}
          className="px-1.5 py-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
