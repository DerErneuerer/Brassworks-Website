import { useState } from "react";
import { assetUrl } from "../../lib/assets.js";

const ORGANIZATION_URL = "https://modrinth.com/organization/brassworks";
const MOD_OFFSET_VALUES = [-5, -4, -3, -2, 2, 3, 4, 5];

const featuredMods = [
    {
        name: "Create: Tradeworks",
        href: "https://modrinth.com/mod/tradeworks",
        icon: "https://cdn.modrinth.com/data/gnOpd0sq/4f3a6fe922cd2a7f8dc0b4efbf39c09ef8141b43_96.webp",
    },
    {
        name: "Create: Brassworks Missions",
        href: "https://modrinth.com/mod/create-brassworks-missions",
        icon: "https://cdn.modrinth.com/data/uUhZpyjI/8762b39e48f9b6233e1defd1348ba9ab7ad38131_96.webp",
    },
    {
        name: "Create: Repackaged",
        href: "https://modrinth.com/mod/repackaged",
        icon: "https://cdn.modrinth.com/data/D6daOdv9/b73a4655441a5e038166a80df266bb4415ddc32d_96.webp",
    },
    {
        name: "Create: Blueprinted",
        href: "https://modrinth.com/mod/create-blueprinted",
        icon: "https://cdn.modrinth.com/data/nJM6buSc/6b405d31775693b412d6f6f7d0480efecab956a5_96.webp",
    },
    {
        name: "Create: Stuff 'N Additions - Tank Fix",
        href: "https://modrinth.com/mod/create-stuff-and-addition-tank-fix",
        icon: "https://cdn.modrinth.com/data/LANuxfjR/feda5fa2a67b08b0052fef77785740fde4dfb7d9_96.webp",
    },
] as const;

function createModOffsets(previous: readonly number[] = []) {
    for (let attempt = 0; attempt < 32; attempt += 1) {
        const offsets = [...MOD_OFFSET_VALUES];

        for (let index = offsets.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [offsets[index], offsets[randomIndex]] = [
                offsets[randomIndex],
                offsets[index],
            ];
        }

        const selection = offsets.slice(0, featuredMods.length * 2);

        if (
            previous.length !== selection.length ||
            selection.every((offset, index) => offset !== previous[index])
        ) {
            return selection;
        }
    }

    return [...MOD_OFFSET_VALUES].slice(0, featuredMods.length * 2);
}

export function ModsSection() {
    const [modOffsets, setModOffsets] = useState([-7, 4, -5, 8, 6, -3, 5, -8]);

    return (
        <section
            id="mods"
            className="bg-[#171614] px-4 pb-14 text-white sm:px-8 sm:pb-16 lg:px-[60px] lg:pb-20"
        >
            <style>{`
        @keyframes brassworks-mod-carousel {
          from {
            transform: translateX(
              calc(-50% - var(--carousel-gap-half))
            );
          }

          to {
            transform: translateX(0);
          }
        }
      `}</style>

            <div className="mx-auto max-w-[1600px]">
                <div
                    className="group/banner relative isolate grid min-h-[250px] cursor-pointer overflow-hidden rounded-xl border-2 border-transparent bg-[#211f1b] transition-colors duration-500 ease-out hover:border-[#d9b86e] focus-within:border-[#d9b86e] md:grid-cols-[minmax(0,1fr)_auto]"
                    onMouseEnter={() => {
                        setModOffsets((current) => createModOffsets(current));
                    }}
                >
                    <img
                        src={assetUrl("/images/our-mods-cover.png")}
                        alt=""
                        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(90deg, #000 0%, #000 48%, transparent 100%)",
                            maskImage:
                                "linear-gradient(90deg, #000 0%, #000 48%, transparent 100%)",
                        }}
                        draggable="false"
                        aria-hidden="true"
                    />

                    <a
                        href={ORGANIZATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-[5] outline-none"
                        aria-label="Explore all Brassworks mods on Modrinth"
                    />

                    <div className="pointer-events-none relative z-10 flex max-w-2xl flex-col justify-center px-7 py-10 sm:px-10 lg:px-12">
                        <h2 className="font-minecraft text-3xl font-bold leading-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.95)] sm:text-4xl">
                            Our Mods
                        </h2>
                        <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-white/75 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)] sm:text-base">
                            We build mods of every kind - from small quality-of-life ideas to
                            entirely new systems.
                        </p>

                        <a
                            href={ORGANIZATION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/button pointer-events-auto relative z-20 mt-6 inline-flex min-h-11 w-fit items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#171614] [text-shadow:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c]"
                        >
                            <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                            <span className="relative z-10">Explore All Mods</span>
                        </a>
                    </div>

                    <div className="pointer-events-none relative z-10 flex items-center justify-center px-7 pb-9 sm:px-10 md:justify-end md:py-8 md:pl-4 lg:pr-14">
                        <div
                            className="w-[232px] overflow-hidden py-5 [--carousel-gap-half:0.5rem] [--carousel-gap:1rem] sm:w-[380px] sm:[--carousel-gap-half:0.75rem] sm:[--carousel-gap:1.5rem] md:w-[400px] lg:w-[520px] lg:[--carousel-gap-half:1rem] lg:[--carousel-gap:2rem] xl:w-[640px] 2xl:w-[720px]"
                            style={{
                                WebkitMaskImage:
                                    "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 14%, rgba(0, 0, 0, 0.65) 28%, #000 40%, #000 60%, rgba(0, 0, 0, 0.65) 72%, rgba(0, 0, 0, 0.25) 86%, transparent 100%)",
                                maskImage:
                                    "linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 14%, rgba(0, 0, 0, 0.65) 28%, #000 40%, #000 60%, rgba(0, 0, 0, 0.65) 72%, rgba(0, 0, 0, 0.25) 86%, transparent 100%)",
                            }}
                        >
                            <div
                                className="flex w-max gap-[var(--carousel-gap)] [animation:brassworks-mod-carousel_18s_linear_infinite] [animation-play-state:paused] group-hover/banner:[animation-play-state:running] motion-reduce:[animation-play-state:paused]"
                                onAnimationIteration={() => {
                                    setModOffsets((current) => createModOffsets(current));
                                }}
                            >
                                {[true, false].map((isClone, copyIndex) => (
                                    <div
                                        key={copyIndex}
                                        className="flex shrink-0 gap-[var(--carousel-gap)]"
                                        aria-hidden={isClone || undefined}
                                    >
                                        {featuredMods.map((mod, modIndex) => (
                                            <a
                                                key={`${copyIndex}-${mod.href}`}
                                                href={mod.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                tabIndex={isClone ? -1 : undefined}
                                                className="group/mod pointer-events-auto relative z-20 flex h-[108px] w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#171614]/30 p-3 outline-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:h-[128px] sm:w-[128px] md:h-[138px] md:w-[138px] lg:h-[150px] lg:w-[150px]"
                                                style={{
                                                    transform: `translateY(${
                                                        modOffsets[
                                                        copyIndex * featuredMods.length + modIndex
                                                            ] ?? 0
                                                    }px)`,
                                                }}
                                                aria-label={`Open ${mod.name} on Modrinth`}
                                            >
                                                <img
                                                    src={mod.icon}
                                                    alt={isClone ? "" : mod.name}
                                                    className="h-full w-full select-none object-contain opacity-85 transition-opacity duration-500 ease-out group-hover/mod:opacity-100"
                                                    draggable="false"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
