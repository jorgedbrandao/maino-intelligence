"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="hero-bg py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center rounded-full border border-primary-10/30 bg-primary-10/10 px-3 py-1 text-xs font-medium text-primary-10 uppercase tracking-wide mb-6">
              Hub de Comércio Exterior
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Tudo sobre importação.{" "}
            <GradientText>Em um só lugar.</GradientText>
          </motion.h1>
          <motion.p
            className="text-lg text-primary-10/80 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Artigos, ferramentas e materiais para importadores que buscam eficiência e conhecimento atualizado sobre comércio exterior.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/artigos">
              <Button variant="white" size="lg">
                Explorar artigos
              </Button>
            </Link>
            <Link href="/apps">
              <Button
                variant="secondary"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Conhecer apps
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
