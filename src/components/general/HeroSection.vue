<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type ComponentPublicInstance,
} from "vue";
import { assetUrl } from "../../lib/assets";

type SlideLogo = {
  source: string;
  alt: string;
  href: string;
  newTab: boolean;
  width: string;
  positionX: string;
  positionY: string;
  opacity: number;
  linkClass: string;
  imageClass: string;
};

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  video: string;
  thumbnail: string | null;
  logo: SlideLogo | null;
};

type PauseReason = "visibility" | "hover" | "focus";

const CROSSFADE_DURATION = 1_800;

const slides: Slide[] = [
  {
    id: 1,
    title: "Create: Brassworks",
    subtitle: "Season 2",
    video: assetUrl("/videos/background.mp4"),
    thumbnail: null,
    logo: {
      source: assetUrl("/images/seasons/season2.png"),
      alt: "Brassworks Season 2",
      href: "https://modrinth.com/server/brassworks-smp-official-server",
      newTab: true,
      width: "min(560px, 70vw)",
      positionX: "50%",
      positionY: "45%",
      opacity: 1,
      linkClass: "hover:scale-105",
      imageClass: "[image-rendering:pixelated]",
    },
  },
  {
    id: 2,
    title: "Create: Brassworks",
    subtitle: "Season 2",
    video: assetUrl("/videos/background.mp4"),
    thumbnail: null,
    logo: {
      source: assetUrl("/images/seasons/season2.png"),
      alt: "Brassworks Season 2",
      href: "https://modrinth.com/server/brassworks-smp-official-server",
      newTab: true,
      width: "min(560px, 70vw)",
      positionX: "50%",
      positionY: "45%",
      opacity: 1,
      linkClass: "hover:scale-105",
      imageClass: "[image-rendering:pixelated]",
    },
  },
  {
    id: 3,
    title: "Create: Brassworks",
    subtitle: "Season 2",
    video: assetUrl("/videos/background.mp4"),
    thumbnail: null,
    logo: {
      source: assetUrl("/images/seasons/season2.png"),
      alt: "Brassworks Season 2",
      href: "https://modrinth.com/server/brassworks-smp-official-server",
      newTab: true,
      width: "min(560px, 70vw)",
      positionX: "50%",
      positionY: "45%",
      opacity: 1,
      linkClass: "hover:scale-105",
      imageClass: "[image-rendering:pixelated]",
    },
  },
  {
    id: 4,
    title: "Create: Brassworks",
    subtitle: "Season 2",
    video: assetUrl("/videos/background.mp4"),
    thumbnail: null,
    logo: {
      source: assetUrl("/images/seasons/season2.png"),
      alt: "Brassworks Season 2",
      href: "https://modrinth.com/server/brassworks-smp-official-server",
      newTab: true,
      width: "min(560px, 70vw)",
      positionX: "50%",
      positionY: "45%",
      opacity: 1,
      linkClass: "hover:scale-105",
      imageClass: "[image-rendering:pixelated]",
    },
  },
  {
    id: 5,
    title: "Create: Brassworks",
    subtitle: "Season 2",
    video: assetUrl("/videos/background.mp4"),
    thumbnail: null,
    logo: {
      source: assetUrl("/images/seasons/season2.png"),
      alt: "Brassworks Season 2",
      href: "https://modrinth.com/server/brassworks-smp-official-server",
      newTab: true,
      width: "min(560px, 70vw)",
      positionX: "50%",
      positionY: "45%",
      opacity: 1,
      linkClass: "hover:scale-105",
      imageClass: "[image-rendering:pixelated]",
    },
  },
];

const activeIndex = ref(0);
const progress = ref(0);
const videoElements = ref<HTMLVideoElement[]>([]);

const pauseReasons = new Set<PauseReason>();

let frameId = 0;
let transitionTimer: number | undefined;
let switchToken = 0;
let pendingIndex = 0;

const activeSlide = computed(() => slides[activeIndex.value]);

function setVideoRef(
    element: Element | ComponentPublicInstance | null,
    index: number,
): void {
  if (element instanceof HTMLVideoElement) {
    videoElements.value[index] = element;
  }
}

function waitUntilReady(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = (): void => {
      video.removeEventListener("canplay", finish);
      video.removeEventListener("error", finish);
      video.removeEventListener("abort", finish);
      resolve();
    };

    video.addEventListener("canplay", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.addEventListener("abort", finish, { once: true });
  });
}

function pauseAllVideos(): void {
  videoElements.value.forEach((video) => {
    video.pause();
  });
}

async function resumeActiveVideo(): Promise<void> {
  if (pauseReasons.size > 0 || document.hidden) return;

  const video = videoElements.value[activeIndex.value];

  if (!video) return;

  await waitUntilReady(video);

  if (pauseReasons.size > 0 || document.hidden) return;

  try {
    await video.play();
  } catch {
    return;
  }
}

