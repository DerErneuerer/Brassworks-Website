import {
  SiDiscord,
  SiGithub,
  SiModrinth,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";
import { ButtonWipe } from "../components/general/ButtonWipe";
import { Footer } from "../components/general/Footer";
import { Header } from "../components/general/Header";
import { createPageMetadata } from "../lib/seo";

const DISCORD_URL = "https://discord.gg/brassworks";
const GITHUB_URL = "https://github.com/Brassworks-smp";
const MODRINTH_URL = "https://modrinth.com/organization/brassworks";
const YOUTUBE_URL = "https://www.youtube.com/@BrassworksSMP";
const SNOWGO_URL = "https://www.youtube.com/@snowy-go";
const OBSIDIAN_SERVERS_URL =
  "https://obsidianservers.com/partner/brassworks-smp";

const destinations = [
  {
    title: "Discord",
    description: "Community chat, project support, updates, and discussion.",
    href: DISCORD_URL,
    icon: SiDiscord,
  },
  {
    title: "GitHub",
    description: "Source code, issue tracking, and open development.",
    href: GITHUB_URL,
    icon: SiGithub,
  },
  {
    title: "Modrinth",
    description: "Every public Brassworks mod, modpack, and release.",
    href: MODRINTH_URL,
    icon: SiModrinth,
  },
  {
    title: "YouTube",
    description: "Showcases, project updates, and community videos.",
    href: YOUTUBE_URL,
    icon: SiYoutube,
  },
];

const principles = [
  {
    number: "01",
    title: "Share the work",
    description:
      "Progress, decisions, and useful knowledge should be visible instead of staying with one person.",
  },
  {
    number: "02",
    title: "Make feedback useful",
    description:
      "Clear reports and considered suggestions help projects improve without adding unnecessary noise.",
  },
  {
    number: "03",
    title: "Build for the long term",
    description:
      "We value maintainable ideas, reliable releases, and a community people want to return to.",
  },
];

export const Route = createFileRoute("/community")({
  head: () =>
    createPageMetadata({
      title: "Brassworks | Community",
      description:
        "Join the Brassworks community across Discord, GitHub, Modrinth, and YouTube.",
      path: "/community",
    }),
  component: CommunityRoute,
});

function CommunityRoute() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171614] pt-[60px] text-white">
        <section className="px-4 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-[60px]">
          <div className="mx-auto max-w-[1600px]">
            <header className="max-w-4xl">
              <span className="font-minecraft text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9b86e]">
                Community
              </span>
              <h1 className="mt-5 max-w-3xl font-minecraft text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
                Made by people who build together.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/64 sm:text-lg">
                Follow the work, join the discussion, report problems, or help
                shape what Brassworks makes next.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button relative mt-8 inline-flex min-h-11 items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#171614]"
              >
                <ButtonWipe />
                <span className="relative z-10">Join the Discord</span>
              </a>
            </header>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {destinations.map(({ title, description, href, icon: Icon }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-interactive group flex min-h-56 flex-col rounded-xl border-2 border-transparent bg-[#211f1b] p-6 transition-[background-color,border-color] hover:border-[#d9b86e] hover:bg-[#27231d] sm:p-7"
                >
                  <Icon size={23} color="currentColor" className="text-white/72" />
                  <h2 className="mt-auto pt-10 font-minecraft text-lg font-bold">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/52">
                    {description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0d0c0b] px-4 py-20 sm:px-8 sm:py-24 lg:px-[60px]">
          <div className="mx-auto max-w-[1600px]">
            <header className="max-w-3xl">
              <span className="font-minecraft text-[10px] font-bold uppercase tracking-[0.15em] text-[#d9b86e]">
                How we work
              </span>
              <h2 className="mt-4 font-minecraft text-3xl font-bold sm:text-4xl">
                Clear, open, and built to last.
              </h2>
            </header>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/8 lg:grid-cols-3">
              {principles.map(({ number, title, description }) => (
                <article key={number} className="bg-[#171614] p-7 sm:p-8">
                  <span className="font-minecraft text-[10px] font-bold text-[#d9b86e]">
                    {number}
                  </span>
                  <h3 className="mt-8 font-minecraft text-lg font-bold">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/52">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-8 sm:py-24 lg:px-[60px]">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-8 border-y border-white/8 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <span className="font-minecraft text-[10px] font-bold uppercase tracking-[0.15em] text-[#d9b86e]">
                  Partners
                </span>
                <h2 className="mt-4 font-minecraft text-2xl font-bold sm:text-3xl">
                  Part of the workshop.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={SNOWGO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-interactive rounded-lg bg-[#211f1b] px-5 py-5 transition-colors hover:bg-[#27231d]"
                >
                  <span className="font-minecraft text-sm font-bold">SnowGo</span>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-white/45">
                    Direction, engineering, and creative development.
                  </span>
                </a>
                <a
                  href={OBSIDIAN_SERVERS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-interactive rounded-lg bg-[#211f1b] px-5 py-5 transition-colors hover:bg-[#27231d]"
                >
                  <span className="font-minecraft text-sm font-bold">
                    Obsidian Servers
                  </span>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-white/45">
                    Infrastructure and hosting for Brassworks projects.
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
