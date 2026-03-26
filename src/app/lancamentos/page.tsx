"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { launches } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

export default function LancamentosPage() {
  const [activeTab, setActiveTab] = useState<"video" | "podcast">("video");

  const filtered = launches.filter((l) => l.type === activeTab);

  return (
    <div className="min-h-screen bg-grey-00">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Lançamentos</h1>
          <p className="text-primary-10/70 text-lg">Vídeos de releases e episódios de podcast.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-1 bg-grey-10 rounded-xl p-1 w-fit mb-10">
          {(["video", "podcast"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "rounded-lg px-5 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-white text-grey-90 shadow-sm"
                  : "text-grey-60 hover:text-grey-90",
              ].join(" ")}
            >
              {tab === "video" ? "Videos" : "Podcasts"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="rounded-2xl border border-grey-20 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden group cursor-pointer">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.type === "video" ? (
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play size={22} className="text-primary-40 ml-1" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Headphones size={22} className="text-primary-40" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    {item.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-grey-90 mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-grey-60 line-clamp-2 mb-3">{item.description}</p>
                  <p className="text-xs text-grey-50">{formatDate(item.publishedAt)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
