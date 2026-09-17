import Link from "next/link";
import { Pizza, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E7DBC8] bg-[#F4ECE0]/80 text-[#684B35]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E63946] flex items-center justify-center text-white">
            <Pizza className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-[#2B1E16] text-sm">피자스타트업 (Pizza Startup)</p>
            <p className="text-xs text-[#684B35]/80">남궁지영 · 민아현 · 윤서현 · 이주현 · 임다희</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <Link href="/" className="hover:text-[#2B1E16] transition-colors">홈</Link>
          <Link href="/team" className="hover:text-[#2B1E16] transition-colors">팀원 소개</Link>
          <Link href="/projects" className="hover:text-[#2B1E16] transition-colors">프로젝트 소개</Link>
        </div>

        <p className="text-xs text-[#684B35]/70 flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-[#E63946] fill-[#E63946]" /> by 5 Pizza Slices
        </p>
      </div>
    </footer>
  );
}
