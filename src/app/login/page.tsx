import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Form side */}
      <div className="flex flex-1 flex-col justify-center px-8 py-16 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <p className="font-bold text-2xl text-primary-40 mb-6">mainô</p>
            <h1 className="text-3xl font-bold text-grey-90 mb-2">Bem-vindo de volta</h1>
            <p className="text-grey-60">Preencha seus dados para acessar a plataforma.</p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      {/* Decorative side */}
      <div className="hidden lg:flex flex-1 items-center justify-center hero-bg relative">
        <div className="relative z-10 text-center px-12">
          <p className="text-5xl font-bold text-white mb-4">mainô intelligence</p>
          <p className="text-primary-10/70 text-lg max-w-sm leading-relaxed">
            O hub definitivo de conhecimento para profissionais de comércio exterior.
          </p>
        </div>
      </div>
    </div>
  );
}
