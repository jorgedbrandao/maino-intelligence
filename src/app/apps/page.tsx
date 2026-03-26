import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Bell, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";

export const metadata: Metadata = { title: "Apps" };

const apps = [
  {
    icon: Calculator,
    title: "Calculadora de Importação",
    description:
      "Simule o custo total de uma importação incluindo II, IPI, PIS, COFINS e ICMS. Suporte a Simples Nacional, Lucro Presumido e Lucro Real.",
    href: "/apps/calculadora-importacao",
    badge: "Ferramenta",
  },
  {
    icon: Bell,
    title: "Novidades do SISCOMEX",
    description:
      "Acompanhe em tempo real as últimas atualizações, manutenções programadas e novas funcionalidades do SISCOMEX.",
    href: "/apps/novidades-siscomex",
    badge: "Monitor",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-grey-00">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Apps</h1>
          <p className="text-primary-10/70 text-lg">
            Ferramentas interativas para simplificar seu trabalho no comércio exterior.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <GlowCard key={app.href} className="p-8 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-10/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-primary-30" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <span className="inline-flex items-center rounded-full bg-secondary-10/50 text-secondary-40 text-xs font-medium px-2.5 py-0.5 mb-2 uppercase tracking-wide">
                      {app.badge}
                    </span>
                    <h2 className="text-xl font-semibold text-grey-90">{app.title}</h2>
                  </div>
                </div>
                <p className="text-grey-60 leading-relaxed">{app.description}</p>
                <Link
                  href={app.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-20 hover:text-primary-30 transition-colors mt-auto"
                >
                  Abrir app
                  <ArrowRight size={14} />
                </Link>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
