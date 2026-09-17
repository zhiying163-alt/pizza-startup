"use client";

import Image from "next/image";
import { TeamMember } from "@/data/team";

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
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
    xl: "w-32 h-32 text-4xl",
  };

  const badgeSizeMap = {
    sm: "text-xs -bottom-1 -right-1 p-0.5",
    md: "text-sm -bottom-1 -right-1 p-1",
    lg: "text-base -bottom-1.5 -right-1.5 p-1.5",
    xl: "text-xl -bottom-2 -right-2 p-2",
  };

  // 성(이름 첫 글자) 추출
  const initialChar = member.name.charAt(0);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 
        💡 사진 교체 안내:
        member.avatarUrl 에 유효한 이미지 경로(예: "/avatars/my-photo.png" 또는 외부 URL)가
        있으면 이미지를 렌더링하고, 없으면 지정된 색상의 원형 색 블록을 렌더링합니다.
      */}
      {member.avatarUrl ? (
        <div
          className={`${sizeMap[size]} rounded-full overflow-hidden border-3 shadow-md`}
          style={{ borderColor: member.color }}
        >
          <img
            src={member.avatarUrl}
            alt={`${member.name} 프로필`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* 원형 색 블록 (임시 프로필) */
        <div
          className={`${sizeMap[size]} rounded-full flex items-center justify-center font-black tracking-tighter shadow-lg transition-transform duration-300 ring-4 ring-white/60 select-none`}
          style={{
            backgroundColor: member.color,
            color: member.textColor,
            boxShadow: `0 8px 20px -4px ${member.color}66`,
          }}
          title={`${member.name} (${member.topping})`}
        >
          <span>{initialChar}</span>
        </div>
      )}

      {showToppingBadge && (
        <div
          className={`absolute ${badgeSizeMap[size]} rounded-full bg-white shadow-md border border-stone-100 flex items-center justify-center leading-none`}
          title={member.topping}
        >
          {member.toppingEmoji}
        </div>
      )}
    </div>
  );
}
