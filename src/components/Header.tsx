"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pizza, Users, Briefcase, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈", icon: Pizza },
    { href: "/team", label: "팀원 소개", icon: Users, badge: "완성" },
    { href: "/projects", label: "프로젝트", icon: Briefcase, badge: "준비 중" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF6EE]/90 backdrop-blur-md border-b border-[#E7DBC8]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-transform hover:scale-102"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#E63946] flex items-center justify-center text-white shadow-md shadow-[#E63946]/25 group-hover:rotate-12 transition-transform duration-300">
            <Pizza className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#2B1E16] flex items-center gap-1.5">
              피자스타트업
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#FFB703] text-[#2B1E16] font-semibold">
                Pizza 5
              </span>
            </span>
            <span className="text-[11px] text-[#684B35] font-medium">
              5조각이 완성하는 하나의 비전
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#2B1E16] text-[#FFFDF9] shadow-sm"
                    : "text-[#684B35] hover:text-[#2B1E16] hover:bg-[#F4ECE0]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      item.badge === "완성"
                        ? isActive
                          ? "bg-[#E63946] text-white"
                          : "bg-[#E63946]/15 text-[#E63946]"
                        : isActive
                        ? "bg-stone-600 text-stone-200"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
