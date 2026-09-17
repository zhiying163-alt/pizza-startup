export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  topping: string;
  toppingEnglish: string;
  toppingEmoji: string;
  color: string;
  textColor: string;
  avatarUrl?: string; // 프로필 사진 경로 (예: "/avatars/namgung.png")가 있으면 사진 노출, 없으면 원형 컬러 블록 노출
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
    toppingEmoji: "🍅",
    color: "#E63946",
    textColor: "#FFFFFF",
    avatarUrl: "", // 사진을 넣으시려면 여기에 이미지 경로를 입력하세요. 비어있으면 지정된 색상의 원형 블록이 표시됩니다.
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
    toppingEmoji: "🧀",
    color: "#FFB703",
    textColor: "#1F2937",
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
    toppingEmoji: "🌿",
    color: "#2A9D8F",
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
    toppingEnglish: "Olive Purple",
    toppingEmoji: "🫒",
    color: "#7209B7",
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
    toppingEmoji: "🍕",
    color: "#FB8500",
    textColor: "#FFFFFF",
    avatarUrl: "",
    tagline: "톡 쏘는 강렬함과 유쾌함을 선사하는 페퍼로니",
    skills: ["추진력", "창의성", "실행력"],
  },
];
