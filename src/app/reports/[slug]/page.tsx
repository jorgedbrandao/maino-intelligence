import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { reports } from "@/lib/mock-data";
import { ContentGate } from "@/components/ui/ContentGate";

export async function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const report = reports.find((r) => r.slug === params.slug);
  if (!report) return {};
  return { title: report.title, description: report.description };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default function ReportPage({ params }: { params: { slug: string } }) {
  const report = reports.find((r) => r.slug === params.slug);
  if (!report) notFound();

  return (
    <div className="min-h-screen bg-grey-00">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/reports"
          className="inline-flex items-center gap-1.5 text-sm text-grey-50 hover:text-grey-70 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Voltar para reports
        </Link>

        <h1 className="text-4xl font-bold text-grey-90 mb-3">{report.title}</h1>
        <p className="text-grey-60 text-lg mb-4">{report.description}</p>
        <p className="text-sm text-grey-50 mb-8">{formatDate(report.publishedAt)}</p>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
          <Image
            src={report.coverImage}
            alt={report.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        <ContentGate returnUrl={`/reports/${report.slug}`}>
          <div className="prose prose-lg max-w-none text-grey-90 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-4">
            {report.content.split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i}>{line.replace("# ", "")}</h1>;
              if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>;
              if (line.trim() === "") return null;
              return <p key={i}>{line}</p>;
            })}
          </div>
        </ContentGate>
      </div>
    </div>
  );
}
