"use client";

import Link from "next/link";
import { Flame, Clock, Pizza, ArrowLeft, Users, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* 뱃지 */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB703]/20 border border-[#FFB703]/50 text-[#684B35] font-bold text-xs mb-6">
        <Flame className="w-3.5 h-3.5 text-[#E63946] animate-pulse" />
        <span>Coming Soon · 오븐에서 구워지는 중</span>
      </div>

      {/* 오븐 그래픽 컨테이너 */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* 뒤쪽 따뜻한 오븐 열기 블러 */}
        <div className="absolute w-48 h-48 bg-gradient-to-tr from-[#E63946]/30 via-[#FFB703]/30 to-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* 오븐 박스 일러스트 카드 */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#F4ECE0] border-4 border-[#E7DBC8] shadow-2xl flex flex-col items-center justify-center p-6 gap-3">
          {/* 모락모락 김 피어오르는 애니메이션 */}
          <div className="flex gap-2 text-2xl -mt-4 animate-steam">
            <span>♨️</span>
            <span>♨️</span>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-[#E63946] flex items-center justify-center text-white shadow-md animate-bounce duration-1000">
              <Pizza className="w-12 h-12" />
            </div>
            <span className="absolute -top-2 -right-2 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB703] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#FFB703] border-2 border-white items-center justify-center text-[9px] font-black text-[#2B1E16]">
                5
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-[#684B35]">
            <Clock className="w-3.5 h-3.5 text-[#E63946]" />
            <span>오븐 온도 350°C</span>
          </div>
        </div>
      </div>

      {/* 메인 타이틀 & 설명 */}
      <h1 className="text-3xl sm:text-5xl font-black text-[#2B1E16] tracking-tight mb-4">
        프로젝트를 맛있게 <br className="sm:hidden" />
        <span className="text-[#E63946]">굽고 있습니다!</span>
      </h1>

      <p className="text-base sm:text-lg text-[#684B35] font-medium max-w-lg mx-auto leading-relaxed mb-8">
        피자스타트업의 5가지 토핑(남궁지영, 민아현, 윤서현, 이주현, 임다희)이 
        하나로 뭉쳐 선보일 첫 번째 프로젝트가 곧 공개됩니다. 조금만 기다려주세요!
      </p>

      {/* 베이킹 진행 게이지 (위트 있는 디테일) */}
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-[#E7DBC8] p-5 shadow-xs mb-10 text-left">
        <div className="flex justify-between text-xs font-extrabold text-[#684B35] mb-2">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>도우 발효 및 토핑 배합 완료</span>
          </span>
          <span className="text-[#E63946]">Baking in Progress...</span>
        </div>
        <div className="w-full h-3.5 bg-[#FAF5ED] rounded-full overflow-hidden border border-[#E7DBC8]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFB703] via-[#FB8500] to-[#E63946] transition-all duration-1000"
            style={{ width: "78%" }}
          />
        </div>
        <p className="text-[11px] text-[#684B35]/80 mt-2 text-center">
          🔥 황금빛 치즈가 완벽하게 녹아내릴 때 오픈됩니다.
        </p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/team"
          className="px-6 py-3.5 rounded-xl bg-[#E63946] text-white font-extrabold text-sm shadow-md hover:bg-[#D62839] hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>팀원 소개 페이지 먼저 보기</span>
        </Link>

        <Link
          href="/"
          className="px-6 py-3.5 rounded-xl bg-white text-[#2B1E16] font-extrabold text-sm border-2 border-[#E7DBC8] hover:bg-[#F4ECE0] hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#684B35]" />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
