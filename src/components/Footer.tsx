import Link from "next/link";
import { PizzaSliceIcon } from "@/components/ToppingIcons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-dashed border-[#E7DBC8] bg-[#F4ECE0]/90 text-[#5C4033] py-10 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#D9383A] border-2 border-[#4A3525] flex items-center justify-center text-white shadow-[2px_2px_0px_#4A3525]">
            <PizzaSliceIcon size={20} />
          </div>
          <div>
            <p className="font-heading text-lg text-[#2B1E16]">피자스타트업</p>
            <p className="text-xs text-[#5C4033] font-body">남궁지영 · 민아현 · 윤서현 · 이주현 · 임다희</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-heading">
          <Link href="/" className="hover:text-[#D9383A] transition-colors">홈</Link>
          <Link href="/team" className="hover:text-[#D9383A] transition-colors">팀원 소개</Link>
          <Link href="/projects" className="hover:text-[#D9383A] transition-colors">프로젝트 소개</Link>
        </div>

        <p className="text-xs text-[#5C4033] font-body bg-white/60 px-3 py-1.5 rounded-full border border-[#E7DBC8] rotate-[1deg]">
          잘 구워진 피자처럼 완벽한 5인의 케미스트리
        </p>
      </div>
    </footer>
  );
}
