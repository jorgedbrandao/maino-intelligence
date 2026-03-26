export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Importação" | "Legislação" | "Logística" | "Tecnologia";
  thumbnail: string;
  publishedAt: string;
  readingTime: number;
  author: string;
}

export interface Material {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: "ebook" | "infografico" | "guia" | "pdf";
  coverImage: string;
  downloadUrl: string;
  publishedAt: string;
}

export interface Launch {
  id: string;
  title: string;
  description: string;
  type: "video" | "podcast";
  thumbnail: string;
  embedUrl: string;
  duration: string;
  publishedAt: string;
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  content: string;
  publishedAt: string;
}

export interface SiscomexUpdate {
  id: string;
  title: string;
  description: string;
  type: "atualizacao" | "manutencao" | "nova_funcionalidade";
  date: string;
  source: string;
}

export interface User {
  name: string;
  email: string;
  company?: string;
  loggedAt: string;
}
