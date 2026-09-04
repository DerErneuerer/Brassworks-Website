import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

type LoadingPhase = "visible" | "leaving" | "hidden";
type AssetKind = "font" | "image" | "video";

const MIN_VISIBLE_TIME = 650;
const EXIT_DURATION = 650;
const MAX_LOADING_TIME = 20_000;
const ASSET_KEY = /(?:asset|avatar|background|command|content|cover|export|font|head|icon|image|instances|logo|minecraft|play|poster|servers|sharing|skin|source|src|thumbnail|video|worlds)/i;
const FONT_FILE = /\.(?:woff2?|ttf|otf)(?:[?#].*)?$/i;
const VIDEO_FILE = /\.(?:mp4|webm|og[gv]|mov|m4v)(?:[?#].*)?$/i;

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (
    !trimmed ||
    trimmed.startsWith("#") ||
    !/^(?:https?:|data:|blob:|\/|\.\.?\/)/i.test(trimmed)
  ) {
    return null;
  }

  try {
    return new URL(trimmed, window.location.href).href;
  } catch {
    return null;
  }
}

function getAssetKind(url: string, key = ""): AssetKind {
  if (FONT_FILE.test(url) || /font|minecraft/i.test(key)) return "font";
  if (VIDEO_FILE.test(url) || /video/i.test(key)) return "video";
  return "image";
}

function collectQueryAssets(
  value: unknown,
  assets: Map<string, AssetKind>,
  key = "",
  seen = new WeakSet<object>(),
) {
  if (typeof value === "string") {
    if (!ASSET_KEY.test(key)) return;

    const url = normalizeUrl(value);

    if (url) assets.set(url, getAssetKind(url, key));
    return;
  }

  if (!value || typeof value !== "object") return;
  if (seen.has(value)) return;

  seen.add(value);

  if (Array.isArray(value)) {
    value.forEach((entry) => collectQueryAssets(entry, assets, key, seen));
    return;
  }

  Object.entries(value).forEach(([entryKey, entry]) => {
    collectQueryAssets(entry, assets, entryKey, seen);
  });
}

function collectDomAssets(assets: Map<string, AssetKind>) {
  document
    .querySelectorAll<HTMLImageElement>("img:not([data-loading-skip])")
    .forEach((image) => {
      const url = normalizeUrl(image.currentSrc || image.src);

      if (url) assets.set(url, "image");
    });

  document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
    const source = video.currentSrc || video.src;
    const sourceUrl = source ? normalizeUrl(source) : null;
    const posterUrl = video.poster ? normalizeUrl(video.poster) : null;

    if (sourceUrl) assets.set(sourceUrl, "video");
    if (posterUrl) assets.set(posterUrl, "image");

    video.querySelectorAll<HTMLSourceElement>("source[src]").forEach((entry) => {
      const url = normalizeUrl(entry.src);

      if (url) assets.set(url, "video");
    });
  });

  document
    .querySelectorAll<HTMLLinkElement>('link[rel~="icon"][href]')
    .forEach((link) => {
      const url = normalizeUrl(link.href);

      if (url) assets.set(url, "image");
    });
}

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;
    let decoding = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    const decode = () => {
      if (settled || decoding) return;
      decoding = true;

      void image.decode().catch(() => {}).finally(finish);
    };

    image.onload = decode;
    image.onerror = finish;
    image.src = url;

    if (image.complete) {
      if (image.naturalWidth > 0) decode();
      else finish();
    }
  });
}

function preloadVideo(url: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("error", finish);
      video.removeEventListener("abort", finish);
      video.removeAttribute("src");
      video.load();
      resolve();
    };

    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;
    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.addEventListener("abort", finish, { once: true });
    video.src = url;
    video.load();

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) finish();
  });
}

async function preloadQueue(
  urls: string[],
  loader: (url: string) => Promise<void>,
  concurrency: number,
) {
  let cursor = 0;

  const worker = async () => {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      const url = urls[index];

      if (!url) continue;

      await loader(url);
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, urls.length) },
      () => worker(),
    ),
  );
}

async function preloadFonts() {
  if (!("fonts" in document)) return;

  await Promise.allSettled([
    document.fonts.load('400 16px "minecraft"'),
    document.fonts.load('700 16px "minecraft"'),
    document.fonts.load('italic 400 16px "minecraft"'),
  ]);
  await document.fonts.ready;
}

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

export function LoadingScreen() {
  const [phase, setPhase] = useState<LoadingPhase>("visible");
  const pendingQueries = useIsFetching();
  const queryClient = useQueryClient();
  const mountedAt = useRef(0);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (exitTimer.current) return;

    const elapsed = Date.now() - mountedAt.current;
    const delay = Math.max(0, MIN_VISIBLE_TIME - elapsed);

    exitTimer.current = setTimeout(() => {
      document.documentElement.dataset.siteReady = "true";
      setPhase("leaving");
      exitTimer.current = setTimeout(() => {
        setPhase("hidden");
      }, EXIT_DURATION);
    }, delay);
  }, []);

  useEffect(() => {
    mountedAt.current = Date.now();
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("aria-busy", "true");

    const timeout = window.setTimeout(finish, MAX_LOADING_TIME);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("aria-busy");

      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "visible" || pendingQueries > 0) return;

    let cancelled = false;

    const load = async () => {
      await waitForWindowLoad();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      if (cancelled) return;

      const assets = new Map<string, AssetKind>();

      queryClient
        .getQueryCache()
        .getAll()
        .forEach((query) => collectQueryAssets(query.state.data, assets));
      collectDomAssets(assets);

      const images: string[] = [];
      const videos: string[] = [];

      assets.forEach((kind, url) => {
        if (kind === "image") images.push(url);
        if (kind === "video") videos.push(url);
      });

      await Promise.allSettled([
        preloadQueue(images, preloadImage, 3),
        preloadQueue(videos, preloadVideo, 1),
        preloadFonts(),
      ]);

      if (!cancelled) finish();
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [finish, pendingQueries, phase, queryClient]);

  useEffect(() => {
    if (phase !== "hidden") return;

    document.body.style.overflow = "";
    document.documentElement.removeAttribute("aria-busy");
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0c0b] px-6 text-white [backface-visibility:hidden] [contain:strict] [transform:translateZ(0)] [will-change:opacity] transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Brassworks"
    >
      <div className="flex w-full max-w-[260px] flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Preparing the workshop
        </p>

        <div
          className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/8"
          role="progressbar"
          aria-label="Loading website assets"
        >
          <span className="block h-full w-[42%] rounded-full bg-[#c7a35a] [backface-visibility:hidden] [will-change:transform] animate-[loading-screen-progress_1.15s_linear_infinite]"/>
        </div>
      </div>
    </div>
  );
}
