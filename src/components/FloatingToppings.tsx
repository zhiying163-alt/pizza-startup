"use client";

import { BasilTopping, OliveTopping, PepperoniTopping, TomatoTopping } from "./ToppingIcons";

export default function FloatingToppings() {
  const toppings = [
    { type: "pepperoni", x: "8%", y: "15%", size: 38, delay: "0s", duration: "16s", rot: "12deg" },
    { type: "basil", x: "88%", y: "22%", size: 34, delay: "2s", duration: "19s", rot: "-25deg" },
    { type: "olive", x: "4%", y: "65%", size: 30, delay: "4s", duration: "14s", rot: "45deg" },
    { type: "tomato", x: "92%", y: "75%", size: 36, delay: "1s", duration: "18s", rot: "-15deg" },
    { type: "basil", x: "20%", y: "88%", size: 30, delay: "5s", duration: "21s", rot: "30deg" },
    { type: "pepperoni", x: "82%", y: "48%", size: 32, delay: "3s", duration: "15s", rot: "-18deg" },
    { type: "olive", x: "12%", y: "42%", size: 26, delay: "6s", duration: "17s", rot: "60deg" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40 select-none">
      {toppings.map((t, idx) => (
        <div
          key={idx}
          className="absolute animate-float-drift"
          style={{
            left: t.x,
            top: t.y,
            animationDelay: t.delay,
            animationDuration: t.duration,
            transform: `rotate(${t.rot})`,
          }}
        >
          {t.type === "pepperoni" && <PepperoniTopping size={t.size} />}
          {t.type === "basil" && <BasilTopping size={t.size} />}
          {t.type === "olive" && <OliveTopping size={t.size} />}
          {t.type === "tomato" && <TomatoTopping size={t.size} />}
        </div>
      ))}
    </div>
  );
}
