"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-base-600/60 bg-base-900/80 backdrop-blur-lg">
      <div className="flex w-full items-center justify-between px-16 py-4 lg:px-24">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 shadow-glow">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="text-xl tracking-tight">Protégé</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 transition-all ${
              pathname === "/"
                ? "bg-accent-600 text-white"
                : "border border-white/10 text-gray-400 hover:border-purple-500 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            href="/session" scroll={true}
            className={`rounded-full px-5 py-2 transition-all ${
              pathname === "/session"
                ? "bg-accent-600 text-white"
                : "border border-white/10 text-gray-400 hover:border-purple-500 hover:text-white"
            }`}
          >
            Session
          </Link>

          <Link
            href="/report"
            className={`rounded-full px-5 py-2 transition-all ${
              pathname === "/report"
                ? "bg-accent-600 text-white"
                : "border border-white/10 text-gray-400 hover:border-purple-500 hover:text-white"
            }`}
          >
            Report
          </Link>
        </nav>
      </div>
    </header>
  );
}