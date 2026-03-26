import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Article } from "@/types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artigos/${article.slug}`} className="block group">
      <div className="rounded-2xl border border-grey-20 bg-white overflow-hidden transition-shadow duration-200 hover:shadow-lg h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <Badge variant="primary">{article.category}</Badge>
          <h3 className="font-semibold text-grey-90 text-base line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-grey-60 line-clamp-2 flex-1">{article.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-grey-50 mt-1">
            <span>{formatDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readingTime} min de leitura</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
