"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

interface ContentGateProps {
  children: React.ReactNode;
  returnUrl?: string;
}

export function ContentGate({ children, returnUrl = "/" }: ContentGateProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="relative">
      <div className="content-gate">{children}</div>
      <div className="relative z-10 flex flex-col items-center gap-4 pb-8 pt-4 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-10/20">
          <Lock size={20} className="text-primary-30" />
        </div>
        <div>
          <p className="text-base font-semibold text-grey-90">Faça login para acessar o conteúdo completo</p>
          <p className="text-sm text-grey-60 mt-1">Crie sua conta gratuita e acesse todos os materiais.</p>
        </div>
        <Button variant="primary" size="md" asChild>
          <Link href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}>
            Entrar
          </Link>
        </Button>
      </div>
    </div>
  );
}
