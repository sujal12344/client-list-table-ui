export type SortDirection = "asc" | "desc";

export interface SortCriterion {
  id: string;
  field: string;
  direction: SortDirection;
}

export interface SortDisplayOption {
  field: string;
  label: string;
  icon?: React.ReactNode;
  directionLabels: {
    asc: string;
    desc: string;
  };
}
