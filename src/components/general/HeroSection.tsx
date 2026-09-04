import { useCallback, useEffect, useRef, useState } from "react";
import { useHeroSlides } from "../../features/hero/use-hero-slides";

type PauseReason = "visibility";

const CROSSFADE_DURATION = 1_800;

function waitUntilReady(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
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

export function HeroSection() {
  const { data: slides = [], isPending, isError } = useHeroSlides();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeIndexRef = useRef(0);
  const videoElements = useRef<Array<HTMLVideoElement | null>>([]);
  const pauseReasons = useRef(new Set<PauseReason>());
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchToken = useRef(0);
  const pendingIndex = useRef(0);
  const mounted = useRef(false);

  const pauseAllVideos = useCallback(() => {
    videoElements.current.forEach((video) => video?.pause());
  }, []);

  const startVideo = useCallback(async (index: number) => {
    const video = videoElements.current[index];

    if (!video) return;

    await waitUntilReady(video);

    if (!mounted.current) return;

    video.currentTime = 0;

    if (pauseReasons.current.size > 0 || document.hidden) return;

    try {
      await video.play();
    } catch {}
  }, []);

  const resumeActiveVideo = useCallback(async () => {
    if (pauseReasons.current.size > 0 || document.hidden) return;

    const video = videoElements.current[activeIndexRef.current];

    if (!video) return;

    await waitUntilReady(video);

    if (!mounted.current || pauseReasons.current.size > 0) return;

    try {
      await video.play();
    } catch {}
  }, []);

  const pauseCarousel = useCallback(
    (reason: PauseReason) => {
      pauseReasons.current.add(reason);
      pauseAllVideos();
    },
    [pauseAllVideos],
  );

  const resumeCarousel = useCallback(
    (reason: PauseReason) => {
      pauseReasons.current.delete(reason);

      if (pauseReasons.current.size === 0) {
        void resumeActiveVideo();
      }
    },
    [resumeActiveVideo],
  );

  const selectSlide = useCallback(
    async (index: number) => {
      if (slides.length === 0) return;

      const normalizedIndex = (index + slides.length) % slides.length;
      const token = ++switchToken.current;

      pendingIndex.current = normalizedIndex;
      setProgress(0);

      await startVideo(normalizedIndex);

      if (!mounted.current) return;

      if (token !== switchToken.current) {
        if (pendingIndex.current !== normalizedIndex) {
          videoElements.current[normalizedIndex]?.pause();
        }

        return;
      }

      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);

      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = setTimeout(() => {
        videoElements.current.forEach((video, videoIndex) => {
          if (videoIndex !== activeIndexRef.current) {
            video?.pause();
          }
        });
      }, CROSSFADE_DURATION);
    },
    [slides.length, startVideo],
  );

  useEffect(() => {
    if (activeIndex >= slides.length) {
      activeIndexRef.current = 0;
      pendingIndex.current = 0;
      setActiveIndex(0);
      setProgress(0);
    }
  }, [activeIndex, slides.length]);

  useEffect(() => {
    mounted.current = true;
    pendingIndex.current = activeIndexRef.current;

    videoElements.current.forEach((video, index) => {
      if (index !== activeIndexRef.current) {
        video?.pause();
      }
    });

    if (document.hidden) {
      pauseCarousel("visibility");
    } else {
      void startVideo(activeIndexRef.current);
    }

    let frameId = 0;

    const tick = () => {
      const activeVideo = videoElements.current[activeIndexRef.current];

      if (
        activeVideo &&
        Number.isFinite(activeVideo.duration) &&
        activeVideo.duration > 0
      ) {
        setProgress(
          Math.min((activeVideo.currentTime / activeVideo.duration) * 100, 100),
        );
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseCarousel("visibility");

        if (transitionTimer.current) {
          clearTimeout(transitionTimer.current);
        }

        return;
      }

      resumeCarousel("visibility");
    };

    const handlePageHide = () => {
      pauseCarousel("visibility");

      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };

    const handlePageShow = () => {
      if (!document.hidden) {
        resumeCarousel("visibility");
      }
    };

    frameId = window.requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      mounted.current = false;
      window.cancelAnimationFrame(frameId);

      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }

      pauseAllVideos();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [
    pauseAllVideos,
    pauseCarousel,
    resumeCarousel,
    slides.length,
    startVideo,
  ]);

  if (isPending || isError || slides.length === 0) return null;

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <section
      id="create"
      className="relative h-[72svh] min-h-[500px] max-h-[620px] overflow-hidden bg-[#171614] text-white md:h-auto md:min-h-svh md:max-h-none"
      aria-roledescription="carousel"
      aria-label="Featured Brassworks creations"
    >
      <div className="absolute inset-x-3 bottom-3 top-[70px] md:inset-[60px]">
        <div className="outer absolute inset-0 overflow-hidden !rounded-[18px] md:!rounded-[24px]">
          {slides.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <video
                key={slide.id}
                ref={(element) => {
                  videoElements.current[index] = element;
                }}
                className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity] ${
                  isActive
                    ? "z-[1] opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
                muted
                playsInline
                preload={isActive ? "auto" : "metadata"}
                aria-hidden={!isActive}
                aria-label={
                  isActive ? `${slide.title}, ${slide.subtitle}` : undefined
                }
                onEnded={() => {
                  if (
                    index === activeIndexRef.current &&
                    pauseReasons.current.size === 0 &&
                    !document.hidden
                  ) {
                    void selectSlide(index + 1);
                  }
                }}
              >
                <source src={slide.video} type="video/mp4"/>
              </video>
            );
          })}

          {activeSlide.logo ? (
            <div className="pointer-events-none absolute inset-0 z-[3] flex -translate-y-8 items-center justify-center p-8 md:-translate-y-10 md:p-16">
              <a
                key={activeSlide.id}
                href={activeSlide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex h-[clamp(140px,20vh,200px)] w-[min(580px,64vw)] cursor-pointer items-center justify-center transition-transform duration-300 ease-out hover:scale-105"
              >
                <img
                  src={activeSlide.logo.source}
                  alt={activeSlide.logo.alt}
                  className="h-full w-full select-none object-contain [image-rendering:pixelated]"
                  draggable="false"
                  decoding="async"
                />
              </a>
            </div>
          ) : null}

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end px-3 pb-3 pt-16 md:w-[calc(100%_-_3rem)] md:px-0 md:pb-[40px] md:pt-[82px] lg:w-[calc(100%_-_6rem)]">
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 hidden h-[160px] w-[calc(100%_+_10rem)] max-w-[1760px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,9,8,0.7)_0%,rgba(10,9,8,0.42)_38%,rgba(10,9,8,0.16)_58%,transparent_78%)] blur-xl md:block"
              aria-hidden="true"
            />
            <div className="relative z-10 hidden w-full justify-start overflow-x-auto overscroll-x-contain py-3 [scrollbar-color:#7d693f_transparent] md:flex lg:py-4 2xl:justify-center">
              <div
                className="ml-0 grid w-[1100px] min-w-[1100px] grid-cols-5 gap-3 2xl:mx-auto 2xl:w-full 2xl:min-w-0 2xl:max-w-[1450px] 2xl:gap-4"
                role="tablist"
                aria-label="Select a creation"
              >
                {slides.map((slide, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show ${slide.title}, item ${index + 1} of ${slides.length}`}
                      className={`relative grid h-[62px] min-w-0 cursor-pointer grid-cols-[52px_minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-md border-[1.5px] bg-transparent p-1.5 text-left transition-colors md:h-[68px] md:grid-cols-[65px_minmax(0,1fr)] md:gap-3 ${
                        isActive
                          ? "border-[#d9b86e]"
                          : "border-white/30 hover:border-white/70"
                      }`}
                      onClick={() => void selectSlide(index)}
                    >
                      <span
                        className="pointer-events-none absolute inset-0 z-0"
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full bg-[#c7a35a]/50 transition-[width] duration-75 ease-linear"
                          style={{ width: isActive ? `${progress}%` : "0%" }}
                        />
                      </span>

                      <span className="relative z-10 block h-[48px] w-[52px] overflow-hidden rounded-md md:h-[54px] md:w-[65px] md:rounded-lg">
                        {slide.thumbnail ? (
                          <img
                            src={slide.thumbnail}
                            alt={`${slide.title} preview`}
                            className="h-full w-full object-cover"
                            draggable="false"
                            decoding="async"
                          />
                        ) : (
                          <video
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                          >
                            <source src={slide.video} type="video/mp4"/>
                          </video>
                        )}
                      </span>

                      <span className="relative z-10 min-w-0">
                        <strong className="font-minecraft block truncate text-sm">
                          {slide.title}
                        </strong>
                        <small className="mt-1 block truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#d9b86e]">
                          {slide.subtitle}
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <a
          href={activeSlide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/button absolute bottom-2 right-2 z-30 inline-flex h-11 w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#171614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c] md:bottom-[5px] md:right-[5px] md:h-[52px] md:w-auto md:min-w-[230px] md:px-7 md:text-sm"
        >
          <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0"/>
          <span className="relative z-10">See more</span>
        </a>
      </div>
    </section>
  );
}
