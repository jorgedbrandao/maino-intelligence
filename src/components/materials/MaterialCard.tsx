"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Material } from "@/types";

const typeLabels: Record<Material["type"], string> = {
  ebook: "E-book",
  infografico: "Infográfico",
  guia: "Guia",
  pdf: "PDF",
};

export function MaterialCard({ material }: { material: Material }) {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleDownload = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    window.open(material.downloadUrl, "_blank");
  };

  return (
    <>
      <div className="rounded-2xl border border-grey-20 bg-white overflow-hidden transition-shadow duration-200 hover:shadow-lg flex flex-col">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={material.coverImage}
            alt={material.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          {!isAuthenticated && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
              <Lock size={14} className="text-white/80" />
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-3 flex-1">
          <Badge variant="primary">{typeLabels[material.type]}</Badge>
          <h3 className="font-semibold text-sm text-grey-90 line-clamp-2 flex-1">
            {material.title}
          </h3>
          <Button
            variant={isAuthenticated ? "primary" : "secondary"}
            size="sm"
            onClick={handleDownload}
            className="w-full"
          >
            {isAuthenticated ? (
              <>
                <Download size={13} />
                Baixar
              </>
            ) : (
              <>
                <Lock size={13} />
                Acessar
              </>
            )}
          </Button>
        </div>
      </div>
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Acesse sua conta">
        <p className="text-sm text-grey-60 mb-4">Faça login para baixar este material gratuitamente.</p>
        <LoginForm />
      </Modal>
    </>
  );
}
