import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import { assetUrl } from "../../lib/assets.js";

type TeamMember = {
    id: string;
    name: string;
    role: string;
    entrySide: "left" | "right";
    description: string;
    background: string;
    head: string;
    skin: string;
    accent: string;
    accentText: string;
};

const PROFILE_TRANSITION = 950;
const AUTO_ADVANCE_DELAY = 9000;
const TEAM_MASK_STYLE = {
    "--outer-radius": "clamp(20px, 2vw, 34px)",
    "--pillar-y": "clamp(20px, 2vw, 28px)",
    "--big-circle-radius": "clamp(22px, 2vw, 30px)",
    "--circle-radius": "clamp(22px, 2vw, 30px)",
} as CSSProperties;

const TEAM_MEMBERS: TeamMember[] = [
    {
        id: "swzo",
        name: "swzo",
        role: "Owner",
        entrySide: "right",
        description:
            "I'm swzo. Most of my time goes into coding and figuring out how all the pieces of Brassworks should fit together. I'm big on clean APIs, reusable systems, and splitting huge ideas into focused projects - mostly because I'd rather build something solid once than untangle it five times later.",
        background: assetUrl("/images/team/swzo/background.png"),
        head: assetUrl("/images/team/swzo/head.png"),
        skin: assetUrl("/images/team/swzo/skin.png"),
        accent: "#d85151",
        accentText: "#fff7f7",
    },
    {
        id: "dererneuerer",
        name: "DerErneuerer",
        role: "Administrator",
        entrySide: "left",
        description:
            "Yoooo, I'm DerErneuerer, tho some call me der. I'm usually jumping between server management, code, and whatever Brassworks needs next. I like turning rough ideas into something real, digging around for solutions that actually work, and keeping the technical side running when a project grows far beyond the original plan.",
        background: assetUrl("/images/team/dererneuerer/background.png"),
        head: assetUrl("/images/team/dererneuerer/head.png"),
        skin: assetUrl("/images/team/dererneuerer/skin.png"),
        accent: "#e68a3f",
        accentText: "#171614",
    },
    {
        id: "horrorboi666",
        name: "Horrorboi666",
        role: "Lead Moderator",
        entrySide: "right",
        description:
            "Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666. Hi, I'm Horrorboi666.",
        background: assetUrl("/images/team/horrorboi666/background.png"),
        head: assetUrl("/images/team/horrorboi666/head.png"),
        skin: assetUrl("/images/team/horrorboi666/skin.png"),
        accent: "#57b77a",
        accentText: "#102219",
    },
];

