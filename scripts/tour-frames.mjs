#!/usr/bin/env node
// Converte o vídeo do tour em uma sequência de frames WebP para o scroll da home
// e atualiza lib/tour-manifest.json. Requer ffmpeg (brew install ffmpeg webp).
//
// Uso:
//   npm run tour:frames -- videos/tour.mp4
//   npm run tour:frames -- videos/tour.mp4 --mobile videos/tour-vertical.mp4
//   npm run tour:frames -- videos/tour.mp4 --frames 360 --quality 75
//
// Sem --mobile, a versão de celular é um recorte central 9:16 do vídeo horizontal.

import { execFile, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { cpus, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { parseArgs } from "node:util";

const run = promisify(execFile);
const root = resolve(import.meta.dirname, "..");

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    mobile: { type: "string" },
    "no-mobile": { type: "boolean", default: false },
    frames: { type: "string", default: "300" },
    "mobile-frames": { type: "string", default: "180" },
    width: { type: "string", default: "1920" },
    "mobile-width": { type: "string", default: "720" },
    quality: { type: "string", default: "72" },
  },
});

const input = positionals[0];
if (!input) {
  console.error("Informe o vídeo: npm run tour:frames -- videos/tour.mp4");
  process.exit(1);
}

const has = (cmd, args) => spawnSync(cmd, args, { encoding: "utf8" }).status === 0;
if (!has("ffmpeg", ["-version"]) || !has("ffprobe", ["-version"])) {
  console.error("ffmpeg não encontrado. Instale com: brew install ffmpeg");
  process.exit(1);
}
const ffmpegWebp = spawnSync("ffmpeg", ["-hide_banner", "-encoders"], { encoding: "utf8" }).stdout.includes("libwebp");
const cwebp = has("cwebp", ["-version"]);

async function probe(file, entries) {
  const { stdout } = await run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entries, "-of", "csv=p=0:s=x", file]);
  return stdout.trim();
}

async function pool(items, limit, task) {
  let next = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (next < items.length) await task(items[next++]);
  });
  await Promise.all(workers);
}

async function extract({ name, video, frames, width, crop }) {
  const duration = Number(await probe(video, "format=duration"));
  const fps = Math.min(30, frames / duration);
  const outDir = join(root, "public", "tour", name);
  const quality = values.quality;

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const filters = [crop, `fps=${fps.toFixed(4)}`, `scale=${width}:-2:flags=lanczos`].filter(Boolean).join(",");
  console.log(`\n[${name}] ${video} · ${duration.toFixed(1)}s → ~${frames} frames (${fps.toFixed(2)} fps), largura ${width}px`);

  let ext = "webp";
  if (ffmpegWebp) {
    await run("ffmpeg", ["-v", "error", "-i", video, "-vf", filters, "-an", "-c:v", "libwebp", "-quality", quality, join(outDir, "%04d.webp")]);
  } else {
    const tmp = mkdtempSync(join(tmpdir(), "tour-frames-"));
    await run("ffmpeg", ["-v", "error", "-i", video, "-vf", filters, "-an", "-q:v", "2", join(tmp, "%04d.jpg")]);
    const files = readdirSync(tmp).filter((f) => f.endsWith(".jpg"));

    if (cwebp) {
      await pool(files, cpus().length, (file) =>
        run("cwebp", ["-quiet", "-q", quality, "-m", "5", join(tmp, file), "-o", join(outDir, file.replace(".jpg", ".webp"))]),
      );
    } else {
      console.warn("Sem encoder WebP (instale com: brew install webp). Usando JPG.");
      ext = "jpg";
      for (const file of files) renameSync(join(tmp, file), join(outDir, file));
    }
    rmSync(tmp, { recursive: true, force: true });
  }

  const output = readdirSync(outDir).filter((f) => f.endsWith(`.${ext}`)).sort();
  const [w, h] = (await probe(join(outDir, output[0]), "stream=width,height")).split("x").map(Number);
  const bytes = output.reduce((sum, f) => sum + statSync(join(outDir, f)).size, 0);
  console.log(`[${name}] ${output.length} frames ${w}x${h} · ${(bytes / 1024 / 1024).toFixed(1)} MB`);

  return { path: `/tour/${name}`, count: output.length, width: w, height: h, ext };
}

const manifest = {
  desktop: await extract({
    name: "desktop",
    video: input,
    frames: Number(values.frames),
    width: Number(values.width),
  }),
  mobile: values["no-mobile"]
    ? null
    : await extract({
        name: "mobile",
        video: values.mobile ?? input,
        frames: Number(values["mobile-frames"]),
        width: Number(values["mobile-width"]),
        crop: values.mobile ? null : "crop=trunc(ih*9/16/2)*2:ih",
      }),
};

writeFileSync(join(root, "lib", "tour-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("\nlib/tour-manifest.json atualizado. A home já vai usar o vídeo no lugar das fotos.");
