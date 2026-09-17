"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import InteractivePizza from "@/components/InteractivePizza";
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
import { ArrowRight, Sparkles, ChefHat } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleSelectMember = (member: TeamMember) => {
    router.push(`/team?member=${member.id}`);
  };

  // 수제 토핑 SVG 렌더러
  const renderToppingIcon = (type: string, size = 18) => {
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
    <div className="flex flex-col gap-14 sm:gap-20 pb-16">
      {/* 
        요구사항 4. 그라데이션:
        - 메인 상단 배경: 토마토 레드에서 치즈 옐로로 이어지는 따뜻한 그라데이션
      */}
      <section className="relative w-full overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b-2 border-dashed border-[#8B5E3C]/30 bg-gradient-to-b from-[#E63946]/18 via-[#FFB703]/14 to-[#FBF6EE]">
        {/* 장식용 은은한 상단 베이킹 빛무리 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-r from-[#D9383A]/15 via-[#F5A623]/20 to-[#D9383A]/15 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* 좌측 텍스트 및 CTA 버튼 */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left animate-fade-in-up">
              
              {/* 스티커 배지 (수제 틸트 -2도) */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#4A3525] text-[#4A3525] font-heading text-xs self-center lg:self-start rotate-[-2deg] shadow-[2px_3px_0px_#4A3525]">
                <Sparkles className="w-3.5 h-3.5 text-[#D9383A]" />
                <span>5가지 특별한 토핑으로 구워낸 원팀</span>
              </div>

              {/* 제목: Jua 폰트 및 팀명에 포인트 그라데이션 적용 */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#2B1E16] leading-[1.2] tracking-tight">
                피자 한 판처럼, <br />
                <span className="bg-gradient-to-r from-[#D9383A] via-[#E85D04] to-[#F5A623] bg-clip-text text-transparent underline decoration-[#F5A623] decoration-wavy decoration-from-font">
                  맛있고 끈끈하게
                </span>
                <br />
                피자스타트업
              </h1>

              {/* 본문: Gowun Dodum 폰트 */}
              <p className="font-body text-base sm:text-lg text-[#5C4033] font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                정성껏 반죽한 도우 위에 5가지 개성 넘치는 토핑이 모였습니다. 
                인위적인 느낌 없이, 사람 냄새 가득한 우리 5명의 열정을 만나보세요.
              </p>

              {/* 핵심 버튼: 말랑한 터치감(btn-squish) 및 버튼 포인트 그라데이션 */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/team"
                  className="btn-squish w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D9383A] to-[#E65100] text-white font-heading text-lg border-2 border-[#4A3525] shadow-[3px_5px_0px_#4A3525] hover:rotate-[-1deg] flex items-center justify-center gap-2.5 group"
                >
                  <PizzaSliceIcon size={22} />
                  <span>5조각 팀원 소개 보러가기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/projects"
                  className="btn-squish w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#E89D1E] text-[#2B1E16] font-heading text-lg border-2 border-[#4A3525] shadow-[3px_5px_0px_#4A3525] hover:rotate-[1deg] flex items-center justify-center gap-2.5 group"
                >
                  <ChefHat className="w-5 h-5 text-[#2B1E16]" />
                  <span>프로젝트 둘러보기</span>
                  <span className="font-body text-xs px-2 py-0.5 rounded-full bg-white/70 border border-[#4A3525]/30 font-bold">
                    준비 중
                  </span>
                </Link>
              </div>

              {/* 수제 레시피 수치 스티커 카드 3개 (각각 살짝 다른 기울기) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 text-center">
                <div className="bg-[#FFFDF9] rounded-2xl p-3 border-2 border-[#4A3525] shadow-[2px_3px_0px_#4A3525] rotate-[-1.5deg]">
                  <p className="font-heading text-2xl text-[#D9383A]">5 Slices</p>
                  <p className="font-body text-xs text-[#5C4033] font-bold mt-0.5">5인 5색 토핑</p>
                </div>
                <div className="bg-[#FFFDF9] rounded-2xl p-3 border-2 border-[#4A3525] shadow-[2px_3px_0px_#4A3525] rotate-[2deg]">
                  <p className="font-heading text-2xl text-[#F5A623]">360°</p>
                  <p className="font-body text-xs text-[#5C4033] font-bold mt-0.5">완벽한 원팀</p>
                </div>
                <div className="bg-[#FFFDF9] rounded-2xl p-3 border-2 border-[#4A3525] shadow-[2px_3px_0px_#4A3525] rotate-[-1deg]">
                  <p className="font-heading text-2xl text-[#386641]">100%</p>
                  <p className="font-body text-xs text-[#5C4033] font-bold mt-0.5">핸드메이드 열정</p>
                </div>
              </div>
            </div>

            {/* 우측 피자 인터랙티브 쇼케이스 (첫 화면 한 바퀴 회전 등장) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[460px]">
                <InteractivePizza
                  onSelectMember={handleSelectMember}
                  interactive={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        팀원 5인 시그니처 토핑 카드 섹션:
        - 도우 베이지 단색 배경 유지
        - 각 카드가 반듯하지 않게 -2~3도 살짝 기울어져 있음
        - 모서리 둥글고 손으로 그린 듯한 테두리
        - 이모지 대신 수제 SVG 토핑 적용
      */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full animate-fade-in-up">
        <div className="bg-[#FFFDF9] rounded-[36px] border-3 border-[#4A3525] p-6 sm:p-10 shadow-[6px_8px_0px_rgba(74,53,37,0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-heading text-xs text-[#D9383A] tracking-wider uppercase bg-[#D9383A]/10 px-2.5 py-1 rounded-md border border-[#D9383A]/30">
                5 Fresh Toppings
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#2B1E16] mt-2">
                피자스타트업을 만드는 5명의 멤버
              </h2>
            </div>
            <Link
              href="/team"
              className="btn-squish inline-flex items-center gap-1.5 font-heading text-sm text-[#D9383A] hover:text-[#B72424] bg-[#F4ECE0] px-3.5 py-1.5 rounded-xl border border-[#4A3525]/30 shadow-[1px_2px_0px_#4A3525]"
            >
              <span>전체 팀원 상세 보러가기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 5인 스티커 카드 그리드 (불규칙한 수제 틸트 -2도 ~ 2.5도) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {teamMembers.map((member, index) => {
              // 수제 느낌의 불규칙한 회전각
              const tiltAngles = [
                "rotate-[-2deg]",
                "rotate-[1.8deg]",
                "rotate-[-1.2deg]",
                "rotate-[2.2deg]",
                "rotate-[-2.5deg]",
              ];
              const cardTilt = tiltAngles[index % tiltAngles.length];

              return (
                <Link
                  key={member.id}
                  href={`/team?member=${member.id}`}
                  className={`btn-squish group relative bg-[#FBF6EE] hover:bg-white rounded-[26px] p-5 border-2 border-[#4A3525] shadow-[3px_4px_0px_#4A3525] transition-all duration-300 flex flex-col items-center text-center gap-3 ${cardTilt} hover:rotate-0 hover:scale-105`}
                >
                  {/* 조각 뱃지 */}
                  <span className="absolute top-3 left-3 font-heading text-xs px-2.5 py-0.5 rounded-full bg-white text-[#4A3525] border border-[#4A3525] shadow-[1px_1px_0px_#4A3525]">
                    #{index + 1}
                  </span>

                  {/* 수제 원형 색 블록 프로필 */}
                  <div className="pt-2">
                    <MemberAvatar
                      member={member}
                      size="md"
                      showToppingBadge
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* 이름 & 토핑 (SVG 아이콘) */}
                  <div>
                    <h3 className="font-heading text-xl text-[#2B1E16] group-hover:text-[#D9383A] transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 font-body text-xs font-bold text-[#5C4033] mt-1">
                      {renderToppingIcon(member.toppingType, 16)}
                      <span>{member.topping}</span>
                    </div>
                  </div>

                  {/* 역할 자리 표시 문구 */}
                  <div className="w-full pt-2 border-t border-dashed border-[#8B5E3C]/40 flex items-center justify-between font-body text-xs text-[#5C4033]">
                    <span className="font-medium">역할</span>
                    <span className="font-heading text-sm text-[#2B1E16]">{member.role}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
