import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Mainô Intelligence — Hub de Comércio Exterior",
    template: "%s | Mainô Intelligence",
  },
  description:
    "Artigos, ferramentas e materiais para profissionais de importação e comércio exterior.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mainô Intelligence",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-grey-00 text-grey-90 antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
