"use client";

import { useState, useEffect } from "react";
import { TeamMember, teamMembers } from "@/data/team";

interface InteractivePizzaProps {
  selectedMemberId?: string | null;
  onSelectMember?: (member: TeamMember) => void;
  interactive?: boolean;
  className?: string;
}

export default function InteractivePizza({
  selectedMemberId = null,
  onSelectMember,
  interactive = true,
  className = "",
}: InteractivePizzaProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // 첫 화면 등장 시 한 바퀴 돌며 등장하는 효과 트리거
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // SVG 기본 치수 설정
  const size = 520;
  const center = size / 2;
  const outerRadius = 230;
  const cheeseRadius = 205;
  const innerRadius = 32;

  // 5조각: 360 / 5 = 72도
  const sliceAngle = 72;
  const startOffset = -90; // 12시 방향부터 시작

  // 극좌표 -> 직교좌표 변환 함수
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 피자 부채꼴 패스 생성 함수
  const describeSlice = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const centerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const centerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      `M ${centerEnd.x} ${centerEnd.y}`,
      `L ${end.x} ${end.y}`,
      `A ${radius} ${radius} 0 ${arcSweep} 1 ${start.x} ${start.y}`,
      `L ${centerStart.x} ${centerStart.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${arcSweep} 0 ${centerEnd.x} ${centerEnd.y}`,
      "Z",
    ].join(" ");
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* 바닥 피자 팬 & 베이스 플레이트 */}
      <div
        className={`relative w-full max-w-[480px] aspect-square flex items-center justify-center ${
          hasMounted ? "animate-pizza-spin-in" : "opacity-0"
        }`}
      >
        {/* 수제 우드 서빙 보드 효과 */}
        <div className="absolute inset-[-14px] rounded-full bg-[#E5BA8F]/40 blur-md pointer-events-none" />
        <div className="absolute inset-[-6px] rounded-full border-4 border-[#8B5E3C] bg-[#F2DCB9] shadow-[0_12px_28px_rgba(74,53,37,0.22)] pointer-events-none" />

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full filter drop-shadow-md overflow-visible"
        >
          <defs>
            {/* 수제 노릇노릇 크러스트 그라데이션 */}
            <linearGradient id="craftCrust" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DE8E43" />
              <stop offset="60%" stopColor="#C47325" />
              <stop offset="100%" stopColor="#8C460D" />
            </linearGradient>

            {/* 치즈 베이스 그라데이션 */}
            <radialGradient id="craftCheese" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="65%" stopColor="#FED766" />
              <stop offset="100%" stopColor="#F5B738" />
            </radialGradient>

            {/* 토마토 소스 베이스 */}
            <radialGradient id="craftSauce" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E64A45" />
              <stop offset="100%" stopColor="#B72424" />
            </radialGradient>
          </defs>

          {/* 5개 조각 렌더링 */}
          {teamMembers.map((member, index) => {
            const startAngle = startOffset + index * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            const midAngle = (startAngle + endAngle) / 2;

            const isSelected = selectedMemberId === member.id;
            const isHovered = hoveredId === member.id;

            // 요구사항: 조각에 마우스를 올리면 조각이 살짝 튀어나오고(translation) 커짐(scale)
            const separationDistance = isSelected ? 26 : isHovered ? 16 : 0;
            const scaleFactor = isHovered ? 1.05 : isSelected ? 1.03 : 1;

            const midRad = ((midAngle - 90) * Math.PI) / 180.0;
            const transX = separationDistance * Math.cos(midRad);
            const transY = separationDistance * Math.sin(midRad);

            // 라벨 및 토핑 위치 계산
            const labelPos = polarToCartesian(center, center, 140, midAngle);
            const toppingPos1 = polarToCartesian(center, center, 175, midAngle - 15);
            const toppingPos2 = polarToCartesian(center, center, 175, midAngle + 15);
            const innerToppingPos = polarToCartesian(center, center, 92, midAngle);

            return (
              <g
                key={member.id}
                transform={`translate(${transX}, ${transY}) scale(${scaleFactor})`}
                className={`transition-all duration-300 ease-out ${
                  interactive ? "cursor-pointer" : "pointer-events-none"
                }`}
                onMouseEnter={() => interactive && setHoveredId(member.id)}
                onMouseLeave={() => interactive && setHoveredId(null)}
                onClick={() => interactive && onSelectMember && onSelectMember(member)}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                }}
              >
                {/* 1. 도우 크러스트 외곽 */}
                <path
                  d={describeSlice(center, center, outerRadius, startAngle + 0.6, endAngle - 0.6)}
                  fill="url(#craftCrust)"
                  stroke="#5C2C06"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* 2. 크러스트 바삭한 베이킹 도트 */}
                <path
                  d={describeSlice(center, center, outerRadius - 3, startAngle + 2, endAngle - 2)}
                  fill="none"
                  stroke="#A85712"
                  strokeWidth="4.5"
                  strokeDasharray="3 7"
                  opacity="0.8"
                />

                {/* 3. 토마토 소스 층 */}
                <path
                  d={describeSlice(center, center, cheeseRadius + 4, startAngle + 1.2, endAngle - 1.2)}
                  fill="url(#craftSauce)"
                />

                {/* 4. 치즈 층 */}
                <path
                  d={describeSlice(center, center, cheeseRadius - 4, startAngle + 1.8, endAngle - 1.8)}
                  fill="url(#craftCheese)"
                  stroke={isSelected ? member.color : "#D48B28"}
                  strokeWidth={isSelected ? "4" : "1.5"}
                />

                {/* 5. 팀원별 수제 토핑 장식 (이모지 없음, 순수 SVG) */}
                {member.id === "namgung" && (
                  /* 토마토 슬라이스 */
                  <g>
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="15" fill="#D9383A" stroke="#8E171E" strokeWidth="2" />
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="10" fill="#E85D60" />
                    <circle cx={toppingPos1.x - 3} cy={toppingPos1.y - 2} r="2" fill="#FFE066" />
                    <circle cx={toppingPos1.x + 3} cy={toppingPos1.y + 2} r="2" fill="#FFE066" />

                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="14" fill="#D9383A" stroke="#8E171E" strokeWidth="2" />
                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="9" fill="#E85D60" />

                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="10" fill="#D9383A" stroke="#8E171E" strokeWidth="1.5" />
                  </g>
                )}

                {member.id === "min" && (
                  /* 치즈 큐브 & 치즈 버블 */
                  <g>
                    <rect
                      x={toppingPos1.x - 11}
                      y={toppingPos1.y - 11}
                      width="22"
                      height="22"
                      rx="6"
                      fill="#F5A623"
                      stroke="#A86E04"
                      strokeWidth="2"
                      transform={`rotate(22, ${toppingPos1.x}, ${toppingPos1.y})`}
                    />
                    <circle cx={toppingPos1.x - 2} cy={toppingPos1.y + 2} r="2" fill="#D08500" />
                    <rect
                      x={toppingPos2.x - 9}
                      y={toppingPos2.y - 9}
                      width="18"
                      height="18"
                      rx="5"
                      fill="#E89D1E"
                      stroke="#A86E04"
                      strokeWidth="1.8"
                      transform={`rotate(-18, ${toppingPos2.x}, ${toppingPos2.y})`}
                    />
                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="9" fill="#F5A623" stroke="#A86E04" strokeWidth="1.5" />
                  </g>
                )}

                {member.id === "yoon" && (
                  /* 바질 잎사귀 */
                  <g>
                    <g transform={`translate(${toppingPos1.x}, ${toppingPos1.y}) rotate(${midAngle})`}>
                      <path d="M 0,-15 C 10,-9 10,9 0,15 C -10,9 -10,-9 0,-15 Z" fill="#386641" stroke="#204227" strokeWidth="2" />
                      <line x1="0" y1="-12" x2="0" y2="12" stroke="#588157" strokeWidth="1.5" />
                    </g>
                    <g transform={`translate(${toppingPos2.x}, ${toppingPos2.y}) rotate(${midAngle - 35})`}>
                      <path d="M 0,-13 C 9,-7 9,7 0,13 C -9,7 -9,-7 0,-13 Z" fill="#386641" stroke="#204227" strokeWidth="1.8" />
                      <line x1="0" y1="-10" x2="0" y2="10" stroke="#588157" strokeWidth="1.2" />
                    </g>
                    <g transform={`translate(${innerToppingPos.x}, ${innerToppingPos.y}) rotate(${midAngle + 20})`}>
                      <path d="M 0,-10 C 7,-5 7,5 0,10 C -7,5 -7,-5 0,-10 Z" fill="#386641" stroke="#204227" strokeWidth="1.5" />
                    </g>
                  </g>
                )}

                {member.id === "lee" && (
                  /* 올리브 링: 내추럴 딥 올리브 (인위적 보라색 배제) */
                  <g>
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="14" fill="#353B29" stroke="#1C2114" strokeWidth="2.5" />
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="6.5" fill="#FED766" stroke="#1C2114" strokeWidth="1.8" />

                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="13" fill="#353B29" stroke="#1C2114" strokeWidth="2.2" />
                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="5.5" fill="#FED766" stroke="#1C2114" strokeWidth="1.8" />

                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="10" fill="#353B29" stroke="#1C2114" strokeWidth="2" />
                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="4" fill="#FED766" stroke="#1C2114" strokeWidth="1.5" />
                  </g>
                )}

                {member.id === "lim" && (
                  /* 페퍼로니 햄 슬라이스 */
                  <g>
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="16" fill="#C84B19" stroke="#842804" strokeWidth="2.2" />
                    <circle cx={toppingPos1.x - 4} cy={toppingPos1.y - 3} r="1.5" fill="#521500" />
                    <circle cx={toppingPos1.x + 3} cy={toppingPos1.y + 4} r="1.8" fill="#521500" />
                    <circle cx={toppingPos1.x - 2} cy={toppingPos1.y + 5} r="1.5" fill="#FFA570" opacity="0.8" />

                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="15" fill="#C84B19" stroke="#842804" strokeWidth="2" />
                    <circle cx={toppingPos2.x - 3} cy={toppingPos2.y - 3} r="1.6" fill="#521500" />

                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="11" fill="#C84B19" stroke="#842804" strokeWidth="1.8" />
                  </g>
                )}

                {/* 6. 팀원 이름 스티커 라벨 (Jua 폰트, 수제 라벨 테두리) */}
                <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
                  <rect
                    x="-34"
                    y="-14"
                    width="68"
                    height="28"
                    rx="14"
                    fill={isSelected ? member.color : "#FFFFFF"}
                    stroke="#4A3525"
                    strokeWidth="2"
                    filter="drop-shadow(2px 3px 0px rgba(74,53,37,0.25))"
                  />
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill={isSelected ? "#FFFFFF" : "#2B1E16"}
                    fontSize="13"
                    fontFamily="'Jua', cursive, sans-serif"
                    className="select-none"
                  >
                    {member.name}
                  </text>
                </g>

                {/* 7. 선택 시 점선 외곽 하이라이트 */}
                {isSelected && (
                  <path
                    d={describeSlice(center, center, outerRadius + 8, startAngle, endAngle)}
                    fill="none"
                    stroke={member.color}
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          })}

          {/* 중앙 피자 중심 핀 (이모지 대신 수제 SVG 미니 피자 코어) */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 4}
            fill="#FFFDF9"
            stroke="#4A3525"
            strokeWidth="3"
            filter="drop-shadow(1px 2px 3px rgba(74,53,37,0.3))"
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 12}
            fill="#D9383A"
          />
          <text
            x={center}
            y={center + 5}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontFamily="'Jua', cursive, sans-serif"
          >
            5
          </text>
        </svg>
      </div>

      {/* 조작 도움말 스티커 */}
      {interactive && (
        <div className="absolute -bottom-8 bg-white/95 px-4 py-1.5 rounded-full text-xs font-body font-bold text-[#5C4033] border-2 border-dashed border-[#8B5E3C] shadow-[2px_3px_0px_rgba(74,53,37,0.12)] rotate-[-1.5deg] pointer-events-none">
          <span>피자 조각을 클릭하면 치즈가 늘어나듯 소개 카드가 열려요!</span>
        </div>
      )}
    </div>
  );
}
