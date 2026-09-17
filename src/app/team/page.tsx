"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InteractivePizza from "@/components/InteractivePizza";
import MemberDetailCard from "@/components/MemberDetailCard";
import MemberAvatar from "@/components/MemberAvatar";
import { teamMembers, TeamMember } from "@/data/team";
import confetti from "canvas-confetti";
import { Sparkles, Pizza, ChevronRight, Layers } from "lucide-react";

function TeamContent() {
  const searchParams = useSearchParams();
  const initialMemberId = searchParams.get("member");

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // URL 파라미터가 있으면 해당 멤버 선택, 없으면 기본적으로 1번째 멤버(남궁지영) 선택
  useEffect(() => {
    if (initialMemberId) {
      const found = teamMembers.find((m) => m.id === initialMemberId);
      if (found) {
        setSelectedMember(found);
        return;
      }
    }
    // 기본 선택
    setSelectedMember(teamMembers[0]);
  }, [initialMemberId]);

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);

    // 조각을 눌렀을 때 피자 컬러의 축하 컨페티 효과
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: [member.color, "#FFB703", "#E63946", "#FAF5ED"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
      {/* 페이지 상단 헤더 */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20 text-xs font-bold">
          <Pizza className="w-3.5 h-3.5" />
          <span>완성본 · 5인 5색 인터랙티브 피자</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B1E16] tracking-tight">
          피자스타트업 팀원 소개
        </h1>
        <p className="text-sm sm:text-base text-[#684B35] font-medium leading-relaxed">
          피자 한 판은 5개의 특별한 조각으로 완성됩니다. 
          아래 피자에서 <strong className="text-[#E63946]">원하는 조각을 클릭</strong>하여 각 팀원의 상세 프로필을 확인해보세요!
        </p>

        {/* 빠른 팀원 선택 탭 (모바일 및 데스크톱 공용) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {teamMembers.map((member, idx) => {
            const isSelected = selectedMember?.id === member.id;
            return (
              <button
                key={member.id}
                onClick={() => handleSelectMember(member)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#2B1E16] text-white border-[#2B1E16] shadow-md scale-105"
                    : "bg-white text-[#684B35] border-[#E7DBC8] hover:bg-[#F4ECE0]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: member.color }}
                />
                <span>
                  #{idx + 1} {member.name}
                </span>
                <span className="text-[10px] opacity-80">({member.topping})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 핵심 인터랙션 영역: 좌측 5조각 피자 + 우측 선택된 팀원 상세 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* 좌측: 5조각 인터랙티브 피자 */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xs rounded-3xl border-2 border-[#E7DBC8] p-6 sm:p-10 shadow-sm relative">
          <div className="w-full max-w-[450px]">
            <InteractivePizza
              selectedMemberId={selectedMember?.id}
              onSelectMember={handleSelectMember}
              interactive={true}
            />
          </div>

          <div className="mt-8 text-center text-xs text-[#684B35] flex items-center gap-1.5 bg-[#FAF5ED] px-4 py-2 rounded-xl border border-[#E7DBC8]/60">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>선택된 조각은 바깥쪽으로 부드럽게 분리되며 하이라이트됩니다.</span>
          </div>
        </div>

        {/* 우측: 선택된 팀원 상세 카드 (요구사항: 조각 누르면 상세 카드 오픈) */}
        <div className="lg:col-span-6 w-full sticky top-24">
          {selectedMember ? (
            <MemberDetailCard
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
              onSelectMember={handleSelectMember}
            />
          ) : (
            /* 선택되지 않았을 때의 안내 상태 */
            <div className="bg-white/80 rounded-3xl border-2 border-dashed border-[#E7DBC8] p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[380px]">
              <div className="w-16 h-16 rounded-full bg-[#FAF5ED] border border-[#E7DBC8] flex items-center justify-center text-3xl">
                🍕
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2B1E16]">
                  피자 조각을 선택해주세요
                </h3>
                <p className="text-sm text-[#684B35] mt-1">
                  왼쪽 피자 판에서 원하는 팀원의 조각을 클릭하면 상세 카드가 나타납니다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {teamMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMember(m)}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FAF5ED] hover:bg-[#F4ECE0] text-[#2B1E16] border border-[#E7DBC8]"
                  >
                    {m.name} 카드 열기
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 섹션: 5인 전체 프로필 일람 (한눈에 보기) */}
      <div className="pt-8 border-t border-[#E7DBC8]">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-[#E63946]" />
          <h2 className="text-xl sm:text-2xl font-black text-[#2B1E16]">
            피자스타트업 5인 전원 프로필 한눈에 보기
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {teamMembers.map((m, idx) => {
            const isSelected = selectedMember?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => handleSelectMember(m)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col items-center text-center gap-3 ${
                  isSelected
                    ? "bg-white border-[#2B1E16] shadow-lg scale-102"
                    : "bg-[#FAF5ED] border-[#E7DBC8] hover:bg-white hover:border-[#684B35]"
                }`}
              >
                <div className="w-full flex items-center justify-between text-[11px] font-bold text-[#684B35]">
                  <span>조각 #{idx + 1}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                </div>

                {/* 원형 색 블록 아바타 */}
                <MemberAvatar member={m} size="md" showToppingBadge />

                <div>
                  <h4 className="font-extrabold text-base text-[#2B1E16]">
                    {m.name}
                  </h4>
                  <p className="text-xs font-medium text-[#E63946]">
                    {m.topping} ({m.toppingEnglish})
                  </p>
                </div>

                <div className="w-full pt-2 border-t border-[#E7DBC8]/60 text-xs">
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#684B35] font-semibold">역할</span>
                    <span className="text-[#2B1E16] font-bold">{m.role}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#684B35] font-semibold">소개</span>
                    <span className="text-[#2B1E16] font-medium">{m.bio}</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[#684B35] group-hover:text-[#2B1E16] flex items-center gap-0.5 mt-1">
                  <span>조각 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-[#684B35] font-bold">
          🍕 피자를 굽는 중입니다...
        </div>
      }
    >
      <TeamContent />
    </Suspense>
  );
}
