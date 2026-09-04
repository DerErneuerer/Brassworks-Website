import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { Member } from "../../features/members/members.service";
import { useMembers } from "../../features/members/use-members";

const PROFILE_TRANSITION = 1150;
const AUTO_ADVANCE_DELAY = 8000;
const TEAM_MASK_STYLE = {
  "--outer-radius": "clamp(18px, 1.8vw, 30px)",
  "--pillar-y": "clamp(18px, 1.8vw, 26px)",
  "--big-circle-radius": "clamp(20px, 1.8vw, 28px)",
  "--circle-radius": "clamp(20px, 1.8vw, 28px)",
} as CSSProperties;

type TeamMember = Member & {
  background: string;
  head: string;
  skin: string;
};

function isTeamMember(member: Member): member is TeamMember {
  return Boolean(
    member.showOnTeam && member.background && member.head && member.skin,
  );
}

export function TeamSection() {
  const { data: cmsMembers = [], isPending } = useMembers();
  const members = cmsMembers.filter(isTeamMember);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedMember = members[selectedIndex] ?? members[0];
  const previousMember =
    previousIndex === null ? null : members[previousIndex] ?? null;

  const selectMember = useCallback(
    (index: number) => {
      if (index === selectedIndex || !members[index]) return;

      if (transitionTimer.current) clearTimeout(transitionTimer.current);

      setPreviousIndex(selectedIndex);
      setSelectedIndex(index);

      transitionTimer.current = setTimeout(() => {
        setPreviousIndex(null);
        transitionTimer.current = null;
      }, PROFILE_TRANSITION);
    },
    [members, selectedIndex],
  );

  useEffect(() => {
    if (selectedIndex >= members.length) {
      setSelectedIndex(0);
      setPreviousIndex(null);
    }
  }, [members.length, selectedIndex]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsOnScreen(entry.isIntersecting),
            { threshold: 0.25 },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [isPending, members.length]);

  useEffect(() => {
    if (!isOnScreen || members.length < 2) return;

    const interval = setInterval(() => {
      selectMember((selectedIndex + 1) % members.length);
    }, AUTO_ADVANCE_DELAY);

    return () => clearInterval(interval);
  }, [isOnScreen, members.length, selectMember, selectedIndex]);

  if (isPending || !selectedMember) return null;

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
          Meet the people building Brassworks, shaping our projects, and keeping the community moving forward.
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
                className="pointer-events-none absolute inset-0 h-full w-full animate-[team-background-out_1150ms_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
                src={previousMember.background}
                alt=""
                draggable="false"
                decoding="async"
              />
            ) : null}

            <img
              key={`background-${selectedMember.id}`}
              className="pointer-events-none absolute inset-0 h-full w-full animate-[team-background-in_1150ms_cubic-bezier(0.22,1,0.36,1)_both] object-cover"
              src={selectedMember.background}
              alt=""
              draggable="false"
              decoding="async"
            />

            <div className="pointer-events-none absolute inset-0 bg-[#0d0c0b]/55"/>

            {previousMember ? (
              <div
                key={`skin-${previousMember.id}`}
                className="pointer-events-none absolute bottom-0 left-[2%] z-[1] h-[66%] w-[48%] animate-[team-skin-out_1150ms_cubic-bezier(0.22,1,0.36,1)_both] sm:h-[76%] lg:left-[5%] lg:h-[92%] lg:w-[42%]"
              >
                <img
                  src={previousMember.skin}
                  alt=""
                  className="h-full w-full select-none object-contain object-bottom [image-rendering:pixelated]"
                  draggable="false"
                  decoding="async"
                />
              </div>
            ) : null}

            <div
              key={`skin-${selectedMember.id}`}
              className="pointer-events-none absolute bottom-0 left-[2%] z-[2] h-[66%] w-[48%] animate-[team-skin-in_1150ms_cubic-bezier(0.22,1,0.36,1)_both] sm:h-[76%] lg:left-[5%] lg:h-[92%] lg:w-[42%]"
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
                decoding="async"
              />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[430px] max-w-[1600px] items-center px-6 py-16 sm:min-h-[460px] sm:px-10 sm:py-20 lg:min-h-[470px] lg:px-16 lg:py-16 xl:px-24">
              <div
                key={`content-${selectedMember.id}`}
                className="ml-auto w-full animate-[team-content-in_750ms_cubic-bezier(0.22,1,0.36,1)_both] lg:w-[58%] xl:w-[55%]"
              >
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <h3 className="font-minecraft text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {selectedMember.name}
                  </h3>
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

                <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.45)] sm:text-base">
                  {selectedMember.description}
                </p>

                <div
                  className="mt-7 flex max-w-full items-center gap-2 overflow-x-auto pb-2 sm:gap-2.5"
                  role="group"
                  aria-label="Choose a team member"
                >
                  {members.map((member, index) => {
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={member.id}
                        type="button"
                        aria-label={`Show ${member.name}`}
                        aria-pressed={isSelected}
                        onClick={() => selectMember(index)}
                        className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md border-2 bg-[#211f1b] outline-none transition-[border-color,background-color,opacity] duration-300 sm:h-11 sm:w-11 ${
                          isSelected
                            ? "border-[#c7a35a] bg-[#c7a35a] opacity-100"
                            : "border-white/15 opacity-65 hover:border-white/55 hover:opacity-100"
                        }`}
                        style={isSelected ? { borderColor: member.accent } : undefined}
                      >
                        <img
                          src={member.head}
                          alt=""
                          className="h-full w-full object-cover [image-rendering:pixelated]"
                          draggable="false"
                          decoding="async"
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
