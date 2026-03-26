"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentGate } from "@/components/ui/ContentGate";

interface ProtectedRouteProps {
  children: React.ReactNode;
  returnUrl?: string;
}

export function ProtectedRoute({ children, returnUrl }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <>{children}</>;
  return <ContentGate returnUrl={returnUrl}>{children}</ContentGate>;
}
