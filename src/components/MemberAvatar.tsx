"use client";

import { TeamMember } from "@/data/team";
import {
  TomatoTopping,
  CheeseTopping,
  BasilTopping,
  OliveTopping,
  PepperoniTopping,
} from "@/components/ToppingIcons";

interface MemberAvatarProps {
  member: TeamMember;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showToppingBadge?: boolean;
}

export default function MemberAvatar({
  member,
  size = "md",
  className = "",
  showToppingBadge = false,
}: MemberAvatarProps) {
  const sizeMap = {
    sm: "w-10 h-10 text-base",
    md: "w-16 h-16 text-2xl",
    lg: "w-24 h-24 text-4xl",
    xl: "w-32 h-32 text-5xl",
  };

  const badgeIconSize = {
    sm: 14,
    md: 20,
    lg: 26,
    xl: 32,
  };

  const badgePosMap = {
    sm: "-bottom-1 -right-1 p-0.5",
    md: "-bottom-1 -right-1 p-1",
    lg: "-bottom-1.5 -right-1.5 p-1.5",
    xl: "-bottom-2 -right-2 p-2",
  };

  // 성(이름 첫 글자)
  const initialChar = member.name.charAt(0);

  // 토핑별 SVG 컴포넌트 렌더러 (이모지 완전 배제)
  const renderToppingIcon = (iconSize: number) => {
    switch (member.toppingType) {
      case "tomato":
        return <TomatoTopping size={iconSize} />;
      case "cheese":
        return <CheeseTopping size={iconSize} />;
      case "basil":
        return <BasilTopping size={iconSize} />;
      case "olive":
        return <OliveTopping size={iconSize} />;
      case "pepperoni":
        return <PepperoniTopping size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 
        💡 사진 교체 안내:
        member.avatarUrl에 이미지 경로가 있으면 사진을 렌더링하고,
        없으면 지정된 고유 색상의 원형 색 블록을 렌더링합니다.
      */}
      {member.avatarUrl ? (
        <div
          className={`${sizeMap[size]} rounded-full overflow-hidden border-3 border-[#4A3525] shadow-[2px_3px_0px_#4A3525]`}
          style={{ backgroundColor: member.color }}
        >
          <img
            src={member.avatarUrl}
            alt={`${member.name} 프로필`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* 수제 원형 색 블록 (Jua 폰트 적용, 따뜻한 크러스트 외곽선) */
        <div
          className={`${sizeMap[size]} rounded-full flex items-center justify-center font-heading tracking-tight select-none border-3 border-[#4A3525] shadow-[2px_4px_0px_rgba(74,53,37,0.25)] transition-transform duration-300`}
          style={{
            backgroundColor: member.color,
            color: member.textColor,
          }}
          title={`${member.name} (${member.topping})`}
        >
          <span className="drop-shadow-xs">{initialChar}</span>
        </div>
      )}

      {/* SVG 토핑 배지 (이모지 대신 수제 SVG 토핑 아이콘) */}
      {showToppingBadge && (
        <div
          className={`absolute ${badgePosMap[size]} rounded-full bg-white border-2 border-[#4A3525] shadow-[1px_2px_0px_#4A3525] flex items-center justify-center`}
          title={member.topping}
        >
          {renderToppingIcon(badgeIconSize[size])}
        </div>
      )}
    </div>
  );
}
