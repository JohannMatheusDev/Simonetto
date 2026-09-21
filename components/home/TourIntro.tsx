"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "simonetto:intro";
// Se os frames demorarem, a intro abre mesmo assim depois deste tempo (s)
const MAX_WAIT = 4;

// Recortes da logo horizontal (899x213) para animar símbolo, nome e "MÓVEIS PLANEJADOS" separados
const SYMBOL_CLIP = "inset(0% 81.5% 22% 0%)";
const WORDMARK_CLIP = "inset(0% 0% 22% 22%)";
const TAGLINE_CLIP = "inset(79% 0% 0% 0%)";

const hidden = { visibility: "hidden", opacity: 0 } as const;

// Intro: logo sobre fundo preto → as "portas" se abrem → a fachada surge em 3D.
// Serve também de preloader enquanto os primeiros frames do tour carregam.
export default function TourIntro({
  ready,
  stageRef,
}: {
  ready: boolean;
  stageRef: RefObject<HTMLDivElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const lockedRef = useRef(false);
  const readyRef = useRef(ready);
  const openRef = useRef<() => void>(() => {});

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && lockedRef.current) lenis.stop();
  }, [lenis]);

  useEffect(() => {
    readyRef.current = ready;
    if (ready) openRef.current();
  }, [ready]);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current!;
      const stage = stageRef.current!;
      const q = gsap.utils.selector(root);
      const scene = stage.querySelector("[data-scene]");
      const firstChapter = stage.querySelector("[data-chapter]");
      // A intro anima o conteúdo interno e o scroll controla o capítulo inteiro.
      // Antes as duas animações disputavam o mesmo elemento: o scroll é liberado 1,6 s
      // antes de a intro terminar, e quem rolasse nesse intervalo via o texto do primeiro
      // capítulo ficar preso na tela até o fim do tour, sobreposto aos outros capítulos.
      const firstChapterInner = stage.querySelector("[data-chapter-inner]");
      const tourUi = stage.querySelectorAll("[data-tour-ui]");

      const unlock = () => {
        if (!lockedRef.current) return;
        lockedRef.current = false;
        document.documentElement.classList.remove("intro-lock");
        lenisRef.current?.start();
      };

      let played = false;
      try {
        played = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {}
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (played || reducedMotion) {
        gsap.set(root, { display: "none" });
        gsap.set([firstChapter, ...tourUi], { autoAlpha: 1 });
        return;
      }

      lockedRef.current = true;
      document.documentElement.classList.add("intro-lock");
      window.scrollTo(0, 0);

      let logoShown = false;
      let opened = false;

      const open = contextSafe!((force = false) => {
        if (opened || !logoShown || (!readyRef.current && !force)) return;
        opened = true;

        gsap
          .timeline({
            onComplete: () => {
              gsap.set(root, { display: "none" });
              try {
                sessionStorage.setItem(SESSION_KEY, "1");
              } catch {}
            },
          })
          .to(q("[data-intro-logo]"), { autoAlpha: 0, scale: 0.94, duration: 0.7, ease: "power2.in" }, 0)
          .to(q("[data-intro-panel=left]"), { xPercent: -100, duration: 1.5, ease: "expo.inOut" }, 0.5)
          .to(q("[data-intro-panel=right]"), { xPercent: 100, duration: 1.5, ease: "expo.inOut" }, 0.5)
          .to(scene, { scale: 1, rotateX: 0, yPercent: 0, duration: 2.4, ease: "expo.out" }, 0.8)
          .call(unlock, [], 1.6)
          .set(firstChapter, { autoAlpha: 1 }, 0)
          .fromTo(firstChapterInner, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.3, ease: "expo.out" }, 1.5)
          .to(tourUi, { autoAlpha: 1, duration: 0.8 }, 1.9);
      });
      openRef.current = open;

      const afterLogo = contextSafe!(() => {
        logoShown = true;
        open();
        gsap.delayedCall(MAX_WAIT, () => open(true));
      });

      gsap.set(scene, { scale: 1.3, rotateX: 14, yPercent: 8, transformPerspective: 1400, transformOrigin: "50% 70%" });

      gsap
        .timeline({ delay: 0.3, onComplete: afterLogo })
        .fromTo(
          q("[data-intro-symbol]"),
          { autoAlpha: 0, rotate: -90, scale: 0.4 },
          { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.4, ease: "expo.out" },
          0,
        )
        .to(q("[data-intro-word]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" }, 0.4)
        .fromTo(q("[data-intro-tagline]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, 1.2)
        .fromTo(q("[data-intro-line]"), { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" }, 1.2)
        .fromTo(
          q("[data-intro-city]"),
          { autoAlpha: 0, letterSpacing: "1.2em" },
          { autoAlpha: 1, letterSpacing: "0.5em", duration: 1.6, ease: "expo.out" },
          1.4,
        )
        .to({}, { duration: 0.2 });

      return unlock;
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} aria-hidden className="fixed inset-0 z-[100]">
      <div data-intro-panel="left" className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-ink" />
      <div data-intro-panel="right" className="absolute inset-y-0 right-0 w-1/2 bg-ink" />

      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div data-intro-logo className="flex flex-col items-center">
          <div className="relative aspect-[899/213] w-[min(78vw,440px)]">
            <Image
              data-intro-symbol
              src="/brand/simonetto-logo.png"
              alt=""
              fill
              preload
              sizes="440px"
              className="logo-white"
              style={{ ...hidden, clipPath: SYMBOL_CLIP, transformOrigin: "9% 38%" }}
            />
            <div data-intro-word className="absolute inset-0" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
              <Image
                src="/brand/simonetto-logo.png"
                alt=""
                fill
                loading="eager"
                sizes="440px"
                className="logo-white"
                style={{ clipPath: WORDMARK_CLIP }}
              />
            </div>
            <Image
              data-intro-tagline
              src="/brand/simonetto-logo.png"
              alt=""
              fill
              loading="eager"
              sizes="440px"
              className="logo-white"
              style={{ ...hidden, clipPath: TAGLINE_CLIP }}
            />
          </div>
          <span data-intro-line className="mt-10 block h-px w-24 bg-gold" style={hidden} />
          <p
            data-intro-city
            className="mt-6 text-[11px] font-medium uppercase tracking-[0.5em] text-gold"
            style={hidden}
          >
            Guarapuava
          </p>
        </div>
      </div>
    </div>
  );
}
