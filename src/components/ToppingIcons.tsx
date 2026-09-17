import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// 🍅 토마토 슬라이스 SVG
export function TomatoTopping({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <circle cx="16" cy="16" r="14" fill="#D9383A" stroke="#9E1B26" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" fill="#E85D60" />
      {/* 과육 구획선 */}
      <line x1="16" y1="6" x2="16" y2="26" stroke="#C92A2A" strokeWidth="1.8" />
      <line x1="6" y1="16" x2="26" y2="16" stroke="#C92A2A" strokeWidth="1.8" />
      {/* 씨앗들 */}
      <circle cx="12" cy="12" r="1.5" fill="#FFE066" />
      <circle cx="20" cy="12" r="1.5" fill="#FFE066" />
      <circle cx="12" cy="20" r="1.5" fill="#FFE066" />
      <circle cx="20" cy="20" r="1.5" fill="#FFE066" />
    </svg>
  );
}

// 🧀 치즈 조각/큐브 SVG
export function CheeseTopping({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M5 24L26 24C27.1 24 28 23.1 28 22L28 17L18 8L5 15L5 24Z"
        fill="#F5A623"
        stroke="#C68A00"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5 15L18 8L28 17"
        stroke="#C68A00"
        strokeWidth="2"
      />
      {/* 치즈 구멍들 */}
      <circle cx="12" cy="19" r="2.5" fill="#E08E00" />
      <circle cx="21" cy="20" r="2" fill="#E08E00" />
      <circle cx="17" cy="14" r="1.5" fill="#E08E00" />
    </svg>
  );
}

// 🌿 바질 잎사귀 SVG
export function BasilTopping({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M16 4C23 7 27 15 24 23C21 28 14 28 9 24C4 19 6 9 16 4Z"
        fill="#386641"
        stroke="#234629"
        strokeWidth="2"
      />
      {/* 잎맥 */}
      <path
        d="M16 7C17 14 18 20 18 26"
        stroke="#588157"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 13C21 12 23 14 23 14"
        stroke="#588157"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 19C21 19 22 21 22 21"
        stroke="#588157"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 15C13 15 11 17 11 17"
        stroke="#588157"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 🫒 올리브 링 SVG (자연스러운 다크 올리브 컬러, 인위적인 보라색 배제)
export function OliveTopping({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 자연스러운 검정 올리브 원형 링 */}
      <circle cx="16" cy="16" r="13" fill="#353B29" stroke="#1E2316" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="6" fill="#FBF6EE" stroke="#1E2316" strokeWidth="1.8" />
      <circle cx="13" cy="11" r="1.5" fill="#586144" opacity="0.6" />
    </svg>
  );
}

// 🍕 페퍼로니 햄 슬라이스 SVG
export function PepperoniTopping({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <circle cx="16" cy="16" r="13.5" fill="#C84B19" stroke="#8E2E0A" strokeWidth="2" />
      {/* 페퍼로니 향신료 반점 */}
      <circle cx="11" cy="12" r="1.6" fill="#641A00" />
      <circle cx="21" cy="13" r="1.8" fill="#641A00" />
      <circle cx="15" cy="19" r="1.5" fill="#641A00" />
      <circle cx="19" cy="20" r="1.3" fill="#641A00" />
      <circle cx="13" cy="22" r="1.2" fill="#FFA570" opacity="0.7" />
      <circle cx="20" cy="16" r="1.2" fill="#FFA570" opacity="0.7" />
    </svg>
  );
}

// 🍕 피자 조각 로고 아이콘
export function PizzaSliceIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 크러스트 */}
      <path
        d="M4 8C12 5 20 5 28 8L16 28L4 8Z"
        fill="#F4A261"
        stroke="#9C5212"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 8C12 5 20 5 28 8"
        stroke="#D3812E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* 치즈 & 토핑 */}
      <circle cx="14" cy="14" r="2.5" fill="#D9383A" />
      <circle cx="18" cy="18" r="2" fill="#353B29" />
      <circle cx="16" cy="10" r="1.5" fill="#386641" />
    </svg>
  );
}
