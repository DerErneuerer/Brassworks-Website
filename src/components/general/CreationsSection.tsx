import { type FocusEvent, useEffect, useRef } from "react";
import { LockKeyhole } from "lucide-react";
import { assetUrl } from "../../lib/assets.js";

const SERVER_URL = "https://modrinth.com/server/brassworks-smp-official-server";
const LAUNCHER_URL = "/launcher";
const UPCOMING_URL = "/modpacks";
const PREVIEW_TRANSITION = 500;
const VIDEO_URL = assetUrl("/videos/background.mp4");
const COVER_URL = assetUrl("/images/modpacks/create-brassworks-cover.png");
const UPCOMING_COVER_URL = assetUrl(
    "/images/modpacks/upcoming-modpack-cover.png",
);

function ModpackCard() {
    const previewRef = useRef<HTMLVideoElement | null>(null);
    const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startPreview = () => {
        if (stopTimer.current) {
            clearTimeout(stopTimer.current);
            stopTimer.current = null;
        }

        const preview = previewRef.current;

        if (!preview) return;

        void preview.play().catch(() => {});
    };

    const stopPreview = () => {
        if (stopTimer.current) {
            clearTimeout(stopTimer.current);
        }

        stopTimer.current = setTimeout(() => {
            const preview = previewRef.current;

            if (!preview) return;

            preview.pause();
        }, PREVIEW_TRANSITION);
    };

    const handleBlur = (event: FocusEvent<HTMLElement>) => {
        const nextTarget = event.relatedTarget;

        if (
            nextTarget instanceof Node &&
            event.currentTarget.contains(nextTarget)
        ) {
            return;
        }

        stopPreview();
    };

    useEffect(() => {
        return () => {
            if (stopTimer.current) {
                clearTimeout(stopTimer.current);
            }

            previewRef.current?.pause();
        };
    }, []);

    return (
        <article
            className="group relative isolate block min-h-[450px] overflow-hidden rounded-xl border-2 border-transparent bg-[#211f1b] outline-none transition-colors duration-500 ease-out hover:border-[#d9b86e] focus-within:border-[#d9b86e] sm:min-h-[490px]"
            onMouseEnter={startPreview}
            onMouseLeave={stopPreview}
            onFocus={startPreview}
            onBlur={handleBlur}
        >
            <img
                src={COVER_URL}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable="false"
            />

            <video
                ref={previewRef}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
            >
                <source src={VIDEO_URL} type="video/mp4" />
            </video>

            <a
                href={SERVER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-[5] outline-none"
                aria-label="Open Create: Brassworks"
            />

            <span className="pointer-events-none absolute left-5 top-5 z-20 rounded-md bg-[#c7a35a] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#171614] sm:left-6 sm:top-6">
        Play Now
      </span>

            <div className="pointer-events-none absolute inset-x-6 bottom-7 z-10 text-center [text-shadow:0_2px_8px_rgba(0,0,0,0.65)] sm:inset-x-10 sm:bottom-9">
                <img
                    src={assetUrl("/images/modpacks/create-brassworks-logo.png")}
                    alt="Create: Brassworks"
                    className="mx-auto h-auto w-[min(450px,88%)] -translate-y-10 select-none object-contain [image-rendering:pixelated]"
                    draggable="false"
                />

                <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-white/90 sm:text-[15px]">
                    Build ambitious factories, explore a shared world, and shape an
                    evolving Create experience together.
                </p>

                <div className="pointer-events-auto relative z-20 mt-5 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={SERVER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button relative inline-flex min-h-10 items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#171614] [text-shadow:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c]"
                    >
                        <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                        <span className="relative z-10">Play Now</span>
                    </a>
                    <a
                        href={SERVER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button relative inline-flex min-h-10 items-center justify-center overflow-hidden rounded-lg bg-[#211f1b] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white [text-shadow:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c]"
                    >
                        <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#d9b86e] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                        <span className="relative z-10 transition-colors duration-300 group-hover/button:text-[#171614]">
              Learn More
            </span>
                    </a>
                </div>
            </div>
        </article>
    );
}

function UpcomingCard() {
    return (
        <article className="group relative isolate flex min-h-[450px] overflow-hidden rounded-xl border-2 border-transparent bg-[#14202b] outline-none transition-[background-color,border-color] duration-500 ease-out hover:border-[#79c4ff] hover:bg-[#182a3a] focus-within:border-[#79c4ff] sm:min-h-[490px]">
            <img
                src={UPCOMING_COVER_URL}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-100"
                draggable="false"
            />

            <a
                href={UPCOMING_URL}
                className="absolute inset-0 z-[5] outline-none"
                aria-label="Open upcoming modpack"
            />

            <span className="pointer-events-none absolute left-5 top-5 z-20 rounded-md bg-[#2f78c4] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white sm:left-6 sm:top-6">
        In Development
      </span>

            <div className="pointer-events-none absolute inset-x-6 bottom-7 z-10 text-center [text-shadow:0_2px_8px_rgba(0,0,0,0.65)] sm:inset-x-10 sm:bottom-9">
                <LockKeyhole
                    className="mx-auto mb-20 h-14 w-14 text-[#eaf6ff]"
                    strokeWidth={1.4}
                />

                <p className="mx-auto mt-7 max-w-xl text-sm font-semibold leading-6 text-white/90 sm:text-[15px]">
                    Something new is taking shape behind closed doors. More will be
                    revealed when it is ready.
                </p>

                <a
                    href={UPCOMING_URL}
                    className="group/button pointer-events-auto relative z-20 mt-5 inline-flex min-h-10 items-center justify-center overflow-hidden rounded-lg bg-[#2f78c4] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white [text-shadow:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ed7ff]"
                >
                    <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#eaf6ff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                    <span className="relative z-10 transition-colors duration-300 group-hover/button:text-[#15324d]">
            Stay Tuned
          </span>
                </a>
            </div>
        </article>
    );
}

export function CreationsSection() {
    return (
        <section
            id="creations"
            className="bg-[#171614] px-4 pb-16 text-white sm:px-8 lg:px-[60px]"
        >
            <div className="mx-auto max-w-[1600px]">
                <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <h2 className="font-minecraft text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Our Creations
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/65 sm:text-base sm:leading-7">
                        Handcrafted modpacks, ready when you are - with installs and updates
                        made simple through our{" "}
                        <a
                            href={LAUNCHER_URL}
                            className="text-[#d9b86e] underline decoration-[#d9b86e]/45 underline-offset-4 transition-colors hover:text-[#dec17c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c]"
                        >
                            launcher
                        </a>
                        .
                    </p>
                </header>

                <div className="grid gap-5 lg:grid-cols-2">
                    <ModpackCard />
                    <UpcomingCard />
                </div>
            </div>
        </section>
    );
}