function pauseCarousel(reason: PauseReason): void {
  pauseReasons.add(reason);
  pauseAllVideos();
}

function resumeCarousel(reason: PauseReason): void {
  pauseReasons.delete(reason);

  if (pauseReasons.size === 0) {
    void resumeActiveVideo();
  }
}

async function startVideo(index: number): Promise<void> {
  const video = videoElements.value[index];

  if (!video) return;

  await waitUntilReady(video);

  video.currentTime = 0;

  if (pauseReasons.size > 0 || document.hidden) return;

  try {
    await video.play();
  } catch {
    return;
  }
}

async function selectSlide(index: number): Promise<void> {
  const normalizedIndex =
      (index + slides.length) % slides.length;

  const token = ++switchToken;

  pendingIndex = normalizedIndex;
  progress.value = 0;

  await startVideo(normalizedIndex);

  if (token !== switchToken) {
    if (pendingIndex !== normalizedIndex) {
      videoElements.value[normalizedIndex]?.pause();
    }

    return;
  }

  activeIndex.value = normalizedIndex;

  window.clearTimeout(transitionTimer);

  transitionTimer = window.setTimeout(() => {
    videoElements.value.forEach((video, videoIndex) => {
      if (videoIndex !== activeIndex.value) {
        video.pause();
      }
    });
  }, CROSSFADE_DURATION);
}

function nextSlide(): void {
  void selectSlide(activeIndex.value + 1);
}

function handleVideoEnded(index: number): void {
  if (
      index !== activeIndex.value ||
      pauseReasons.size > 0 ||
      document.hidden
  ) {
    return;
  }

  nextSlide();
}

function tick(): void {
  const activeVideo = videoElements.value[activeIndex.value];

  if (
      activeVideo &&
      Number.isFinite(activeVideo.duration) &&
      activeVideo.duration > 0
  ) {
    progress.value = Math.min(
        (activeVideo.currentTime / activeVideo.duration) * 100,
        100,
    );
  }

  frameId = window.requestAnimationFrame(tick);
}

function handleVisibilityChange(): void {
  if (document.hidden) {
    pauseCarousel("visibility");
    window.clearTimeout(transitionTimer);
    return;
  }

  resumeCarousel("visibility");
}

function handlePageHide(): void {
  pauseCarousel("visibility");
  window.clearTimeout(transitionTimer);
}

function handlePageShow(): void {
  if (!document.hidden) {
    resumeCarousel("visibility");
  }
}

function handleFocusOut(event: FocusEvent): void {
  const currentTarget = event.currentTarget;
  const nextTarget = event.relatedTarget;

  if (
      currentTarget instanceof HTMLElement &&
      nextTarget instanceof Node &&
      currentTarget.contains(nextTarget)
  ) {
    return;
  }

  resumeCarousel("focus");
}

onMounted(() => {
  pendingIndex = activeIndex.value;

  videoElements.value.forEach((video, index) => {
    if (index !== activeIndex.value) {
      video.pause();
    }
  });

  if (document.hidden) {
    pauseCarousel("visibility");
  } else {
    void startVideo(activeIndex.value);
  }

  frameId = window.requestAnimationFrame(tick);

  document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
  );

  window.addEventListener("pagehide", handlePageHide);
  window.addEventListener("pageshow", handlePageShow);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frameId);
  window.clearTimeout(transitionTimer);
  pauseAllVideos();

  document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange,
  );

  window.removeEventListener("pagehide", handlePageHide);
  window.removeEventListener("pageshow", handlePageShow);
});
</script>

