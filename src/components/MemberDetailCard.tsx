"use client";

import { TeamMember, teamMembers } from "@/data/team";
import MemberAvatar from "@/components/MemberAvatar";
import {
  TomatoTopping,
  CheeseTopping,
  BasilTopping,
  OliveTopping,
  PepperoniTopping,
} from "@/components/ToppingIcons";
import { X, ChevronLeft, ChevronRight, Sparkles, Tag, Info } from "lucide-react";

interface MemberDetailCardProps {
  member: TeamMember | null;
  onClose: () => void;
  onSelectMember: (member: TeamMember) => void;
}

export default function MemberDetailCard({
  member,
  onClose,
  onSelectMember,
}: MemberDetailCardProps) {
  if (!member) return null;

  const currentIndex = teamMembers.findIndex((m) => m.id === member.id);
  const prevMember =
    teamMembers[(currentIndex - 1 + teamMembers.length) % teamMembers.length];
  const nextMember = teamMembers[(currentIndex + 1) % teamMembers.length];

  // 토핑 SVG 렌더러 (이모지 완전 배제)
  const renderToppingIcon = (size: number = 20) => {
    switch (member.toppingType) {
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
    <div
      key={member.id}
      className="animate-cheese-stretch relative bg-[#FFFDF9] rounded-[32px] border-3 border-[#4A3525] shadow-[6px_8px_0px_rgba(74,53,37,0.22)] p-6 sm:p-8 flex flex-col gap-6 overflow-hidden rotate-[-1deg] transition-all duration-300"
    >
      {/* 치즈가 쭈욱 늘어난 듯한 상단 치즈 드립 SVG 데코레이션 */}
      <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="w-full h-6 text-[#F5A623] fill-current"
        >
          <path d="M0,0 L400,0 L400,6 C370,18 350,22 330,8 C310,-4 290,16 270,18 C240,20 220,5 190,14 C160,23 140,7 110,12 C80,18 60,-2 30,10 C15,16 5,6 0,6 Z" />
        </svg>
      </div>

      {/* 헤더: 조각 번호 스티커 & 닫기 버튼 */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {/* 스티커 뱃지 (약간 기울기) */}
          <span
            className="font-heading text-xs px-3.5 py-1 rounded-full text-white border-2 border-[#4A3525] shadow-[1px_2px_0px_#4A3525] rotate-[-2deg]"
            style={{ backgroundColor: member.color }}
          >
            조각 #{currentIndex + 1}
          </span>
          <span className="font-heading text-xs text-[#2B1E16] bg-[#F4ECE0] border border-[#4A3525]/30 px-3 py-1 rounded-full flex items-center gap-1.5 rotate-[1.5deg]">
            {renderToppingIcon(16)}
            <span>{member.topping}</span>
          </span>
        </div>

        <button
          onClick={onClose}
          className="btn-squish w-8 h-8 rounded-full border-2 border-[#4A3525] bg-[#F4ECE0] hover:bg-[#D9383A] hover:text-white text-[#4A3525] flex items-center justify-center transition-colors shadow-[1px_2px_0px_#4A3525]"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 프로필 메인 (아바타 & 기본 정보) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* 원형 색 블록 (사진 대체 자리) */}
        <div className="shrink-0 group">
          <MemberAvatar
            member={member}
            size="xl"
            showToppingBadge
            className="group-hover:scale-105 transition-transform"
          />
        </div>

        {/* 이름 & 토핑 & 역할 */}
        <div className="flex-1 flex flex-col gap-2">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <h3 className="font-heading text-3xl sm:text-4xl text-[#2B1E16]">
                {member.name}
              </h3>
              <span className="font-body text-xs font-bold px-2 py-0.5 rounded-md bg-[#F4ECE0] text-[#5C4033] border border-[#4A3525]/20">
                {member.toppingEnglish}
              </span>
            </div>
            <p className="font-body text-sm font-bold text-[#D9383A] mt-1">
              {member.tagline}
            </p>
          </div>

          {/* 역할 (자리 표시 문구) */}
          <div className="mt-1 bg-[#FBF6EE] border-2 border-dashed border-[#8B5E3C] rounded-xl px-3.5 py-2 inline-flex items-center gap-2 self-center sm:self-start rotate-[0.8deg]">
            <Tag className="w-4 h-4 text-[#5C4033]" />
            <span className="font-body text-xs font-bold text-[#5C4033]">역할:</span>
            <span className="font-heading text-base text-[#2B1E16]">
              {member.role}
            </span>
          </div>
        </div>
      </div>

      {/* 한 줄 소개 섹션 (자리 표시 문구) - 수제 메모지 느낌 */}
      <div className="bg-[#FAF5ED] rounded-2xl p-4 border-2 border-[#4A3525]/20 shadow-[2px_3px_0px_rgba(74,53,37,0.08)] rotate-[-0.6deg]">
        <div className="flex items-center gap-1.5 text-xs font-heading text-[#5C4033] mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
          <span>한 줄 소개</span>
        </div>
        <p className="font-body text-base font-bold text-[#2B1E16]">
          "{member.bio}"
        </p>
      </div>

      {/* 키워드 스티커 태그 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-heading text-xs text-[#5C4033] mr-1">토핑 키워드:</span>
        {member.skills.map((skill, sIdx) => {
          const tilts = ["rotate-[-1.5deg]", "rotate-[1.2deg]", "rotate-[-0.8deg]"];
          return (
            <span
              key={skill}
              className={`font-body text-xs px-3 py-1 rounded-xl font-bold bg-white border-2 border-[#4A3525] text-[#2B1E16] shadow-[1px_2px_0px_#4A3525] ${tilts[sIdx % tilts.length]}`}
            >
              #{skill}
            </span>
          );
        })}
      </div>

      {/* 사진 교체 안내 스티커 (종이 메모지 느낌) */}
      <div className="bg-[#FFF9E6] border-2 border-dashed border-[#D48B28] rounded-2xl p-3.5 text-xs font-body text-[#5C4033] flex items-start gap-2.5 rotate-[0.5deg]">
        <Info className="w-4 h-4 shrink-0 text-[#D48B28] mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-[#2B1E16]">사진 교체 팁:</span> 현재는{" "}
          <strong className="text-[#2B1E16]">{member.topping}</strong> 상징
          컬러의 원형 블록으로 표시됩니다. 나중에{" "}
          <code className="bg-amber-200/50 px-1 py-0.5 rounded font-mono text-[11px]">
            src/data/team.ts
          </code>
          의 <code className="bg-amber-200/50 px-1 py-0.5 rounded font-mono text-[11px]">avatarUrl</code>에
          사진 경로를 넣어주시면 즉시 사진으로 변경됩니다.
        </div>
      </div>

      {/* 이전/다음 조각 넘김 (말랑한 버튼) */}
      <div className="pt-2 border-t-2 border-dashed border-[#E7DBC8] flex items-center justify-between">
        <button
          onClick={() => onSelectMember(prevMember)}
          className="btn-squish flex items-center gap-1.5 font-heading text-xs text-[#5C4033] hover:text-[#2B1E16] px-3.5 py-2 rounded-xl bg-[#F4ECE0] border border-[#4A3525]/30 shadow-[1px_2px_0px_rgba(74,53,37,0.2)]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전 조각 ({prevMember.name})</span>
        </button>

        <button
          onClick={() => onSelectMember(nextMember)}
          className="btn-squish flex items-center gap-1.5 font-heading text-xs text-[#5C4033] hover:text-[#2B1E16] px-3.5 py-2 rounded-xl bg-[#F4ECE0] border border-[#4A3525]/30 shadow-[1px_2px_0px_rgba(74,53,37,0.2)]"
        >
          <span>다음 조각 ({nextMember.name})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
