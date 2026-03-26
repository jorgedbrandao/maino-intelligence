"use client";

import React from "react";
import { AlertCircle, Wrench, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ContentGate } from "@/components/ui/ContentGate";
import { useAuth } from "@/components/auth/AuthProvider";
import { siscomexUpdates } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

const typeConfig = {
  atualizacao: { label: "Atualização", variant: "update" as const, Icon: AlertCircle },
  manutencao: { label: "Manutenção", variant: "maintenance" as const, Icon: Wrench },
  nova_funcionalidade: { label: "Nova Funcionalidade", variant: "feature" as const, Icon: Sparkles },
};

function UpdateList() {
  return (
    <div className="flex flex-col gap-4">
      {siscomexUpdates.map((update, i) => {
        const config = typeConfig[update.type];
        const Icon = config.Icon;
        return (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-grey-20 bg-white p-5 flex gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-grey-10 flex items-center justify-center">
              <Icon size={18} className="text-grey-60" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant={config.variant}>{config.label}</Badge>
                <span className="text-xs text-grey-50">{formatDate(update.date)}</span>
              </div>
              <h3 className="font-semibold text-grey-90 mb-1">{update.title}</h3>
              <p className="text-sm text-grey-60 leading-relaxed">{update.description}</p>
              {update.source && (
                <a
                  href={update.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-20 hover:text-primary-30 transition-colors mt-2 inline-block"
                >
                  Ver fonte oficial
                </a>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function NovSiscomexPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-grey-10">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Novidades do SISCOMEX</h1>
          <p className="text-primary-10/70 text-lg">
            Atualizações, manutenções e novas funcionalidades do sistema aduaneiro.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {isAuthenticated ? (
          <UpdateList />
        ) : (
          <ContentGate returnUrl="/apps/novidades-siscomex">
            <UpdateList />
          </ContentGate>
        )}
      </div>
    </div>
  );
}
