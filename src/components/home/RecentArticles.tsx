"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/mock-data";

export function RecentArticles() {
  const recent = articles.slice(0, 3);

  return (
    <section className="bg-grey-00 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-grey-90 mb-2">Novos artigos</h2>
            <p className="text-grey-60">Conteúdo atualizado sobre comércio exterior.</p>
          </div>
          <Link
            href="/artigos"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-20 hover:text-primary-30 transition-colors flex-shrink-0"
          >
            Ver todos
            <ArrowRight size={14} />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/artigos" className="flex items-center gap-1.5 text-sm font-medium text-primary-20 hover:text-primary-30 transition-colors">
            Ver todos os artigos
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
