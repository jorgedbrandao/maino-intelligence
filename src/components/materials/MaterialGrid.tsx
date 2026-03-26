"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { MATERIAL_TYPES } from "@/lib/constants";
import type { Material } from "@/types";

export function MaterialGrid({ materials }: { materials: Material[] }) {
  const [activeType, setActiveType] = useState("todos");

  const filtered = materials.filter(
    (m) => activeType === "todos" || m.type === activeType
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {MATERIAL_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveType(t.value)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeType === t.value
                ? "bg-primary-30 text-white"
                : "bg-grey-15 text-grey-60 hover:bg-grey-20",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <MaterialCard material={m} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
