"use client";

import { useState } from "react";
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

  // SVG 기본 설정
  const size = 520;
  const center = size / 2;
  const outerRadius = 230;
  const cheeseRadius = 205;
  const innerRadius = 28;

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
      {/* 바닥 피자 팬 그림자 및 베이스 플레이트 */}
      <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
        {/* 우드 서빙 보드 효과 */}
        <div className="absolute inset-[-14px] rounded-full bg-gradient-to-br from-[#E29547]/25 via-[#D48332]/20 to-[#9E5D24]/30 blur-md pointer-events-none" />
        <div className="absolute inset-[-6px] rounded-full border-4 border-[#C88A58]/40 bg-[#F5E6D3]/40 shadow-2xl pointer-events-none" />

        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full filter drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* 도우 크러스트 그라데이션 */}
            <linearGradient id="crustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E29547" />
              <stop offset="50%" stopColor="#C87928" />
              <stop offset="100%" stopColor="#9C5212" />
            </linearGradient>

            {/* 치즈 베이스 그라데이션 */}
            <radialGradient id="cheeseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="60%" stopColor="#FED766" />
              <stop offset="100%" stopColor="#F9BE3B" />
            </radialGradient>

            {/* 토마토 소스 베이스 그라데이션 */}
            <radialGradient id="sauceGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F25C54" />
              <stop offset="100%" stopColor="#C92A2A" />
            </radialGradient>

            {/* 조각 선택 그림자 필터 */}
            <filter id="sliceShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 5개 조각 렌더링 */}
          {teamMembers.map((member, index) => {
            const startAngle = startOffset + index * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            const midAngle = (startAngle + endAngle) / 2;

            const isSelected = selectedMemberId === member.id;
            const isHovered = hoveredId === member.id;

            // 선택 또는 호버 시 바깥쪽으로 부드럽게 분리되는 오프셋 계산
            const separationDistance = isSelected ? 24 : isHovered ? 14 : 0;
            const midRad = ((midAngle - 90) * Math.PI) / 180.0;
            const transX = separationDistance * Math.cos(midRad);
            const transY = separationDistance * Math.sin(midRad);

            // 라벨 및 토핑 위치 계산
            const labelPos = polarToCartesian(center, center, 140, midAngle);
            const toppingPos1 = polarToCartesian(center, center, 175, midAngle - 15);
            const toppingPos2 = polarToCartesian(center, center, 175, midAngle + 15);
            const innerToppingPos = polarToCartesian(center, center, 90, midAngle);

            return (
              <g
                key={member.id}
                transform={`translate(${transX}, ${transY})`}
                className={`transition-all duration-300 ease-out ${
                  interactive ? "cursor-pointer" : "pointer-events-none"
                }`}
                onMouseEnter={() => interactive && setHoveredId(member.id)}
                onMouseLeave={() => interactive && setHoveredId(null)}
                onClick={() => interactive && onSelectMember && onSelectMember(member)}
                filter={isSelected || isHovered ? "url(#sliceShadow)" : undefined}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                }}
              >
                {/* 1. 도우 크러스트 (도우 엣지) */}
                <path
                  d={describeSlice(center, center, outerRadius, startAngle + 0.6, endAngle - 0.6)}
                  fill="url(#crustGrad)"
                  stroke="#7A3C08"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* 2. 구워진 크러스트 디테일 버블 */}
                <path
                  d={describeSlice(center, center, outerRadius - 3, startAngle + 1.5, endAngle - 1.5)}
                  fill="none"
                  stroke="#D3812E"
                  strokeWidth="5"
                  strokeDasharray="4 8"
                  opacity="0.8"
                />

                {/* 3. 토마토 소스 층 */}
                <path
                  d={describeSlice(center, center, cheeseRadius + 4, startAngle + 1.2, endAngle - 1.2)}
                  fill="url(#sauceGrad)"
                />

                {/* 4. 치즈 층 */}
                <path
                  d={describeSlice(center, center, cheeseRadius - 4, startAngle + 1.8, endAngle - 1.8)}
                  fill="url(#cheeseGrad)"
                  stroke={isSelected ? member.color : "#F4A261"}
                  strokeWidth={isSelected ? "4" : "1"}
                  className="transition-colors duration-200"
                />

                {/* 5. 팀원별 시그니처 토핑 장식 */}
                {member.id === "namgung" && (
                  /* 토마토 레드 토핑: 토마토 슬라이스 */
                  <g className="transition-transform duration-300">
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="15" fill="#E63946" stroke="#9E1B26" strokeWidth="2" />
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="10" fill="#FF5D68" opacity="0.9" />
                    <circle cx={toppingPos1.x - 3} cy={toppingPos1.y - 2} r="2.5" fill="#FFF3B0" />
                    <circle cx={toppingPos1.x + 3} cy={toppingPos1.y + 2} r="2.5" fill="#FFF3B0" />

                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="14" fill="#E63946" stroke="#9E1B26" strokeWidth="2" />
                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="9" fill="#FF5D68" opacity="0.9" />
                    <circle cx={toppingPos2.x - 2} cy={toppingPos2.y - 1} r="2.2" fill="#FFF3B0" />

                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="11" fill="#E63946" stroke="#9E1B26" strokeWidth="1.5" />
                  </g>
                )}

                {member.id === "min" && (
                  /* 치즈 옐로 토핑: 구운 치즈 큐브 및 치즈 스트레치 */
                  <g>
                    <rect
                      x={toppingPos1.x - 11}
                      y={toppingPos1.y - 11}
                      width="22"
                      height="22"
                      rx="6"
                      fill="#FFB703"
                      stroke="#C68A00"
                      strokeWidth="2"
                      transform={`rotate(25, ${toppingPos1.x}, ${toppingPos1.y})`}
                    />
                    <rect
                      x={toppingPos2.x - 9}
                      y={toppingPos2.y - 9}
                      width="18"
                      height="18"
                      rx="5"
                      fill="#FB8500"
                      opacity="0.8"
                      transform={`rotate(-15, ${toppingPos2.x}, ${toppingPos2.y})`}
                    />
                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="9" fill="#FFC300" stroke="#D48B00" strokeWidth="1.5" />
                    {/* 치즈 방울 */}
                    <circle cx={toppingPos1.x + 12} cy={toppingPos1.y + 14} r="3" fill="#D97706" opacity="0.6" />
                  </g>
                )}

                {member.id === "yoon" && (
                  /* 바질 그린 토핑: 바질 잎사귀 */
                  <g>
                    <g transform={`translate(${toppingPos1.x}, ${toppingPos1.y}) rotate(${midAngle})`}>
                      <path d="M 0,-14 C 10,-8 10,8 0,14 C -10,8 -10,-8 0,-14 Z" fill="#2A9D8F" stroke="#1D685F" strokeWidth="1.5" />
                      <line x1="0" y1="-12" x2="0" y2="12" stroke="#40C2B2" strokeWidth="1.2" />
                    </g>
                    <g transform={`translate(${toppingPos2.x}, ${toppingPos2.y}) rotate(${midAngle - 30})`}>
                      <path d="M 0,-12 C 9,-6 9,6 0,12 C -9,6 -9,-6 0,-12 Z" fill="#2A9D8F" stroke="#1D685F" strokeWidth="1.5" />
                      <line x1="0" y1="-10" x2="0" y2="10" stroke="#40C2B2" strokeWidth="1" />
                    </g>
                    <g transform={`translate(${innerToppingPos.x}, ${innerToppingPos.y}) rotate(${midAngle + 20})`}>
                      <path d="M 0,-9 C 7,-4 7,4 0,9 C -7,4 -7,-4 0,-9 Z" fill="#2A9D8F" stroke="#1D685F" strokeWidth="1.5" />
                    </g>
                  </g>
                )}

                {member.id === "lee" && (
                  /* 올리브 퍼플 토핑: 올리브 슬라이스 링 */
                  <g>
                    {/* 올리브 링 1 */}
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="14" fill="#7209B7" stroke="#480477" strokeWidth="2" />
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="6.5" fill="#FED766" stroke="#480477" strokeWidth="1.5" />

                    {/* 올리브 링 2 */}
                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="13" fill="#7209B7" stroke="#480477" strokeWidth="2" />
                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="5.5" fill="#FED766" stroke="#480477" strokeWidth="1.5" />

                    {/* 올리브 링 3 */}
                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="10" fill="#7209B7" stroke="#480477" strokeWidth="1.5" />
                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="4" fill="#FED766" stroke="#480477" strokeWidth="1" />
                  </g>
                )}

                {member.id === "lim" && (
                  /* 페퍼로니 오렌지 토핑: 페퍼로니 햄 슬라이스 */
                  <g>
                    <circle cx={toppingPos1.x} cy={toppingPos1.y} r="16" fill="#FB8500" stroke="#B84F00" strokeWidth="2" />
                    <circle cx={toppingPos1.x - 4} cy={toppingPos1.y - 3} r="1.5" fill="#671E00" />
                    <circle cx={toppingPos1.x + 3} cy={toppingPos1.y + 4} r="2" fill="#671E00" />
                    <circle cx={toppingPos1.x - 2} cy={toppingPos1.y + 5} r="1.8" fill="#FFF2A3" />

                    <circle cx={toppingPos2.x} cy={toppingPos2.y} r="15" fill="#FB8500" stroke="#B84F00" strokeWidth="2" />
                    <circle cx={toppingPos2.x - 3} cy={toppingPos2.y - 3} r="1.8" fill="#671E00" />
                    <circle cx={toppingPos2.x + 4} cy={toppingPos2.y + 2} r="1.5" fill="#FFF2A3" />

                    <circle cx={innerToppingPos.x} cy={innerToppingPos.y} r="12" fill="#FB8500" stroke="#B84F00" strokeWidth="1.5" />
                  </g>
                )}

                {/* 6. 팀원 이름 및 번호 라벨 배지 */}
                <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
                  {/* 이름 배경 알약 버튼 */}
                  <rect
                    x="-34"
                    y="-14"
                    width="68"
                    height="28"
                    rx="14"
                    fill={isSelected ? member.color : "#FFFFFF"}
                    stroke={isSelected ? "#FFFFFF" : member.color}
                    strokeWidth="2"
                    className="transition-colors duration-200"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                  />
                  {/* 팀원 이름 텍스트 */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={isSelected ? "#FFFFFF" : "#2B1E16"}
                    fontSize="12"
                    fontWeight="800"
                    className="select-none font-sans"
                  >
                    {member.name}
                  </text>
                </g>

                {/* 7. 선택 시 외곽 하이라이트 펄스 링 */}
                {isSelected && (
                  <path
                    d={describeSlice(center, center, outerRadius + 6, startAngle, endAngle)}
                    fill="none"
                    stroke={member.color}
                    strokeWidth="4"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}

          {/* 중앙 피자 중심점 (피자 세이버 / 로고 핀) */}
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 4}
            fill="#FFFFFF"
            stroke="#C88A58"
            strokeWidth="3"
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.2))"
          />
          <circle
            cx={center}
            cy={center}
            r={innerRadius - 12}
            fill="#E63946"
          />
          <text
            x={center}
            y={center + 4}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="bold"
          >
            🍕 5
          </text>
        </svg>
      </div>

      {/* 조작 도움말 툴팁 */}
      {interactive && (
        <div className="absolute -bottom-7 bg-white/90 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-[#684B35] border border-[#E7DBC8] shadow-xs flex items-center gap-1.5 pointer-events-none">
          <span>👇</span>
          <span>피자 조각을 클릭하면 해당 팀원의 카드가 열립니다!</span>
        </div>
      )}
    </div>
  );
}
