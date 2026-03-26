"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentGate } from "@/components/ui/ContentGate";

interface FormData {
  fob: string;
  frete: string;
  seguro: string;
  ncm: string;
  regime: "simples" | "presumido" | "real";
}

interface Results {
  cif: number;
  ii: number;
  ipi: number;
  pis: number;
  cofins: number;
  icms: number;
  total: number;
}

function calcular(form: FormData): Results {
  const fob = parseFloat(form.fob) || 0;
  const frete = parseFloat(form.frete) || 0;
  const seguro = parseFloat(form.seguro) || 0;
  const cif = fob + frete + seguro;
  const ii = cif * 0.14;
  const ipi = (cif + ii) * 0.05;
  const pis = cif * 0.0211;
  const cofins = cif * 0.0965;
  const icms = (cif + ii + ipi + pis + cofins) * 0.12;
  const total = cif + ii + ipi + pis + cofins + icms;
  return { cif, ii, ipi, pis, cofins, icms, total };
}

function fmt(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(value);
}

function ResultRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={["flex justify-between items-center py-2.5 border-b border-grey-15", highlight ? "font-semibold" : ""].join(" ")}>
      <span className={highlight ? "text-grey-90" : "text-grey-60 text-sm"}>{label}</span>
      <span className={highlight ? "text-primary-30 text-lg" : "text-grey-70 text-sm"}>{fmt(value)}</span>
    </div>
  );
}

function CalculatorTool() {
  const [form, setForm] = useState<FormData>({ fob: "", frete: "", seguro: "", ncm: "", regime: "presumido" });
  const [results, setResults] = useState<Results | null>(null);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(calcular(form));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Form */}
      <div className="rounded-2xl border border-grey-20 bg-white p-6">
        <h2 className="text-lg font-semibold text-grey-90 mb-6">Dados da importação</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Valor FOB (USD)" type="number" placeholder="0.00" min="0" step="0.01" value={form.fob} onChange={handleChange("fob")} />
          <Input label="Frete Internacional (USD)" type="number" placeholder="0.00" min="0" step="0.01" value={form.frete} onChange={handleChange("frete")} />
          <Input label="Seguro (USD)" type="number" placeholder="0.00" min="0" step="0.01" value={form.seguro} onChange={handleChange("seguro")} />
          <Input label="NCM" placeholder="0000.00.00" value={form.ncm} onChange={handleChange("ncm")} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-grey-70">Regime tributário</label>
            <select
              value={form.regime}
              onChange={handleChange("regime") as React.ChangeEventHandler<HTMLSelectElement>}
              className="w-full rounded-lg border border-grey-40 bg-white px-3 py-2 text-sm text-grey-90 focus:outline-none focus:border-primary-20 focus:ring-1 focus:ring-primary-20 transition-colors"
            >
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
            </select>
          </div>
          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
            <Calculator size={16} />
            Calcular
          </Button>
        </form>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-grey-20 bg-white p-6">
        <h2 className="text-lg font-semibold text-grey-90 mb-6">Resultado estimado</h2>
        {results ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <ResultRow label="CIF (FOB + Frete + Seguro)" value={results.cif} />
            <ResultRow label="II — Imposto de Importação (14%)" value={results.ii} />
            <ResultRow label="IPI (5%)" value={results.ipi} />
            <ResultRow label="PIS (2,11%)" value={results.pis} />
            <ResultRow label="COFINS (9,65%)" value={results.cofins} />
            <ResultRow label="ICMS estimado (12%)" value={results.icms} />
            <div className="mt-4 pt-4">
              <ResultRow label="Custo Total Estimado" value={results.total} highlight />
            </div>
            <p className="text-xs text-grey-50 mt-4">
              * Valores estimados para fins de planejamento. Alíquotas reais variam conforme NCM e regime tributário. Consulte um despachante aduaneiro.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-grey-10 flex items-center justify-center mb-4">
              <Calculator size={28} className="text-grey-40" strokeWidth={1.5} />
            </div>
            <p className="text-grey-50 text-sm">Preencha os dados e clique em Calcular para ver o resultado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalculadoraPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-grey-10">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Calculadora de Importação</h1>
          <p className="text-primary-10/70 text-lg">Simule os custos e impostos da sua importação.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isAuthenticated ? (
          <CalculatorTool />
        ) : (
          <ContentGate returnUrl="/apps/calculadora-importacao">
            <CalculatorTool />
          </ContentGate>
        )}
      </div>
    </div>
  );
}
