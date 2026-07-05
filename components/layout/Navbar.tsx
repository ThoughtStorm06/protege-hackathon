"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-[90px] border-b border-base-600/60 bg-base-900/80 backdrop-blur-lg">
      <div className="flex w-full items-center justify-between px-8 lg:px-14 py-2">
        <Link href="/" className="flex items-center leading-none">
          <Image
            src="/protege-logo.png"
            alt="Protégé Logo"
            width={150}
            height={42}
            priority
            className="block h-25 w-auto object-contain"
          />
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