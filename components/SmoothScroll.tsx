"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Lenis roda no ticker do GSAP para o ScrollTrigger e o smooth scroll ficarem no mesmo frame
function GsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, anchors: true, stopInertiaOnNavigate: true }}>
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
