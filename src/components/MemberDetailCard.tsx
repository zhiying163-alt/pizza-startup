"use client";

import { TeamMember, teamMembers } from "@/data/team";
import MemberAvatar from "@/components/MemberAvatar";
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

  return (
    <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#E7DBC8] shadow-2xl p-6 sm:p-8 flex flex-col gap-6 overflow-hidden transition-all duration-300">
      {/* 상단 컬러 액센트 바 */}
      <div
        className="absolute top-0 left-0 right-0 h-2.5 transition-colors duration-300"
        style={{ backgroundColor: member.color }}
      />

      {/* 헤더: 조각 번호 & 닫기 버튼 */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-xs"
            style={{ backgroundColor: member.color }}
          >
            조각 #{currentIndex + 1}
          </span>
          <span className="text-xs font-semibold text-[#684B35] bg-[#F4ECE0] px-2.5 py-1 rounded-full">
            {member.topping} {member.toppingEmoji}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-[#684B35] hover:text-[#2B1E16] hover:bg-[#F4ECE0] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 프로필 메인 (아바타 & 기본 정보) */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        {/* 원형 색 블록 / 프로필 사진 */}
        <div className="shrink-0 group">
          <MemberAvatar
            member={member}
            size="xl"
            showToppingBadge
            className="transition-transform group-hover:scale-105"
          />
        </div>

        {/* 이름 & 토핑 & 역할 */}
        <div className="flex-1 flex flex-col gap-2">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl sm:text-3xl font-black text-[#2B1E16]">
                {member.name}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                {member.toppingEnglish}
              </span>
            </div>
            <p className="text-sm font-medium text-[#E63946] mt-0.5">
              {member.tagline}
            </p>
          </div>

          {/* 역할 (자리 표시 문구) */}
          <div className="mt-2 bg-[#FBF6EE] border border-[#E7DBC8] rounded-xl px-3.5 py-2 inline-flex items-center gap-2 self-center sm:self-start">
            <Tag className="w-4 h-4 text-[#684B35]" />
            <span className="text-xs font-bold text-[#684B35]">역할:</span>
            <span className="text-sm font-bold text-[#2B1E16]">
              {member.role}
            </span>
          </div>
        </div>
      </div>

      {/* 한 줄 소개 섹션 (자리 표시 문구) */}
      <div className="bg-[#FAF5ED] rounded-2xl p-4 border border-[#E7DBC8]/60">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#684B35] mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
          <span>한 줄 소개</span>
        </div>
        <p className="text-base font-semibold text-[#2B1E16] italic">
          "{member.bio}"
        </p>
      </div>

      {/* 키워드 / 매력 포인트 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#684B35] mr-1">토핑 키워드:</span>
        {member.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2.5 py-1 rounded-lg font-medium bg-white border border-[#E7DBC8] text-[#2B1E16] shadow-2xs"
          >
            #{skill}
          </span>
        ))}
      </div>

      {/* 💡 사진 교체 안내 박스 */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">사진 교체 팁:</span> 현재는{" "}
          <span className="font-bold text-[#2B1E16]">{member.topping}</span> 상징
          컬러의 원형 블록으로 표시됩니다. 나중에{" "}
          <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[11px] font-mono">
            src/data/team.ts
          </code>
          의 <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[11px] font-mono">avatarUrl</code>에
          사진 경로를 넣어주시면 즉시 사진으로 변경됩니다.
        </div>
      </div>

      {/* 이전/다음 팀원 네비게이션 */}
      <div className="pt-2 border-t border-[#E7DBC8]/60 flex items-center justify-between">
        <button
          onClick={() => onSelectMember(prevMember)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#684B35] hover:text-[#2B1E16] px-3 py-1.5 rounded-lg hover:bg-[#F4ECE0] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전 조각 ({prevMember.name})</span>
        </button>

        <button
          onClick={() => onSelectMember(nextMember)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#684B35] hover:text-[#2B1E16] px-3 py-1.5 rounded-lg hover:bg-[#F4ECE0] transition-colors"
        >
          <span>다음 조각 ({nextMember.name})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
