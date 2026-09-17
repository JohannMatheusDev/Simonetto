"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Emphasis from "@/components/Emphasis";
import Eyebrow from "@/components/Eyebrow";
import ButtonLink from "@/components/ButtonLink";
import TourIntro from "./TourIntro";
import { useFrameSequence } from "./useFrameSequence";
import { hasTourFrames, tourChapters, TOUR_SCROLL_SCREENS } from "@/lib/tour";
import { whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const hidden = { visibility: "hidden", opacity: 0 } as const;

// Hero da home: tour de "drone" pela loja controlado pelo scroll.
// Com frames em /public/tour usa o vídeo; sem frames, anima as fotos reais da loja.
export default function StoreTour() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready: framesReady, seek } = useFrameSequence(canvasRef, hasTourFrames);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const chapters = q("[data-chapter]");
      const layers = q("[data-fallback-layer]");
      const railItems = q<HTMLElement>("[data-rail-item]");
      const railFill = q("[data-rail-fill]");
      const fade = 0.04;

      // A timeline tem duração 1, então start/end dos capítulos equivalem ao progresso do scroll
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.set(railFill, { scaleY: self.progress });
            const active = tourChapters.findLastIndex((c) => self.progress >= c.start);
            railItems.forEach((item, i) => item.toggleAttribute("data-active", i === active));
          },
        },
      });

      const frame = { progress: 0 };
      tl.to(frame, { progress: 1, duration: 1, onUpdate: () => seek.current(frame.progress) }, 0);

      layers.forEach((layer, i) => {
        const { start, end } = tourChapters[i];
        if (i > 0) tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, start - 0.03);
        tl.fromTo(layer, { scale: 1.15 }, { scale: 1, duration: end - start + 0.03 }, Math.max(0, start - 0.03));
      });

      chapters.forEach((chapter, i) => {
        const { start, end } = tourChapters[i];
        if (i > 0) {
          tl.fromTo(chapter, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: fade, ease: "power2.out" }, start);
        }
        if (i < chapters.length - 1) {
          tl.to(chapter, { autoAlpha: 0, y: -48, duration: fade, ease: "power2.in" }, end - fade);
        }
      });

      tl.to(q("[data-scroll-hint]"), { autoAlpha: 0, duration: 0.03 }, 0.01);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-hero
      aria-label="Tour pelo showroom Simonetto Guarapuava"
      className="relative bg-ink text-paper"
      style={{ height: `${(TOUR_SCROLL_SCREENS + 1) * 100}lvh` }}
    >
      <div ref={stageRef} className="sticky top-0 h-lvh overflow-hidden">
        <div data-scene className="absolute inset-0 will-change-transform">
          {hasTourFrames ? (
            <canvas ref={canvasRef} className="size-full" />
          ) : (
            tourChapters.map((chapter, i) => (
              <div
                key={chapter.id}
                data-fallback-layer
                className="absolute inset-0"
                style={i === 0 ? undefined : hidden}
              >
                <Image
                  src={chapter.fallbackImage}
                  alt=""
                  fill
                  preload={i === 0}
                  // as fotos seguintes ficam ocultas até a troca; lazy faria piscar a foto anterior
                  loading="eager"
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: chapter.fallbackPosition }}
                />
              </div>
            ))
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/15 to-ink/45" />

        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-svh max-w-7xl">
          {tourChapters.map((chapter, i) => {
            const Heading = i === 0 ? "h1" : "h2";
            const isLast = i === tourChapters.length - 1;
            return (
              <div
                key={chapter.id}
                data-chapter
                className={`absolute inset-0 flex items-end px-6 pb-28 md:px-10 md:pb-24 ${
                  chapter.align === "right" ? "md:justify-end md:pr-64" : ""
                }`}
                style={hidden}
              >
                <div className="max-w-xl">
                  <Eyebrow>{chapter.eyebrow}</Eyebrow>
                  <Heading className="mt-5 text-4xl font-light leading-[1.06] text-balance md:text-6xl">
                    <Emphasis text={chapter.title} />
                  </Heading>
                  <p className="mt-5 max-w-md text-paper/75 md:text-lg">{chapter.text}</p>
                  {isLast && (
                    <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                      <ButtonLink href={whatsappLink()} external>
                        Agendar visita
                      </ButtonLink>
                      <ButtonLink href="/quem-somos" variant="light">
                        Nossa história
                      </ButtonLink>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div
            data-tour-ui
            className="absolute right-10 top-1/2 hidden -translate-y-1/2 items-stretch gap-5 md:flex"
            style={hidden}
          >
            <ol className="flex flex-col justify-between gap-6 text-right text-[10px] uppercase tracking-[0.25em]">
              {tourChapters.map((chapter, i) => (
                <li
                  key={chapter.id}
                  data-rail-item
                  data-active={i === 0 ? "" : undefined}
                  className="text-paper/40 transition-colors duration-500 data-active:text-paper"
                >
                  {chapter.eyebrow}
                </li>
              ))}
            </ol>
            <div className="relative w-px bg-paper/20">
              <div data-rail-fill className="absolute inset-0 origin-top scale-y-0 bg-gold" />
            </div>
          </div>

          <div
            data-tour-ui
            className="absolute inset-x-0 bottom-8 flex justify-center"
            style={hidden}
          >
            <div data-scroll-hint className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-paper/70">
              Role para explorar
              <span className="relative block h-10 w-px overflow-hidden bg-paper/20">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gold motion-safe:animate-scroll-line" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <TourIntro ready={framesReady || !hasTourFrames} stageRef={stageRef} />
    </section>
  );
}
