export const SITE_NAME = "Mainô Intelligence";
export const SITE_DESCRIPTION =
  "Artigos, ferramentas e materiais para profissionais de importação e comércio exterior.";
export const SITE_URL = "https://intelligence.maino.com.br";
export const MAINO_SITE_URL = "https://maino.com.br";

export const NAV_LINKS = [
  { label: "Artigos", href: "/artigos", protected: false },
  { label: "Materiais", href: "/materiais", protected: true },
  { label: "Apps", href: "/apps", protected: true },
  { label: "Lançamentos", href: "/lancamentos", protected: true },
  { label: "Reports", href: "/reports", protected: true },
];

export const ARTICLE_CATEGORIES = [
  "Todos",
  "Importação",
  "Legislação",
  "Logística",
  "Tecnologia",
] as const;

export const MATERIAL_TYPES = [
  { value: "todos", label: "Todos" },
  { value: "ebook", label: "E-book" },
  { value: "infografico", label: "Infográfico" },
  { value: "guia", label: "Guia" },
  { value: "pdf", label: "PDF" },
] as const;
