"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import InteractivePizza from "@/components/InteractivePizza";
import MemberAvatar from "@/components/MemberAvatar";
import { teamMembers, TeamMember } from "@/data/team";
import { Users, Briefcase, ArrowRight, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleSelectMember = (member: TeamMember) => {
    router.push(`/team?member=${member.id}`);
  };

  return (
    <div className="flex flex-col gap-16 py-8 sm:py-14">
      {/* 히어로 섹션 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 좌측 텍스트 및 CTA 버튼 */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB703]/20 border border-[#FFB703]/50 text-[#684B35] font-bold text-xs self-center lg:self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
              <span>5명의 조화로 완성하는 완벽한 레시피</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2B1E16] leading-[1.15] tracking-tight">
              피자 한 판처럼, <br />
              <span className="text-[#E63946] relative inline-block">
                완벽한 케미스트리
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#FFB703]"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 3 197 9"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              피자스타트업
            </h1>

            <p className="text-base sm:text-lg text-[#684B35] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              각기 다른 5가지 토핑이 갓 구운 도우 위에서 만나 최고의 시너지를 발휘합니다. 
              조각마다 살아 숨쉬는 우리 팀원들의 개성과 열정을 만나보세요.
            </p>

            {/* 핵심 네비게이션 CTA 버튼 (요구사항: 팀원 소개 & 프로젝트 소개 이동 버튼) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/team"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#E63946] text-white font-extrabold text-base shadow-lg shadow-[#E63946]/30 hover:bg-[#D62839] hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>팀원 소개 보러가기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FFB703] text-[#2B1E16] font-extrabold text-base border-2 border-[#E7DBC8] shadow-md hover:bg-[#FCA311] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Briefcase className="w-5 h-5 text-[#2B1E16] group-hover:scale-110 transition-transform" />
                <span>프로젝트 둘러보기</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-bold">준비 중</span>
              </Link>
            </div>

            {/* 3가지 핵심 수치 / 특징 */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7DBC8]/80 text-center">
              <div>
                <p className="text-2xl font-black text-[#2B1E16]">5 Slices</p>
                <p className="text-xs text-[#684B35] font-semibold mt-0.5">5인 5색 토핑</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#E63946]">360°</p>
                <p className="text-xs text-[#684B35] font-semibold mt-0.5">완벽한 원팀</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#FFB703]">100%</p>
                <p className="text-xs text-[#684B35] font-semibold mt-0.5">핸드메이드 열정</p>
              </div>
            </div>
          </div>

          {/* 우측 피자 인터랙티브 쇼케이스 (요구사항: 메인에서 피자 한 판이 보임) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[460px]">
              <InteractivePizza
                onSelectMember={handleSelectMember}
                interactive={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 팀원 5인 시그니처 토핑 미리보기 카드 섹션 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-[#E7DBC8] p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#E63946] tracking-wider uppercase">
                Our 5 Toppings
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2B1E16] mt-1">
                피자스타트업을 만드는 5명의 멤버
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E63946] hover:text-[#D62839] transition-colors"
            >
              <span>전체 팀원 상세 페이지 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 5명 미니 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <Link
                key={member.id}
                href={`/team?member=${member.id}`}
                className="group relative bg-[#FAF5ED] hover:bg-white rounded-2xl p-5 border border-[#E7DBC8] hover:border-[#2B1E16]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-3"
              >
                {/* 조각 뱃지 */}
                <span className="absolute top-3 left-3 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white text-[#684B35] border border-[#E7DBC8]">
                  #{index + 1}
                </span>

                {/* 원형 색 블록 프로필 (요구사항: 색 블록 & 사진 교체 지원) */}
                <div className="pt-2">
                  <MemberAvatar
                    member={member}
                    size="md"
                    showToppingBadge
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* 이름 & 토핑 */}
                <div>
                  <h3 className="font-extrabold text-lg text-[#2B1E16] group-hover:text-[#E63946] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-[#684B35] mt-0.5">
                    {member.topping} {member.toppingEmoji}
                  </p>
                </div>

                {/* 역할 (자리 표시 문구) */}
                <div className="w-full pt-2 border-t border-[#E7DBC8]/70 flex items-center justify-between text-xs text-[#684B35]">
                  <span className="font-medium">역할</span>
                  <span className="font-bold text-[#2B1E16]">{member.role}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
