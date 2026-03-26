"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/mock-data";
import { ARTICLE_CATEGORIES } from "@/lib/constants";

export default function ArtigosPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = activeCategory === "Todos" || a.category === activeCategory;
      const matchQuery =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-grey-00">
      {/* Header */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-white mb-3">Artigos</h1>
            <p className="text-primary-10/70 text-lg mb-8">
              Conteúdo especializado em importação e comércio exterior.
            </p>
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-50" />
              <input
                type="search"
                placeholder="Buscar artigos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-primary-30 bg-primary-40/50 pl-9 pr-4 py-2 text-sm text-white placeholder:text-primary-10/50 focus:outline-none focus:border-primary-10 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary-30 text-white"
                  : "bg-grey-15 text-grey-60 hover:bg-grey-20",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-grey-50 text-center py-16">Nenhum artigo encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
