import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingToppings from "@/components/FloatingToppings";
import "./globals.css";

export const metadata: Metadata = {
  title: "피자스타트업 | 5조각이 모여 완성하는 하나의 비전",
  description:
    "남궁지영, 민아현, 윤서현, 이주현, 임다희 5명의 개성 넘치는 토핑이 모여 만든 피자스타트업 소개 사이트입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Jua&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF6EE] text-[#2B1E16] antialiased selection:bg-[#F5A623] selection:text-[#2B1E16] relative">
        {/* 배경에 은은하게 떠다니는 수제 토핑 (페퍼로니, 올리브, 바질) */}
        <FloatingToppings />
        
        <Header />
        <main className="flex-1 flex flex-col relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
