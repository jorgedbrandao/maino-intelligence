import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { reports } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Reports" };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-grey-00">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Reports</h1>
          <p className="text-primary-10/70 text-lg">
            Análises interativas e dashboards para profissionais de comex.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Link key={report.id} href={`/reports/${report.slug}`} className="block group">
              <div className="rounded-2xl border border-grey-20 bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 aspect-video md:aspect-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={report.coverImage}
                    alt={report.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="200px"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-grey-90 mb-2 line-clamp-2">{report.title}</h3>
                    <p className="text-sm text-grey-60 line-clamp-3">{report.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-grey-50">{formatDate(report.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-20 group-hover:text-primary-30 transition-colors">
                      Ler report
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
