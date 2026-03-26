"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

export function CTABanner() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return null;

  return (
    <section className="bg-primary-40 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Acesse todos os recursos gratuitamente
          </h2>
          <p className="text-primary-10/80 text-lg mb-8 max-w-xl mx-auto">
            Crie sua conta e tenha acesso a materiais, apps, lançamentos e reports exclusivos.
          </p>
          <Link href="/login">
            <Button variant="white" size="lg">
              Criar conta gratuita
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
