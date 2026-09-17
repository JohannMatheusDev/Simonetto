"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { frameUrl, tourManifest } from "@/lib/tour";

const PARALLEL_REQUESTS = 6;

// Desenha no canvas a sequência de frames do vídeo do tour.
// Carrega de forma progressiva (a cada 16 frames, depois 8, 4, 2, 1) para o scroll
// funcionar logo no início e ir ganhando fluidez enquanto o resto baixa.
export function useFrameSequence(canvasRef: RefObject<HTMLCanvasElement | null>, enabled: boolean) {
  const [ready, setReady] = useState(false);
  const seek = useRef<(progress: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!enabled || !canvas || !ctx) return;

    const portrait = window.matchMedia("(max-aspect-ratio: 1/1)").matches;
    const source = (portrait && tourManifest.mobile) || tourManifest.desktop;
    if (!source) return;

    const count = source.count;
    const frames: (HTMLImageElement | undefined)[] = new Array(count);
    let target = 0;
    let drawn = -1;
    let settled = 0;
    let cancelled = false;
    const readyAfter = Math.ceil(count / 8);

    const draw = (force = false) => {
      let index = -1;
      for (let d = 0; d < count && index < 0; d++) {
        if (frames[target - d]) index = target - d;
        else if (frames[target + d]) index = target + d;
      }
      if (index < 0 || (index === drawn && !force)) return;

      const img = frames[index]!;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      drawn = index;
    };

    seek.current = (progress) => {
      target = Math.round(progress * (count - 1));
      draw();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.imageSmoothingQuality = "high";
      draw(true);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const order: number[] = [];
    const queued = new Uint8Array(count);
    for (let step = 16; step >= 1; step /= 2) {
      for (let i = 0; i < count; i += step) {
        if (!queued[i]) {
          queued[i] = 1;
          order.push(i);
        }
      }
    }

    let cursor = 0;
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const index = order[cursor++];
      const img = new Image();
      img.src = frameUrl(source, index);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames[index] = img;
          if (drawn < 0 || Math.abs(index - target) < Math.abs(drawn - target)) draw();
        })
        .catch(() => {})
        .finally(() => {
          settled++;
          if (settled === readyAfter && !cancelled) setReady(true);
          loadNext();
        });
    };
    for (let i = 0; i < PARALLEL_REQUESTS; i++) loadNext();

    return () => {
      cancelled = true;
      observer.disconnect();
      seek.current = () => {};
    };
  }, [canvasRef, enabled]);

  return { ready, seek };
}
