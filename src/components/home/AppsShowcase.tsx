"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Bell, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { Modal } from "@/components/ui/Modal";
import { LoginForm } from "@/components/auth/LoginForm";

const apps = [
  {
    icon: Calculator,
    title: "Calculadora de Importação",
    description: "Simule impostos, taxas e custos totais de importação. Suporte a diferentes regimes tributários.",
    href: "/apps/calculadora-importacao",
  },
  {
    icon: Bell,
    title: "Novidades do SISCOMEX",
    description: "Acompanhe as últimas atualizações, manutenções e novas funcionalidades do sistema aduaneiro.",
    href: "/apps/novidades-siscomex",
  },
];

function AppCard({ app }: { app: (typeof apps)[number] }) {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const Icon = app.icon;

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setLoginOpen(true);
    }
  };

  return (
    <>
      <GlowCard className="p-6 flex flex-col gap-4 h-full">
        <div className="w-12 h-12 rounded-xl bg-primary-10/20 flex items-center justify-center flex-shrink-0">
          <Icon size={24} className="text-primary-30" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-grey-90 mb-2">{app.title}</h3>
          <p className="text-sm text-grey-60 leading-relaxed">{app.description}</p>
        </div>
        <Link
          href={app.href}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-20 hover:text-primary-30 transition-colors"
        >
          Acessar
          <ArrowRight size={14} />
        </Link>
      </GlowCard>
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Acesse sua conta">
        <LoginForm />
      </Modal>
    </>
  );
}

export function AppsShowcase() {
  return (
    <section className="bg-grey-10 dot-pattern py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-grey-90 mb-2">Ferramentas para importadores</h2>
          <p className="text-grey-60">Aplicativos que simplificam seu dia a dia no comex.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app, i) => (
            <motion.div
              key={app.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AppCard app={app} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
