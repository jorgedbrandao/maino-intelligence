"use client";

import React from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, MAINO_SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthProvider";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <div className="flex items-center justify-between p-4 border-b border-grey-20">
              <span className="font-bold text-xl text-primary-40">mainô</span>
              <button
                onClick={onClose}
                aria-label="Fechar menu"
                className="rounded-lg p-1.5 text-grey-50 hover:bg-grey-10 hover:text-grey-70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={[
                        "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "bg-primary-10/20 text-primary-30 font-semibold"
                          : "text-grey-60 hover:bg-grey-10 hover:text-grey-90",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={MAINO_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-grey-60 hover:bg-grey-10 hover:text-grey-90 transition-colors"
                  >
                    Site Mainô
                    <ExternalLink size={13} />
                  </a>
                </li>
              </ul>
            </nav>
            <div className="p-4 border-t border-grey-20">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-grey-60">
                    Olá, <span className="font-medium text-grey-90">{user?.name}</span>
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); onClose(); }}>
                    Sair
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={onClose}>
                  <Button variant="primary" size="md" className="w-full">
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
