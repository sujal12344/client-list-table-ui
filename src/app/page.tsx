"use client";

import { ClientTable } from "@/components/client-table/client-table";
import { clients } from "@/data/mock-clients";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <ClientTable data={clients} />
    </main>
  );
}
