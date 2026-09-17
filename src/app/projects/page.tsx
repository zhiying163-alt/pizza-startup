"use client";

import Link from "next/link";
import { PizzaSliceIcon } from "@/components/ToppingIcons";
import { Clock, ArrowLeft, Users, Sparkles, Flame } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center animate-fade-in-up">
      
      {/* 상단 스티커 뱃지 (수제 틸트 -1.5도) */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#4A3525] text-[#D9383A] font-heading text-xs shadow-[2px_3px_0px_#4A3525] rotate-[-1.5deg] mb-6">
        <Flame className="w-4 h-4 text-[#D9383A] animate-pulse" />
        <span>Coming Soon · 오븐에서 맛있게 구워지는 중</span>
      </div>

      {/* 오븐 박스 일러스트 컨테이너 (수제 스티커 감성) */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* 뒤쪽 따뜻한 베이킹 온기 */}
        <div className="absolute w-52 h-52 bg-[#F5A623]/25 rounded-full blur-2xl pointer-events-none" />

        {/* 오븐 박스 카드 (살짝 2도 기울기) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[36px] bg-[#FFFDF9] border-3 border-[#4A3525] shadow-[6px_8px_0px_rgba(74,53,37,0.2)] flex flex-col items-center justify-center p-6 gap-3 rotate-[2deg]">
          
          {/* 수제 연기 SVG (이모지 완전 배제) */}
          <div className="flex gap-2.5 -mt-3 text-[#D9383A] opacity-70 animate-steam">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 20C6 17 10 14 8 10C6 7 10 4 8 2" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M16 20C14 17 18 14 16 10C14 7 18 4 16 2" />
            </svg>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-[#D9383A] border-2 border-[#4A3525] flex items-center justify-center text-white shadow-[3px_3px_0px_#4A3525] animate-bounce duration-1000">
              <PizzaSliceIcon size={38} />
            </div>
            <span className="absolute -top-2 -right-2 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-[#F5A623] border-2 border-[#4A3525] items-center justify-center font-heading text-xs text-[#2B1E16]">
                5
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-heading text-xs text-[#5C4033] bg-[#F4ECE0] px-3 py-1 rounded-full border border-[#4A3525]/30">
            <Clock className="w-3.5 h-3.5 text-[#D9383A]" />
            <span>오븐 온도 350°C</span>
          </div>
        </div>
      </div>

      {/* 메인 타이틀 (Jua 폰트 및 포인트 그라데이션) */}
      <h1 className="font-heading text-3xl sm:text-5xl text-[#2B1E16] tracking-tight mb-4">
        프로젝트를 맛있게 <br className="sm:hidden" />
        <span className="bg-gradient-to-r from-[#D9383A] via-[#E85D04] to-[#F5A623] bg-clip-text text-transparent">
          굽고 있습니다!
        </span>
      </h1>

      {/* 설명 (Gowun Dodum 폰트) */}
      <p className="font-body text-base sm:text-lg text-[#5C4033] font-medium max-w-lg mx-auto leading-relaxed mb-8">
        피자스타트업의 5가지 토핑(남궁지영, 민아현, 윤서현, 이주현, 임다희)이 
        하나로 뭉쳐 선보일 첫 번째 프로젝트가 곧 공개됩니다. 조금만 기다려주세요!
      </p>

      {/* 베이킹 진행 게이지 (수제 종이 카드 스타일, -1도 틸트) */}
      <div className="w-full max-w-md bg-[#FFFDF9] rounded-[28px] border-3 border-[#4A3525] p-5 shadow-[4px_6px_0px_rgba(74,53,37,0.18)] mb-10 text-left rotate-[-1deg]">
        <div className="flex justify-between font-heading text-xs text-[#5C4033] mb-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>도우 발효 및 토핑 배합 완료</span>
          </span>
          <span className="text-[#D9383A]">Baking 78%</span>
        </div>
        <div className="w-full h-4 bg-[#F4ECE0] rounded-full overflow-hidden border-2 border-[#4A3525]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F5A623] to-[#D9383A] transition-all duration-1000"
            style={{ width: "78%" }}
          />
        </div>
        <p className="font-body text-xs text-[#5C4033] mt-2.5 text-center font-bold">
          황금빛 치즈가 완벽하게 녹아내릴 때 오픈됩니다.
        </p>
      </div>

      {/* 액션 버튼 (말랑한 버튼 인터랙션 및 포인트 그라데이션) */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/team"
          className="btn-squish px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D9383A] to-[#E65100] text-white font-heading text-sm border-2 border-[#4A3525] shadow-[2px_4px_0px_#4A3525] flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>팀원 소개 페이지 먼저 보기</span>
        </Link>

        <Link
          href="/"
          className="btn-squish px-6 py-3.5 rounded-2xl bg-[#FFFDF9] text-[#2B1E16] font-heading text-sm border-2 border-[#4A3525] shadow-[2px_4px_0px_#4A3525] hover:bg-[#F4ECE0] flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#5C4033]" />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </div>
  );
}
