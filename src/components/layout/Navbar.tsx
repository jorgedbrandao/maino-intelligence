"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ExternalLink, ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, MAINO_SITE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useAuth } from "@/components/auth/AuthProvider";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = user
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-grey-20 h-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-xl text-primary-40 hover:text-primary-50 transition-colors">
            mainô
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "text-sm transition-colors duration-200",
                    isActive
                      ? "text-primary-30 font-semibold"
                      : "font-medium text-grey-60 hover:text-grey-90",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={MAINO_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-grey-60 hover:text-grey-90 transition-colors"
            >
              Site Mainô
              <ExternalLink size={13} />
            </a>
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-grey-10 transition-colors"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-30 flex items-center justify-center text-white text-xs font-semibold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-grey-70 max-w-[120px] truncate">{user?.name}</span>
                  <ChevronDown size={14} className="text-grey-50" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-grey-20 bg-white shadow-lg py-1"
                    >
                      <div className="px-3 py-2 border-b border-grey-20">
                        <p className="text-xs text-grey-50">Logado como</p>
                        <p className="text-sm font-medium text-grey-90 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => { logout(); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-grey-60 hover:bg-grey-10 hover:text-grey-90 transition-colors"
                      >
                        <LogOut size={14} />
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden rounded-lg p-1.5 text-grey-60 hover:bg-grey-10 hover:text-grey-90 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}
