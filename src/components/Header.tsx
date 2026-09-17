"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PizzaSliceIcon } from "@/components/ToppingIcons";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "홈" },
    { href: "/team", label: "팀원 소개", badge: "완성" },
    { href: "/projects", label: "프로젝트", badge: "준비 중" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF6EE]/92 backdrop-blur-sm border-b-2 border-dashed border-[#E7DBC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo - Jua 폰트 및 로고에만 따뜻한 토마토-치즈 그라데이션 포인트 적용 */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-102"
        >
          {/* 수제 느낌의 살짝 기운 피자 아이콘 박스 */}
          <div className="w-11 h-11 rounded-2xl bg-[#D9383A] border-2 border-[#4A3525] flex items-center justify-center text-white shadow-[2px_3px_0px_#4A3525] group-hover:rotate-[-6deg] transition-transform duration-300">
            <PizzaSliceIcon size={24} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl tracking-tight bg-gradient-to-r from-[#D9383A] via-[#E85D04] to-[#F5A623] bg-clip-text text-transparent">
                피자스타트업
              </span>
              <span className="font-heading text-[11px] px-2 py-0.5 rounded-full bg-[#F5A623] text-[#2B1E16] border border-[#4A3525] shadow-[1px_2px_0px_#4A3525] rotate-[-2deg]">
                5 Slices
              </span>
            </div>
            <span className="text-[12px] text-[#5C4033] font-medium">
              5조각이 모여 완성하는 하나의 비전
            </span>
          </div>
        </Link>

        {/* Navigation - 스티커/탭 감성 */}
        <nav className="flex items-center gap-1.5 sm:gap-3">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            const tilts = ["rotate-[-1.5deg]", "rotate-[1deg]", "rotate-[-1deg]"];
            const currentTilt = tilts[idx % tilts.length];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`btn-squish relative px-3.5 sm:px-4 py-2 rounded-2xl text-sm font-heading transition-all duration-200 flex items-center gap-1.5 border-2 ${
                  isActive
                    ? `bg-[#4A3525] text-[#FFFDF9] border-[#2B1E16] shadow-[2px_3px_0px_#2B1E16] ${currentTilt}`
                    : "bg-[#FFFDF9] text-[#5C4033] border-[#E7DBC8] hover:border-[#4A3525] hover:bg-[#F4ECE0]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-body font-bold border ${
                      item.badge === "완성"
                        ? isActive
                          ? "bg-[#D9383A] text-white border-transparent"
                          : "bg-[#D9383A]/15 text-[#D9383A] border-[#D9383A]/30"
                        : isActive
                        ? "bg-stone-700 text-stone-200 border-transparent"
                        : "bg-stone-200 text-stone-600 border-stone-300"
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
