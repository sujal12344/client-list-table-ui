"use client";

import { Client } from "@/types/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./column";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useSortStore } from "@/store/sort-store";
import { useFilterStore } from "@/store/filter-store";
import { useClientSort } from "@/hooks/use-sort";
import { SortPanel } from "./sort-panel";
import { FilterPanel } from "./filter-panel";
import { Button } from "../ui/button";
import { ArrowUpDown, Filter, Plus, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ClientTableProps {
  data: Client[];
}

export function ClientTable({ data }: ClientTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | "individual" | "company">(
    "all"
  );
  const sortCriteria = useSortStore((state) => state.sortCriteria);
  const sortedClients = useClientSort(data, sortCriteria);

  const [sortPanelVisible, setSortPanelVisible] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);

  // Filter state
  const { status, type, searchTerm, setSearchTerm, getActiveFilterCount } =
    useFilterStore();

  // Close panels when clicking outside
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Skip if clicking on the buttons that toggle panels
      if (
        (sortButtonRef.current &&
          sortButtonRef.current.contains(event.target as Node)) ||
        (filterButtonRef.current &&
          filterButtonRef.current.contains(event.target as Node))
      ) {
        return;
      }

      // Close panels if clicking outside them
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setSortPanelVisible(false);
        setFilterPanelVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply all filters: tabs, status, type, and search
  const filteredClients = sortedClients.filter((client) => {
    // Tab filter
    if (activeTab === "individual" && client.type !== "Individual")
      return false;
    if (activeTab === "company" && client.type !== "Company") return false;

    // Status filter - if any status is checked, client must match one of the checked statuses
    if (status.active || status.inactive) {
      if (status.active && client.status !== "Active") {
        if (!status.inactive || client.status !== "Inactive") {
          return false;
        }
      }
      if (status.inactive && client.status !== "Inactive") {
        if (!status.active || client.status !== "Active") {
          return false;
        }
      }
    }

    // Type filter - if any type is checked, client must match one of the checked types
    if (type.individual || type.company) {
      if (type.individual && client.type !== "Individual") {
        if (!type.company || client.type !== "Company") {
          return false;
        }
      }
      if (type.company && client.type !== "Company") {
        if (!type.individual || client.type !== "Individual") {
          return false;
        }
      }
    }

    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.status.toLowerCase().includes(searchLower) ||
        client.id.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const table = useReactTable({
    data: filteredClients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    autoResetPageIndex: false,
    manualPagination: false,
  });

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="tabs flex gap-6">
          <button
            className={`pb-4 px-2 ${
              activeTab === "all"
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`pb-4 px-2 ${
              activeTab === "individual"
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            Individual
          </button>
          <button
            className={`pb-4 px-2 ${
              activeTab === "company"
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("company")}
          >
            Company
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="pl-9 pr-3 py-2 border rounded-md w-48 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="">
            <Button
              ref={sortButtonRef}
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setSortPanelVisible(!sortPanelVisible);
                setFilterPanelVisible(false);
              }}
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortCriteria.length > 0
                ? `Sort (${sortCriteria.length})`
                : "Sort"}
            </Button>

            {sortPanelVisible && (
              <div ref={panelRef} className="absolute right-0 bottom-50 z-50">
                <SortPanel onClose={() => setSortPanelVisible(false)} />
              </div>
            )}
          </div>
          <div className="relative" ref={filterButtonRef}>
            {activeFilterCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                setFilterPanelVisible(!filterPanelVisible);
                setSortPanelVisible(false);
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>
            {filterPanelVisible && (
              <div ref={panelRef}>
                <FilterPanel onClose={() => setFilterPanelVisible(false)} />
              </div>
            )}
          </div>
          <Button className="bg-black text-white hover:bg-black/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="rounded-md border overflow-hidden">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-50">
                {table.getFlatHeaders().map((header) => (
                  <TableHead key={header.id} className="py-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No clients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end items-center">
          {table.getPageCount() > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
