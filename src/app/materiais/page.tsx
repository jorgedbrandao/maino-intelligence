import type { Metadata } from "next";
import { MaterialGrid } from "@/components/materials/MaterialGrid";
import { materials } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Materiais" };

export default function MateriaisPage() {
  return (
    <div className="min-h-screen bg-grey-00">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Materiais</h1>
          <p className="text-primary-10/70 text-lg">
            E-books, guias e infográficos para aprofundar seu conhecimento em comex.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <MaterialGrid materials={materials} />
      </div>
    </div>
  );
}
