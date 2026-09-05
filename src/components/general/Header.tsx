import { ChevronDown, LockKeyhole, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHomepageAssets } from "../../features/homepage-assets/use-homepage-assets";
import { assetUrl } from "../../lib/assets.js";
import { ButtonWipe } from "./ButtonWipe";
import { SiteAnnouncement } from "./SiteAnnouncement";

const DISCORD_URL = "https://discord.gg/brassworks";
const GITHUB_URL = "https://github.com/Brassworks-smp";
const MODRINTH_URL = "https://modrinth.com/organization/brassworks";
const OBSIDIAN_SERVERS_URL = "https://obsidianservers.com/partner/brassworks-smp";
const SNOWGO_URL = "https://www.youtube.com/@snowy-go";
const YOUTUBE_URL = "https://www.youtube.com/@BrassworksSMP";
const SERVER_URL = "https://modrinth.com/server/brassworks-smp-official-server";

type ModpackMenuItem = {
  id: string;
  title: string;
  description: string;
  tag: string;
  cover: string;
  logo: string | null;
  href: string;
  blue: boolean;
};

type CommunityMenuItem = {
  label: string;
  description: string;
  href: string;
};

const navigation = [
    { label: "Finances", href: "/finances" },
    { label: "News", href: "/news" },
];

const communityLinks: CommunityMenuItem[] = [
  {
    label: "Discord",
    description: "Chat with the community, get support, and join us.",
    href: DISCORD_URL,
  },
  {
    label: "GitHub",
    description: "Explore our open-source projects and development.",
    href: GITHUB_URL,
  },
  {
    label: "Modrinth",
    description: "Browse every released Brassworks project.",
    href: MODRINTH_URL,
  },
  {
    label: "YouTube",
    description: "Watch builds, updates, and community videos.",
    href: YOUTUBE_URL,
  },
];

const partnerLinks: CommunityMenuItem[] = [
  {
    label: "SnowGo",
    description: "Our director, engineer, and creative partner.",
    href: SNOWGO_URL,
  },
  {
    label: "Obsidian Servers",
    description: "Hosting partner powering Brassworks projects.",
    href: OBSIDIAN_SERVERS_URL,
  },
];

function externalLinkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function NavTrigger({
  children,
  open,
}: {
  children: string;
  open: boolean;
}) {
  return (
    <span
      className={`site-accent-hover inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 hover:bg-white/5 hover:text-[#d9b86e] xl:px-4 ${
        open ? "bg-white/5 text-[#d9b86e]" : "text-white/65"
      }`}
    >
      {children}
      <ChevronDown
        size={14}
        strokeWidth={2.2}
        className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "rotate-180" : ""
        }`}
      />
    </span>
  );
}

function ModpackPreview({
  item,
  onNavigate,
}: {
  item: ModpackMenuItem;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={item.href}
      {...externalLinkProps(item.href)}
      onClick={onNavigate}
      className={`group/card relative isolate min-h-[154px] overflow-hidden rounded-lg border-2 border-transparent bg-[#211f1b] transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        item.blue
          ? "hover:border-[#79c4ff] focus-visible:border-[#79c4ff]"
          : "hover:border-[#d9b86e] focus-visible:border-[#d9b86e]"
      }`}
    >
      <img
        src={item.cover}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        draggable="false"
        decoding="async"
      />
      <span className="absolute inset-0 -z-10 bg-black/55 transition-colors duration-500 group-hover/card:bg-black/42"/>
      <span
        className={`absolute left-3 top-3 rounded-md px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] ${
          item.blue ? "bg-[#2f78c4] text-white" : "bg-[#c7a35a] text-[#171614]"
        }`}
      >
        {item.tag}
      </span>
      <div className="absolute inset-x-4 bottom-4">
        {item.logo ? (
          <img
            src={item.logo}
            alt={item.title}
            className="mb-2 h-10 w-auto max-w-[85%] object-contain object-left [image-rendering:pixelated]"
            draggable="false"
            decoding="async"
          />
        ) : (
          <div className="mb-2 flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-[#eaf6ff]" strokeWidth={1.6}/>
            <span className="font-minecraft text-sm font-bold text-white">
              {item.title}
            </span>
          </div>
        )}
        <p className="max-w-[280px] text-[11px] font-semibold leading-4 text-white/76">
          {item.description}
        </p>
      </div>
    </a>
  );
}

function CommunityLink({
  item,
  onNavigate,
}: {
  item: CommunityMenuItem;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={item.href}
      {...externalLinkProps(item.href)}
      onClick={onNavigate}
      className="group/link site-accent-hover block rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-white/5"
    >
      <span className="block font-minecraft text-[11px] font-bold text-white transition-colors duration-300 group-hover/link:text-[#d9b86e]">
        {item.label}
      </span>
      <span className="mt-1 block text-[11px] font-medium leading-4 text-white/45">
        {item.description}
      </span>
    </a>
  );
}

function DesktopModpacksMenu({
  items,
  open,
  onToggle,
  onNavigate,
}: {
  items: ModpackMenuItem[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="relative" data-header-dropdown-root>
      <button
        type="button"
        className="outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
      >
        <NavTrigger open={open}>Modpacks</NavTrigger>
      </button>
      <div
        aria-hidden={!open}
        inert={!open}
        className="absolute left-0 top-full w-[610px]"
      >
        <div
          className="header-dropdown-panel pt-3"
          data-open={open}
        >
          <div className="rounded-xl bg-[#171614]/98 p-3 backdrop-blur-xl">
            <div className={`grid gap-3 ${items.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
              {items.map((item) => (
                <ModpackPreview key={item.id} item={item} onNavigate={onNavigate}/>
              ))}
            </div>
            <a
              href="/#creations"
              onClick={onNavigate}
              className="site-accent-hover mt-2 inline-flex rounded-md px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-[#d9b86e]"
            >
              View all creations
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopCommunityMenu({
  open,
  onToggle,
  onNavigate,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="relative" data-header-dropdown-root>
      <button
        type="button"
        className="outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
      >
        <NavTrigger open={open}>Community</NavTrigger>
      </button>
      <div
        aria-hidden={!open}
        inert={!open}
        className="absolute left-0 top-full w-[590px]"
      >
        <div
          className="header-dropdown-panel pt-3"
          data-open={open}
        >
          <div className="grid grid-cols-[1.35fr_0.85fr] gap-3 rounded-xl bg-[#171614]/98 p-3 backdrop-blur-xl">
            <div>
              <span className="site-accent-text block px-3 pb-1 pt-2 font-minecraft text-[9px] uppercase tracking-[0.12em] text-[#d9b86e]">
                Connect
              </span>
              <div className="grid grid-cols-2 gap-1">
                {communityLinks.map((item) => (
                  <CommunityLink key={item.label} item={item} onNavigate={onNavigate}/>
                ))}
              </div>
            </div>
            <div>
              <span className="site-accent-text block px-3 pb-1 pt-2 font-minecraft text-[9px] uppercase tracking-[0.12em] text-[#d9b86e]">
                Partners
              </span>
              <div className="grid gap-1">
                {partnerLinks.map((item) => (
                  <CommunityLink key={item.label} item={item} onNavigate={onNavigate}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<"modpacks" | "community" | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<"modpacks" | "community" | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const { data: homepageAssets } = useHomepageAssets();
  const modpacks: ModpackMenuItem[] = [];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (
        target instanceof Element &&
        target.closest("[data-header-dropdown-root]")
      ) return;

      setDesktopDropdown(null);

      if (headerRef.current?.contains(target)) return;

      setMenuOpen(false);
      setMobileDropdown(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setDesktopDropdown(null);
      setMenuOpen(false);
      setMobileDropdown(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (homepageAssets?.modpackCover && homepageAssets.modpackLogo) {
    modpacks.push({
      id: "brassworks",
      title: "Create: Brassworks",
      description: "Factories, exploration, and an evolving shared Create experience.",
      tag: "Play Now",
      cover: homepageAssets.modpackCover,
      logo: homepageAssets.modpackLogo,
      href: SERVER_URL,
      blue: false,
    });
  }

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileDropdown(null);
  };

  const closeDesktopDropdown = () => setDesktopDropdown(null);

  const toggleMenu = () => {
    if (menuOpen) setMobileDropdown(null);
    setDesktopDropdown(null);
    setMenuOpen((current) => !current);
  };

  return (
      <>
          <SiteAnnouncement />
          <header
              ref={headerRef}
              className="site-header fixed inset-x-0 top-0 z-50 h-[60px] bg-[#171614]/95 font-sans text-white backdrop-blur-md"
          >
              <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-4 sm:px-8 lg:px-[60px]">
                  <a
                      href="/"
                      className="flex shrink-0 items-center gap-3 outline-none"
                      aria-label="Brassworks home"
                  >
                      <img
                          src={assetUrl("/icon.png")}
                          alt=""
                          className="h-[35px] w-[35px] object-contain"
                      />
                      <span className="hidden flex-col leading-none sm:flex">
                          <span className="font-minecraft text-sm uppercase tracking-[0.12em] text-white">
                              Brassworks
                          </span>
                          <span className="mb-[0.3em] mt-[0.1em] ml-[-0.05em] text-[9px] font-medium uppercase tracking-[0.14em] text-white/50">
                              Made to Create
                          </span>
                      </span>
                  </a>

                  <nav
                      className="ml-8 hidden items-center gap-0.5 lg:flex xl:ml-10"
                      aria-label="Main navigation"
                      onBlur={(event) => {
                          const nextTarget = event.relatedTarget;

                          if (
                              nextTarget instanceof Node &&
                              event.currentTarget.contains(nextTarget)
                          ) {
                              return;
                          }

                          setDesktopDropdown(null);
                      }}
                  >
                      {modpacks.length > 0 ? (
                          <DesktopModpacksMenu
                              items={modpacks}
                              open={desktopDropdown === "modpacks"}
                              onToggle={() =>
                                  setDesktopDropdown((current) =>
                                      current === "modpacks"
                                          ? null
                                          : "modpacks",
                                  )
                              }
                              onNavigate={closeDesktopDropdown}
                          />
                      ) : (
                          <a
                              href="/#creations"
                              onClick={closeDesktopDropdown}
                              className="site-accent-hover rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:bg-white/5 hover:text-[#d9b86e] xl:px-4"
                          >
                              Modpacks
                          </a>
                      )}
                      <DesktopCommunityMenu
                          open={desktopDropdown === "community"}
                          onToggle={() =>
                              setDesktopDropdown((current) =>
                                  current === "community" ? null : "community",
                              )
                          }
                          onNavigate={closeDesktopDropdown}
                      />
                      {navigation.map((item) => (
                          <a
                              key={item.label}
                              href={item.href}
                              onClick={closeDesktopDropdown}
                              className="site-accent-hover rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:bg-white/5 hover:text-[#d9b86e] xl:px-4"
                          >
                              {item.label}
                          </a>
                      ))}
                  </nav>

                  <div className="ml-auto flex items-center gap-2 sm:gap-3">
                      <a
                          href={DISCORD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="site-primary-button group/button relative inline-flex h-10 min-w-[112px] items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#171614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c] sm:min-w-[120px] sm:px-6"
                      >
                          <ButtonWipe />
                          <span className="relative z-10">Join Now</span>
                      </a>

                      <a
                          href="/launcher"
                          className="site-accent-hover hidden rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:text-[#d9b86e] sm:inline-flex"
                      >
                          Launcher
                      </a>
                      <a
                          href="/roadmap"
                          className="site-accent-hover hidden rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:text-[#d9b86e] xl:inline-flex"
                      >
                          Roadmap
                      </a>

                      <button
                          type="button"
                          className="site-accent-hover flex h-10 w-10 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/5 hover:text-[#d9b86e] lg:hidden"
                          aria-label={
                              menuOpen ? "Close navigation" : "Open navigation"
                          }
                          aria-expanded={menuOpen}
                          onClick={toggleMenu}
                      >
                          {menuOpen ? <X size={20} /> : <Menu size={20} />}
                      </button>
                  </div>
              </div>

              <div
                  className={`site-header-panel absolute inset-x-0 top-full overflow-y-auto bg-[#171614]/98 backdrop-blur-md transition-[max-height,opacity,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
                      menuOpen
                          ? "max-h-[calc(100vh-60px)] opacity-100"
                          : "pointer-events-none max-h-0 opacity-0"
                  }`}
              >
                  <nav
                      className="grid gap-1 px-4 py-4 sm:px-8"
                      aria-label="Mobile navigation"
                  >
                      <button
                          type="button"
                          onClick={() =>
                              setMobileDropdown((current) =>
                                  current === "modpacks" ? null : "modpacks",
                              )
                          }
                          className="site-accent-hover flex items-center justify-between rounded-lg px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:bg-white/5 hover:text-[#d9b86e]"
                          aria-expanded={mobileDropdown === "modpacks"}
                      >
                          Modpacks
                          <ChevronDown
                              size={16}
                              className={`transition-transform duration-500 ${mobileDropdown === "modpacks" ? "rotate-180" : ""}`}
                          />
                      </button>
                      <div
                          className="header-mobile-dropdown"
                          data-open={mobileDropdown === "modpacks"}
                      >
                          <div className="min-h-0 overflow-hidden">
                              <div
                                  className={`grid gap-2 px-2 pb-2 ${modpacks.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}
                              >
                                  {modpacks.map((item) => (
                                      <ModpackPreview
                                          key={item.id}
                                          item={item}
                                          onNavigate={closeMenu}
                                      />
                                  ))}
                              </div>
                          </div>
                      </div>

                      <button
                          type="button"
                          onClick={() =>
                              setMobileDropdown((current) =>
                                  current === "community" ? null : "community",
                              )
                          }
                          className="site-accent-hover flex items-center justify-between rounded-lg px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:bg-white/5 hover:text-[#d9b86e]"
                          aria-expanded={mobileDropdown === "community"}
                      >
                          Community
                          <ChevronDown
                              size={16}
                              className={`transition-transform duration-500 ${mobileDropdown === "community" ? "rotate-180" : ""}`}
                          />
                      </button>
                      <div
                          className="header-mobile-dropdown"
                          data-open={mobileDropdown === "community"}
                      >
                          <div className="min-h-0 overflow-hidden">
                              <div className="grid gap-1 px-2 pb-2 sm:grid-cols-2">
                                  {[...communityLinks, ...partnerLinks].map(
                                      (item) => (
                                          <a
                                              key={item.label}
                                              href={item.href}
                                              {...externalLinkProps(item.href)}
                                              onClick={closeMenu}
                                              className="site-accent-hover rounded-lg bg-white/4 px-3 py-3 transition-colors hover:bg-white/7"
                                          >
                                              <span className="block font-minecraft text-[11px] font-bold text-white">
                                                  {item.label}
                                              </span>
                                              <span className="mt-1 block text-[11px] font-medium leading-4 text-white/45">
                                                  {item.description}
                                              </span>
                                          </a>
                                      ),
                                  )}
                              </div>
                          </div>
                      </div>

                      {navigation.map((item) => (
                          <a
                              key={item.label}
                              href={item.href}
                              onClick={closeMenu}
                              className="site-accent-hover rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:bg-white/5 hover:text-[#d9b86e]"
                          >
                              {item.label}
                          </a>
                      ))}

                      <div className="mt-2 grid grid-cols-3 gap-2 pt-3">
                          <a
                              href="/launcher"
                              onClick={closeMenu}
                              className="site-accent-hover rounded-lg bg-white/5 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-[#d9b86e]"
                          >
                              Launcher
                          </a>
                          <a
                              href="/roadmap"
                              onClick={closeMenu}
                              className="site-accent-hover rounded-lg bg-white/5 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-[#d9b86e]"
                          >
                              Roadmap
                          </a>
                      </div>
                  </nav>
              </div>
          </header>
      </>
  );
}
