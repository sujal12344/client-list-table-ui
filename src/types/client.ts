export interface Client {
  id: string;
  name: string;
  type: "Individual" | "Company";
  email: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}

export type ClientKeys = keyof Client;
