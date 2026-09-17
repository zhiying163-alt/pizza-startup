"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InteractivePizza from "@/components/InteractivePizza";
import MemberDetailCard from "@/components/MemberDetailCard";
import MemberAvatar from "@/components/MemberAvatar";
import { teamMembers, TeamMember } from "@/data/team";
import {
  TomatoTopping,
  CheeseTopping,
  BasilTopping,
  OliveTopping,
  PepperoniTopping,
  PizzaSliceIcon,
} from "@/components/ToppingIcons";
import confetti from "canvas-confetti";
import { Sparkles, ChevronRight, Layers } from "lucide-react";

function TeamContent() {
  const searchParams = useSearchParams();
  const initialMemberId = searchParams.get("member");

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (initialMemberId) {
      const found = teamMembers.find((m) => m.id === initialMemberId);
      if (found) {
        setSelectedMember(found);
        return;
      }
    }
    // 기본 선택 (첫 번째 멤버)
    setSelectedMember(teamMembers[0]);
  }, [initialMemberId]);

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);

    // 조각을 눌렀을 때 피자 컬러의 수제 콘페티 효과
    try {
      confetti({
        particleCount: 22,
        spread: 55,
        origin: { y: 0.7 },
        colors: [member.color, "#F5A623", "#D9383A", "#FFFDF9", "#4A3525"],
      });
    } catch {
      // ignore
    }
  };

  // 수제 토핑 SVG 렌더러
  const renderToppingIcon = (type: string, size = 16) => {
    switch (type) {
      case "tomato":
        return <TomatoTopping size={size} />;
      case "cheese":
        return <CheeseTopping size={size} />;
      case "basil":
        return <BasilTopping size={size} />;
      case "olive":
        return <OliveTopping size={size} />;
      case "pepperoni":
        return <PepperoniTopping size={size} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-8 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16">
      
      {/* 페이지 상단 헤더 */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 animate-fade-in-up">
        {/* 수제 스티커 뱃지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] text-[#D9383A] border-2 border-[#4A3525] font-heading text-xs rotate-[-1.5deg] shadow-[2px_2px_0px_#4A3525]">
          <PizzaSliceIcon size={18} />
          <span>5인 5색 인터랙티브 피자</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#2B1E16] tracking-tight">
          피자스타트업 팀원 소개
        </h1>

        <p className="font-body text-base text-[#5C4033] font-medium leading-relaxed">
          피자 한 판은 5개의 특별한 조각으로 완성됩니다. <br className="hidden sm:inline" />
          아래 피자에서 <strong className="text-[#D9383A] font-bold">원하는 조각을 클릭</strong>하면 치즈가 늘어나듯 상세 소개 카드가 열립니다!
        </p>

        {/* 빠른 팀원 선택 스티커 탭 (각각 살짝 다른 기울기) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
          {teamMembers.map((member, idx) => {
            const isSelected = selectedMember?.id === member.id;
            const tilts = [
              "rotate-[-2deg]",
              "rotate-[1.5deg]",
              "rotate-[-1deg]",
              "rotate-[2deg]",
              "rotate-[-2.5deg]",
            ];
            const tabTilt = tilts[idx % tilts.length];

            return (
              <button
                key={member.id}
                onClick={() => handleSelectMember(member)}
                className={`btn-squish flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-heading text-xs transition-all duration-200 border-2 ${
                  isSelected
                    ? `bg-[#4A3525] text-white border-[#2B1E16] shadow-[2px_3px_0px_#2B1E16] ${tabTilt} scale-105`
                    : `bg-[#FFFDF9] text-[#5C4033] border-[#4A3525]/30 hover:border-[#4A3525] hover:bg-[#F4ECE0] ${tabTilt}`
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: member.color }}
                />
                <span>
                  #{idx + 1} {member.name}
                </span>
                <span className="opacity-90 flex items-center gap-0.5">
                  {renderToppingIcon(member.toppingType, 13)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 핵심 인터랙션 영역: 좌측 5조각 피자 + 우측 치즈 늘어나는 상세 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* 좌측: 5조각 인터랙티브 피자 컨테이너 */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-[#FFFDF9] rounded-[36px] border-3 border-[#4A3525] p-6 sm:p-10 shadow-[6px_8px_0px_rgba(74,53,37,0.18)] relative rotate-[0.5deg]">
          <div className="w-full max-w-[450px]">
            <InteractivePizza
              selectedMemberId={selectedMember?.id}
              onSelectMember={handleSelectMember}
              interactive={true}
            />
          </div>

          <div className="mt-8 text-center font-body text-xs text-[#5C4033] flex items-center gap-2 bg-[#FBF6EE] px-4 py-2 rounded-2xl border-2 border-dashed border-[#8B5E3C]/50 rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>선택된 조각은 바깥쪽으로 부드럽게 분리되며 하이라이트됩니다.</span>
          </div>
        </div>

        {/* 우측: 선택된 팀원 상세 카드 (치즈 스트레치 애니메이션 적용) */}
        <div className="lg:col-span-6 w-full sticky top-24">
          {selectedMember ? (
            <MemberDetailCard
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
              onSelectMember={handleSelectMember}
            />
          ) : (
            <div className="bg-[#FFFDF9] rounded-[32px] border-3 border-dashed border-[#8B5E3C] p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[380px] rotate-[-1deg]">
              <div className="w-16 h-16 rounded-full bg-[#F4ECE0] border-2 border-[#4A3525] flex items-center justify-center">
                <PizzaSliceIcon size={32} />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-[#2B1E16]">
                  피자 조각을 선택해주세요
                </h3>
                <p className="font-body text-sm text-[#5C4033] mt-1">
                  왼쪽 피자 판에서 원하는 조각을 누르면 치즈가 늘어나듯 카드가 열립니다.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {teamMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectMember(m)}
                    className="btn-squish font-heading text-xs px-3.5 py-2 rounded-xl bg-[#FBF6EE] hover:bg-[#F4ECE0] text-[#2B1E16] border-2 border-[#4A3525] shadow-[2px_2px_0px_#4A3525]"
                  >
                    {m.name} 열기
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 섹션: 5인 전체 프로필 스티커 그리드 (한눈에 보기) */}
      <div className="pt-10 border-t-2 border-dashed border-[#8B5E3C]/30 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-5 h-5 text-[#D9383A]" />
          <h2 className="font-heading text-2xl sm:text-3xl text-[#2B1E16]">
            피자스타트업 5인 전원 프로필 한눈에 보기
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {teamMembers.map((m, idx) => {
            const isSelected = selectedMember?.id === m.id;
            const tilts = [
              "rotate-[-2deg]",
              "rotate-[1.5deg]",
              "rotate-[-1.5deg]",
              "rotate-[2deg]",
              "rotate-[-2.2deg]",
            ];
            const cardTilt = tilts[idx % tilts.length];

            return (
              <div
                key={m.id}
                onClick={() => handleSelectMember(m)}
                className={`btn-squish cursor-pointer rounded-[26px] p-5 border-2 transition-all duration-300 flex flex-col items-center text-center gap-3 ${cardTilt} hover:rotate-0 hover:scale-105 ${
                  isSelected
                    ? "bg-white border-[#2B1E16] shadow-[4px_6px_0px_#2B1E16]"
                    : "bg-[#FFFDF9] border-[#4A3525]/40 hover:border-[#4A3525] shadow-[2px_4px_0px_rgba(74,53,37,0.15)]"
                }`}
              >
                <div className="w-full flex items-center justify-between font-heading text-xs text-[#5C4033]">
                  <span>조각 #{idx + 1}</span>
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: m.color }}
                  />
                </div>

                {/* 원형 색 블록 아바타 */}
                <MemberAvatar member={m} size="md" showToppingBadge />

                <div>
                  <h4 className="font-heading text-xl text-[#2B1E16]">
                    {m.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 font-body text-xs font-bold text-[#D9383A] mt-0.5">
                    {renderToppingIcon(m.toppingType, 14)}
                    <span>{m.topping}</span>
                  </div>
                </div>

                <div className="w-full pt-2 border-t border-dashed border-[#8B5E3C]/30 font-body text-xs">
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#5C4033] font-medium">역할</span>
                    <span className="font-heading text-xs text-[#2B1E16]">{m.role}</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#5C4033] font-medium">소개</span>
                    <span className="font-body text-xs text-[#2B1E16] font-bold">{m.bio}</span>
                  </div>
                </div>

                <span className="font-heading text-xs text-[#5C4033] flex items-center gap-0.5 mt-1 bg-[#FBF6EE] px-2.5 py-1 rounded-lg border border-[#4A3525]/20">
                  <span>조각 펼치기</span>
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
        <div className="min-h-[50vh] flex items-center justify-center font-heading text-lg text-[#5C4033]">
          피자를 노릇노릇 굽는 중입니다...
        </div>
      }
    >
      <TeamContent />
    </Suspense>
  );
}
