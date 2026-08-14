import { assetUrl } from "../../lib/assets.js";

const SERVER_URL = "https://modrinth.com/server/brassworks-smp-official-server";

const navigation = [
    { label: "Home", href: "/" },
    { label: "Create", href: "/#create" },
    { label: "Modpacks", href: "/#modpacks" },
    { label: "Community", href: "/community" },
];

export function Header() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 h-[58px] border-white/10 bg-[#171614]/95 font-sans text-white backdrop-blur-md">
            <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-4 sm:px-8 lg:px-[60px]">
                <a
                    href="/"
                    className="flex shrink-0 items-center gap-3"
                    aria-label="Brassworks home"
                >
                    <img
                        src={assetUrl("/images/icon.png")}
                        alt=""
                        className="h-[35px] w-[35px] object-contain"
                    />

                    <span className="hidden flex-col leading-none sm:flex">
                        <span className="font-minecraft text-sm uppercase tracking-[0.12em] text-white">
                            Brassworks
                        </span>
                        <span className="font-sans mb-[0.13em] ml-[-0.05em] text-[10px] font-medium uppercase tracking-[0.1em] text-white/55">
                            Made to Create
                        </span>
                    </span>
                </a>

                <nav
                    className="ml-10 hidden items-center gap-1 lg:flex"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:bg-white/5 hover:text-[#d9b86e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b86e]"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <a
                        href={SERVER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button relative inline-flex h-[40px] min-w-[120px] items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-7 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#171614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c]"
                    >
                        <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                        <span className="relative z-10">Join Now</span>
                    </a>

                    <a
                        href="/launcher"
                        className="hidden rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:text-[#d9b86e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b86e] sm:inline-flex"
                    >
                        Launcher
                    </a>
                    <a
                        href="/roadmap"
                        className="hidden rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/65 transition-colors duration-300 hover:text-[#d9b86e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b86e] sm:inline-flex"
                    >
                        Roadmap
                    </a>
                </div>
            </div>
        </header>
    );
}
