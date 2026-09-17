"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Anima os filhos diretos quando o bloco entra na tela
export default function Reveal({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current!.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
