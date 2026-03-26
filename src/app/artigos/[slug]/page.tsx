import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  const fallbackRelated = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const displayRelated = related.length >= 1 ? related : fallbackRelated;

  return (
    <div className="min-h-screen bg-grey-00">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/artigos"
          className="inline-flex items-center gap-1.5 text-sm text-grey-50 hover:text-grey-70 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Voltar para artigos
        </Link>

        <Badge variant="primary" className="mb-4">{article.category}</Badge>
        <h1 className="text-4xl font-bold text-grey-90 leading-tight mb-4">{article.title}</h1>
        <div className="flex items-center gap-3 text-sm text-grey-50 mb-8">
          <span>{article.author}</span>
          <span>·</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readingTime} min de leitura</span>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="prose prose-lg max-w-none text-grey-90 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_strong]:font-semibold">
          {article.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
            if (line.startsWith("- **")) {
              const match = line.match(/^- \*\*(.+?)\*\*(.+)$/);
              return match ? <p key={i}><strong>{match[1]}</strong>{match[2]}</p> : <p key={i}>{line.replace(/^- /, "")}</p>;
            }
            if (line.startsWith("- ")) return <p key={i} className="pl-4 border-l-2 border-grey-20 text-grey-70">{line.replace("- ", "")}</p>;
            if (line.trim() === "") return null;
            return <p key={i}>{line}</p>;
          })}
        </div>
      </div>

      {displayRelated.length > 0 && (
        <div className="border-t border-grey-20 bg-grey-10 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-grey-90 mb-8">Artigos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayRelated.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
