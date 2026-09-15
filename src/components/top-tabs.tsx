"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "顧客窓口" },
  { href: "/ai", label: "社内AI" },
  { href: "/communication", label: "社内コミュニケーション" },
] as const;

export function TopTabs() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/10" style={{ background: "var(--nav-bg)" }}>
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-3 sm:gap-6 sm:px-6 sm:py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent-light))" }}
          >
            <span className="text-[13px] font-extrabold text-white">S</span>
          </div>
          <span className="hidden text-[13.5px] font-bold tracking-wide whitespace-nowrap text-white sm:inline">
            株式会社サンプル
          </span>
        </Link>

        <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1.5">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="shrink-0 rounded-full px-2.5 py-1.5 text-[12px] font-semibold whitespace-nowrap sm:px-3.5 sm:py-2 sm:text-[13px]"
                style={active ? { background: "var(--accent)", color: "#fff" } : { color: "rgba(255,255,255,0.65)" }}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
