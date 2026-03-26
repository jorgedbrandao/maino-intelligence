import React from "react";
import Link from "next/link";

const columns = [
  {
    heading: "Produtos",
    links: [
      { label: "Artigos", href: "/artigos" },
      { label: "Materiais", href: "/materiais" },
      { label: "Lançamentos", href: "/lancamentos" },
      { label: "Reports", href: "/reports" },
    ],
  },
  {
    heading: "Recursos",
    links: [
      { label: "Calculadora", href: "/apps/calculadora-importacao" },
      { label: "Novidades SISCOMEX", href: "/apps/novidades-siscomex" },
      { label: "Apps", href: "/apps" },
    ],
  },
  {
    heading: "Empresa",
    links: [
      { label: "Sobre a Mainô", href: "https://maino.com.br/sobre", external: true },
      { label: "Contato", href: "https://maino.com.br/contato", external: true },
      { label: "Carreiras", href: "https://maino.com.br/carreiras", external: true },
      { label: "Blog", href: "/artigos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary-50 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <p className="font-bold text-2xl text-white mb-3">mainô</p>
            <p className="text-sm text-primary-10/70 leading-relaxed max-w-xs">
              Hub de conteúdo e ferramentas para profissionais de comércio exterior.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{col.heading}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-10/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-primary-10/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-10/60">
            © 2026 Mainô. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-primary-10/60 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-primary-10/60 hover:text-white transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