export function TeamSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const [isOnScreen, setIsOnScreen] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const selectedMember = TEAM_MEMBERS[selectedIndex];
    const previousMember =
        previousIndex === null ? null : TEAM_MEMBERS[previousIndex];

    const selectMember = useCallback(
        (index: number) => {
            if (index === selectedIndex) return;

            if (transitionTimer.current) {
                clearTimeout(transitionTimer.current);
            }

            setPreviousIndex(selectedIndex);
            setSelectedIndex(index);

            transitionTimer.current = setTimeout(() => {
                setPreviousIndex(null);
                transitionTimer.current = null;
            }, PROFILE_TRANSITION);
        },
        [selectedIndex],
    );

    useEffect(() => {
        return () => {
            if (transitionTimer.current) {
                clearTimeout(transitionTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsOnScreen(entry.isIntersecting);
            },
            { threshold: 0.25 },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isOnScreen) return;

        const interval = setInterval(() => {
            selectMember((selectedIndex + 1) % TEAM_MEMBERS.length);
        }, AUTO_ADVANCE_DELAY);

        return () => {
            clearInterval(interval);
        };
    }, [isOnScreen, selectMember, selectedIndex]);

    return (
        <section
            ref={sectionRef}
            id="team"
            className="bg-[#171614] px-3 pb-10 text-white sm:px-6 sm:pb-16 lg:px-[60px] lg:pb-20"
        >
            <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                <h2 className="font-minecraft text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                    Our Team
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/65 sm:text-base sm:leading-7">
                    Meet the people building Brassworks, shaping our projects, and keeping
                    the community moving forward.
                </p>
            </header>

            <div className="w-full">
                <div
                    className="outer min-h-[430px] rotate-180 sm:min-h-[460px] lg:min-h-[470px]"
                    style={TEAM_MASK_STYLE}
                >
                    <div
                        className="outer relative isolate min-h-[430px] rotate-180 bg-[#211f1b] sm:min-h-[460px] lg:min-h-[470px]"
                        style={TEAM_MASK_STYLE}
                    >
                        {previousMember ? (
                            <img
                                key={`background-${previousMember.id}`}
                                className="pointer-events-none absolute inset-0 h-full w-full animate-[team-background-out_950ms_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
                                src={previousMember.background}
                                alt=""
                                draggable="false"
                            />
                        ) : null}

                        <img
                            key={`background-${selectedMember.id}`}
                            className="pointer-events-none absolute inset-0 h-full w-full animate-[team-background-in_950ms_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
                            src={selectedMember.background}
                            alt=""
                            draggable="false"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-[#0d0c0b]/55" />

                        {previousMember ? (
                            <div
                                key={`skin-${previousMember.id}`}
                                className="pointer-events-none absolute bottom-0 left-[2%] z-[1] h-[66%] w-[48%] animate-[team-skin-out_950ms_cubic-bezier(0.22,1,0.36,1)_both] sm:h-[76%] lg:left-[5%] lg:h-[92%] lg:w-[42%]"
                            >
                                <img
                                    src={previousMember.skin}
                                    alt=""
                                    className="h-full w-full select-none object-contain object-bottom [image-rendering:pixelated]"
                                    draggable="false"
                                />
                            </div>
                        ) : null}

                        <div
                            key={`skin-${selectedMember.id}`}
                            className="pointer-events-none absolute bottom-0 left-[2%] z-[2] h-[66%] w-[48%] animate-[team-skin-in_950ms_cubic-bezier(0.22,1,0.36,1)_both] sm:h-[76%] lg:left-[5%] lg:h-[92%] lg:w-[42%]"
                            style={
                                {
                                    "--team-skin-entry-x":
                                        selectedMember.entrySide === "left" ? "-24px" : "24px",
                                } as CSSProperties
                            }
                        >
                            <img
                                src={selectedMember.skin}
                                alt={`${selectedMember.name} Minecraft skin`}
                                className="h-full w-full select-none object-contain object-bottom opacity-45 [image-rendering:pixelated] sm:opacity-65 lg:opacity-100"
                                draggable="false"
                            />
                        </div>

                        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-[1600px] items-center px-6 py-16 sm:min-h-[460px] sm:px-10 sm:py-20 lg:min-h-[470px] lg:px-16 lg:py-16 xl:px-24">
                            <div
                                key={`content-${selectedMember.id}`}
                                className="ml-auto w-full animate-[team-content-in_650ms_cubic-bezier(0.22,1,0.36,1)_both] lg:w-[58%] xl:w-[55%]"
                            >
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                    <h2 className="font-minecraft text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                        {selectedMember.name}
                                    </h2>
                                    <span
                                        className="inline-flex min-h-8 items-center rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                                        style={{
                                            backgroundColor: selectedMember.accent,
                                            color: selectedMember.accentText,
                                        }}
                                    >
                    {selectedMember.role}
                  </span>
                                </div>

                                <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:text-base">
                                    {selectedMember.description}
                                </p>

                                <div
                                    className="mt-7 flex max-w-full items-center gap-2 overflow-x-auto pb-2 sm:gap-2.5"
                                    role="group"
                                    aria-label="Choose a team member"
                                >
                                    {TEAM_MEMBERS.map((member, index) => {
                                        const isSelected = index === selectedIndex;

                                        return (
                                            <button
                                                key={member.id}
                                                type="button"
                                                aria-label={`Show ${member.name}`}
                                                aria-pressed={isSelected}
                                                onClick={() => selectMember(index)}
                                                className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md border-2 bg-[#211f1b] outline-none transition-[border-color,background-color,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#dec17c] sm:h-11 sm:w-11 ${
                                                    isSelected
                                                        ? "border-[#c7a35a] bg-[#c7a35a] opacity-100"
                                                        : "border-white/15 opacity-65 hover:border-white/55 hover:opacity-100"
                                                }`}
                                                style={
                                                    isSelected
                                                        ? { borderColor: member.accent }
                                                        : undefined
                                                }
                                            >
                                                <img
                                                    src={member.head}
                                                    alt=""
                                                    className="h-full w-full object-cover [image-rendering:pixelated]"
                                                    draggable="false"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
