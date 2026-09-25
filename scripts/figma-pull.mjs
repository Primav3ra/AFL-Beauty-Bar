#!/usr/bin/env node
// Pulls the AFL Beauty Bar Figma file via the REST API and caches it locally.
//
//   node scripts/figma-pull.mjs                 # file.json + image fills + frame renders (skips cached)
//   node scripts/figma-pull.mjs file|images|screens [--force]
//   node scripts/figma-pull.mjs svg 12:34=logo 56:78=cart   # export nodes as SVG to public/icons/
//
// Token is read from .env.local (FIGMA_TOKEN) and is never printed.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const FILE_KEY = "1ictsSplO90xGC768P2JmZ";
const API = "https://api.figma.com/v1";

if (existsSync(join(ROOT, ".env.local"))) process.loadEnvFile(join(ROOT, ".env.local"));
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error("FIGMA_TOKEN missing. Add FIGMA_TOKEN=... to .env.local (never commit it).");
  process.exit(1);
}

import { FRAMES } from "./frames.mjs";

const args = process.argv.slice(2);
const force = args.includes("--force");
const cmd = args.find((a) => !a.startsWith("--")) ?? "all";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ensureDir = (d) => mkdirSync(d, { recursive: true });

async function req(url, { auth = true, attempts = 6 } = {}) {
  for (let i = 1; ; i++) {
    let res;
    try {
      res = await fetch(url, auth ? { headers: { "X-Figma-Token": TOKEN } } : {});
    } catch (err) {
      if (i >= attempts) throw err;
      await sleep(2000 * i);
      continue;
    }
    if (res.ok) return res;
    if ((res.status === 429 || res.status >= 500) && i < attempts) {
      const retryAfter = Number(res.headers.get("retry-after"));
      const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 3000 * 2 ** i;
      if (wait > 5 * 60 * 1000) throw new Error(`HTTP 429 with Retry-After ${retryAfter}s (${(retryAfter / 3600).toFixed(1)}h) — Figma plan rate limit; try again later`);
      console.warn(`  HTTP ${res.status}, retrying in ${Math.round(wait / 1000)}s (${i}/${attempts})`);
      await sleep(wait);
      continue;
    }
    const body = await res.text().catch(() => "");
    // Strip the URL query to avoid leaking signed URLs; token is in a header so never in output.
    throw new Error(`HTTP ${res.status} for ${url.split("?")[0]}: ${body.slice(0, 300)}`);
  }
}

const EXT = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/svg+xml": "svg" };

async function pullFile() {
  const out = join(ROOT, "design", "file.json");
  if (existsSync(out) && !force) return console.log("file.json cached (use --force to refetch)");
  ensureDir(join(ROOT, "design"));
  console.log("GET file …");
  const res = await req(`${API}/files/${FILE_KEY}`);
  const text = await res.text();
  writeFileSync(out, text);
  console.log(`saved design/file.json (${(text.length / 1e6).toFixed(1)} MB)`);
}

async function pullImages() {
  const dir = join(ROOT, "design", "figma-src");
  ensureDir(dir);
  console.log("GET image fills …");
  const { meta } = await (await req(`${API}/files/${FILE_KEY}/images`)).json();
  const entries = Object.entries(meta.images ?? {});
  const manifest = {};
  let done = 0, skipped = 0, failed = 0;
  const queue = [...entries];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length) {
        const [ref, url] = queue.shift();
        if (!url) { failed++; continue; }
        const cachedExt = Object.values(EXT).find((e) => existsSync(join(dir, `${ref}.${e}`)));
        if (cachedExt && !force) { manifest[ref] = `${ref}.${cachedExt}`; skipped++; continue; }
        try {
          const res = await req(url, { auth: false });
          const ext = EXT[res.headers.get("content-type")?.split(";")[0]] ?? "png";
          writeFileSync(join(dir, `${ref}.${ext}`), Buffer.from(await res.arrayBuffer()));
          manifest[ref] = `${ref}.${ext}`;
          done++;
        } catch (e) {
          failed++;
          console.warn(`  failed ${ref}: ${e.message}`);
        }
      }
    }),
  );
  ensureDir(join(ROOT, "design"));
  writeFileSync(join(ROOT, "design", "images.json"), JSON.stringify(manifest, null, 2));
  console.log(`images: ${entries.length} refs, ${done} downloaded, ${skipped} cached, ${failed} failed`);
}

async function render(ids, format, scale = 1) {
  const q = new URLSearchParams({ ids: ids.join(","), format, ...(format === "png" ? { scale: String(scale) } : {}) });
  const { images, err } = await (await req(`${API}/images/${FILE_KEY}?${q}`)).json();
  if (err) throw new Error(err);
  return images;
}

async function pullScreens() {
  const dir = join(ROOT, "design", "screens");
  ensureDir(dir);
  const file = (id) => join(dir, `${id.replace(":", "-")}.png`);
  const todo = FRAMES.filter((id) => force || !existsSync(file(id)));
  console.log(`screens: ${FRAMES.length - todo.length} cached, rendering ${todo.length}`);
  const failed = [];
  for (let i = 0; i < todo.length; i += 6) {
    const batch = todo.slice(i, i + 6);
    let urls;
    try {
      urls = await render(batch, "png");
    } catch (e) {
      console.warn(`  batch failed (${e.message}); retrying singly`);
      urls = {};
      for (const id of batch) {
        try { Object.assign(urls, await render([id], "png")); } catch { urls[id] = null; }
      }
    }
    for (const id of batch) {
      if (!urls[id]) { failed.push(id); continue; }
      const res = await req(urls[id], { auth: false });
      writeFileSync(file(id), Buffer.from(await res.arrayBuffer()));
      process.stdout.write(".");
    }
  }
  console.log(`\nscreens done, ${failed.length} failed${failed.length ? ": " + failed.join(" ") : ""}`);
}

async function pullSvgs(specs) {
  const dir = join(ROOT, "public", "icons");
  ensureDir(dir);
  const map = Object.fromEntries(specs.map((s) => { const [id, name] = s.split("="); return [id, name ?? id.replace(":", "-")]; }));
  const urls = await render(Object.keys(map), "svg");
  for (const [id, name] of Object.entries(map)) {
    if (!urls[id]) { console.warn(`  no render for ${id}`); continue; }
    const res = await req(urls[id], { auth: false });
    writeFileSync(join(dir, `${name}.svg`), await res.text());
    console.log(`saved public/icons/${name}.svg`);
  }
}

try {
  if (cmd === "svg") await pullSvgs(args.filter((a) => a !== "svg" && !a.startsWith("--")));
  else {
    if (cmd === "all" || cmd === "file") await pullFile();
    if (cmd === "all" || cmd === "images") await pullImages();
    if (cmd === "all" || cmd === "screens") await pullScreens();
  }
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