<template>
  <section
      id="create"
      class="relative min-h-svh overflow-hidden bg-[#171614] text-white"
      aria-roledescription="carousel"
      aria-label="Featured Brassworks creations"
      @focusin="pauseCarousel('focus')"
      @focusout="handleFocusOut"
  >
    <div class="absolute inset-[60px]">
      <div class="outer absolute inset-0">
        <video
            v-for="(slide, index) in slides"
            :key="slide.id"
            :ref="(element) => setVideoRef(element, index)"
            class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity]"
            :class="
            activeIndex === index
              ? 'z-[1] opacity-100'
              : 'pointer-events-none z-0 opacity-0'
          "
            muted
            playsinline
            preload="auto"
            :aria-hidden="activeIndex !== index"
            :aria-label="
            activeIndex === index
              ? `${slide.title}, ${slide.subtitle}`
              : undefined
          "
            @ended="handleVideoEnded(index)"
        >
          <source :src="slide.video" type="video/mp4" />
        </video>

        <div
            class="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,9,8,0.28)_0%,rgba(10,9,8,0.02)_42%,rgba(10,9,8,0.92)_100%)]"
            aria-hidden="true"
        ></div>

        <div
            v-if="activeSlide.logo"
            class="pointer-events-none absolute inset-0 z-[3]"
        >
          <a
              :key="activeSlide.id"
              :href="activeSlide.logo.href"
              :target="activeSlide.logo.newTab ? '_blank' : '_self'"
              :rel="
              activeSlide.logo.newTab
                ? 'noopener noreferrer'
                : undefined
            "
              :class="[
              'pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out',
              activeSlide.logo.linkClass,
            ]"
              :style="{
              width: activeSlide.logo.width,
              left: activeSlide.logo.positionX,
              top: activeSlide.logo.positionY,
              opacity: activeSlide.logo.opacity,
            }"
          >
            <img
                :src="activeSlide.logo.source"
                :alt="activeSlide.logo.alt"
                :class="[
                'h-auto w-full select-none object-contain',
                activeSlide.logo.imageClass,
              ]"
                draggable="false"
            />
          </a>
        </div>

        <div
            class="relative z-10 mx-auto flex h-full w-[calc(100%_-_2rem)] max-w-[1600px] flex-col justify-end pb-[40px] pt-[82px] sm:w-[calc(100%_-_3rem)] lg:w-[calc(100%_-_6rem)]"
        >
          <div
              class="flex w-full justify-center overflow-x-auto pb-1 [scrollbar-color:#7d693f_transparent]"
              @mouseenter="pauseCarousel('hover')"
              @mouseleave="resumeCarousel('hover')"
          >
            <div
                class="mx-auto grid w-full min-w-[1200px] max-w-[1450px] grid-cols-5 gap-4"
                role="tablist"
                aria-label="Select a creation"
            >
              <button
                  v-for="(slide, index) in slides"
                  :key="slide.id"
                  type="button"
                  role="tab"
                  :aria-selected="activeIndex === index"
                  :aria-label="`Show ${slide.title}, item ${index + 1} of ${slides.length}`"
                  class="relative grid h-[68px] min-w-0 grid-cols-[65px_minmax(0,1fr)] items-center gap-3 overflow-hidden rounded-md border-[1.5px] bg-transparent p-1.5 text-left transition-colors"
                  :class="
                  activeIndex === index
                    ? 'border-[#d9b86e]'
                    : 'border-white/30 hover:border-white/70'
                "
                  @click="selectSlide(index)"
              >
                <span
                    class="pointer-events-none absolute inset-0 z-0"
                    aria-hidden="true"
                >
                  <span
                      class="block h-full bg-[#c7a35a]/50 transition-[width] duration-75 ease-linear"
                      :style="{
                      width:
                        activeIndex === index
                          ? `${progress}%`
                          : '0%',
                    }"
                  ></span>
                </span>

                <span
                    class="relative z-10 block h-[54px] w-[65px] overflow-hidden rounded-lg"
                >
                  <img
                      v-if="slide.thumbnail"
                      :src="slide.thumbnail"
                      :alt="`${slide.title} preview`"
                      class="h-full w-full object-cover"
                      draggable="false"
                  />

                  <video
                      v-else
                      class="h-full w-full object-cover"
                      muted
                      playsinline
                      preload="metadata"
                      aria-hidden="true"
                  >
                    <source
                        :src="slide.video"
                        type="video/mp4"
                    />
                  </video>
                </span>

                <span class="relative z-10 min-w-0">
                  <strong
                      class="block truncate font-minecraft text-sm"
                  >
                    {{ slide.title }}
                  </strong>

                  <small
                      class="mt-1 block truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#d9b86e]"
                  >
                    {{ slide.subtitle }}
                  </small>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <a
          href="https://modrinth.com/server/brassworks-smp-official-server"
          target="_blank"
          rel="noopener noreferrer"
          class="see-more-button group absolute bottom-[5px] right-[5px] z-30 flex h-[55px] w-[233px] items-center justify-center px-8 text-base font-bold uppercase tracking-wide text-[#171614]"
      >
        <svg
            class="absolute inset-0 h-full w-full"
            viewBox="0 0 340 80"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
          <defs>
            <clipPath id="see-more-shape">
              <path
                  d="
        M 25 0
        H 332
        Q 340 0 340 8
        V 44
        Q 340 49 336 53
        L 311 76
        Q 307 80 301 80
        H 8
        Q 0 80 0 72
        V 25
        Q 0 0 25 0
        Z
      "
              />
            </clipPath>
          </defs>

          <path
              fill="#c7a35a"
              d="
    M 25 0
    H 332
    Q 340 0 340 8
    V 44
    Q 340 49 336 53
    L 311 76
    Q 307 80 301 80
    H 8
    Q 0 80 0 72
    V 25
    Q 0 0 25 0
    Z
  "
          />

          <g clip-path="url(#see-more-shape)">
            <polygon
                class="see-more-wipe"
                points="-1200,-180 -160,-180 -420,160 -1200,160"
                fill="#dec17c"
            />
          </g>
        </svg>

        <span class="relative z-10">See more</span>
      </a>
    </div>
  </section>
</template>