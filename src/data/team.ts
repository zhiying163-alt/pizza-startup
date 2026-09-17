export type ToppingType = "tomato" | "cheese" | "basil" | "olive" | "pepperoni";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  topping: string;
  toppingEnglish: string;
  toppingType: ToppingType;
  color: string;
  textColor: string;
  avatarUrl?: string;
  tagline: string;
  skills: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "namgung",
    name: "남궁지영",
    role: "역할",
    bio: "한 줄 소개",
    topping: "토마토",
    toppingEnglish: "Tomato Red",
    toppingType: "tomato",
    color: "#D9383A", // 따뜻한 토마토 레드
    textColor: "#FFFFFF",
    avatarUrl: "",
    tagline: "피자의 깊은 베이스를 만드는 열정의 토마토",
    skills: ["기획", "열정", "베이스 구축"],
  },
  {
    id: "min",
    name: "민아현",
    role: "역할",
    bio: "한 줄 소개",
    topping: "치즈",
    toppingEnglish: "Cheese Yellow",
    toppingType: "cheese",
    color: "#F5A623", // 진하고 고소한 치즈 옐로
    textColor: "#2B1E16",
    avatarUrl: "",
    tagline: "모든 재료를 부드럽고 끈끈하게 이어주는 치즈",
    skills: ["조화", "유연성", "에너지"],
  },
  {
    id: "yoon",
    name: "윤서현",
    role: "역할",
    bio: "한 줄 소개",
    topping: "바질",
    toppingEnglish: "Basil Green",
    toppingType: "basil",
    color: "#386641", // 신선하고 차분한 내추럴 바질 그린
    textColor: "#FFFFFF",
    avatarUrl: "",
    tagline: "풍미를 한 단계 끌어올리는 신선한 바질",
    skills: ["아이디어", "디테일", "신선함"],
  },
  {
    id: "lee",
    name: "이주현",
    role: "역할",
    bio: "한 줄 소개",
    topping: "올리브",
    toppingEnglish: "Olive Charcoal",
    toppingType: "olive",
    // 흔한 AI 사이트 보라색/네온색 대신 자연스럽고 깊은 풍미의 블랙 올리브 차콜 그린 사용
    color: "#353B29", 
    textColor: "#FFFFFF",
    avatarUrl: "",
    tagline: "깊고 매력적인 풍미를 더해주는 블랙 올리브",
    skills: ["통찰력", "안정감", "문제 해결"],
  },
  {
    id: "lim",
    name: "임다희",
    role: "역할",
    bio: "한 줄 소개",
    topping: "페퍼로니",
    toppingEnglish: "Pepperoni Orange",
    toppingType: "pepperoni",
    color: "#C84B19", // 잘 구워진 페퍼로니 오렌지 레드
    textColor: "#FFFFFF",
    avatarUrl: "",
    tagline: "톡 쏘는 강렬함과 유쾌함을 선사하는 페퍼로니",
    skills: ["추진력", "창의성", "실행력"],
  },
];
