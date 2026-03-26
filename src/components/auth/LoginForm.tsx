"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/";

  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (!form.email.trim()) e.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email inválido";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    login({ name: form.name, email: form.email, company: form.company || undefined });
    router.push(returnUrl);
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Nome"
        required
        placeholder="Seu nome completo"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
        autoComplete="name"
      />
      <Input
        label="Email"
        type="email"
        required
        placeholder="seu@email.com"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
        autoComplete="email"
      />
      <Input
        label="Empresa"
        placeholder="Nome da sua empresa (opcional)"
        value={form.company}
        onChange={handleChange("company")}
        autoComplete="organization"
      />
      <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
        Acessar a plataforma
      </Button>
    </form>
  );
}
