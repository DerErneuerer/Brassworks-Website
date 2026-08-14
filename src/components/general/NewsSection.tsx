import { ArrowUpRight } from "lucide-react";
import { assetUrl } from "../../lib/assets.js";

type NewsItem = {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    href: string;
};

const NEWS_URL = "/news";

const NEWS_ITEMS: [NewsItem, NewsItem, NewsItem, NewsItem] = [
    {
        id: "a-new-chapter",
        title: "A New Chapter for Brassworks",
        description:
            "A first look at what we are building next and where the journey is heading.",
        date: "Latest Update",
        image: assetUrl("/images/our-mods-cover.png"),
        href: "/news/a-new-chapter",
    },
    {
        id: "behind-the-workshop",
        title: "Behind the Workshop",
        description:
            "A quick look at the ideas, experiments, and details taking shape behind the scenes.",
        date: "Project Update",
        image: assetUrl("/images/our-mods-cover.png"),
        href: "/news/behind-the-workshop",
    },
    {
        id: "community-roundup",
        title: "Community Roundup",
        description:
            "Recent highlights, creations, and moments from across the Brassworks community.",
        date: "Community",
        image: assetUrl("/images/our-mods-cover.png"),
        href: "/news/community-roundup",
    },
    {
        id: "latest-release-notes",
        title: "The Latest Release Notes",
        description:
            "A closer look at recent improvements, fixes, and additions across our projects.",
        date: "Development",
        image: assetUrl("/images/our-mods-cover.png"),
        href: "/news/latest-release-notes",
    },
];

function NewsCard({
                      item,
                      featured = false,
                  }: {
    item: NewsItem;
    featured?: boolean;
}) {
    return (
        <a
            href={item.href}
            className={`group relative isolate flex overflow-hidden rounded-xl border-2 border-transparent bg-[#211f1b] outline-none transition-[border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#d9b86e] hover:bg-[#27231d] focus-visible:border-[#d9b86e] ${
                featured
                    ? "min-h-[470px] flex-col sm:min-h-[520px] lg:min-h-[420px] lg:flex-row"
                    : "min-h-[360px] flex-col sm:min-h-[390px]"
            }`}
        >
            <div
                className={`relative overflow-hidden bg-[#0d0c0b] ${
                    featured
                        ? "min-h-[300px] flex-1 sm:min-h-[350px] lg:min-h-0 lg:w-[56%] lg:flex-none"
                        : "aspect-[16/9] shrink-0"
                }`}
            >
                <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-cover opacity-90 saturate-[0.9] brightness-90 transition-[opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:saturate-100 group-hover:brightness-100 group-focus-visible:opacity-100 group-focus-visible:saturate-100 group-focus-visible:brightness-100"
                />
            </div>

            <div
                className={`relative flex shrink-0 flex-col ${
                    featured
                        ? "px-6 pb-7 pt-5 sm:px-8 sm:pb-8 lg:w-[44%] lg:justify-center lg:px-10 lg:py-10"
                        : "flex-1 px-5 pb-6 pt-4 sm:px-6"
                }`}
            >
        <span className="font-minecraft text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9b86e]/80 transition-colors duration-500 group-hover:text-[#dec17c] group-focus-visible:text-[#dec17c]">
          {item.date}
        </span>

                <div className="mt-3 flex items-end justify-between gap-5">
                    <div>
                        <h3
                            className={`font-semibold leading-tight tracking-[-0.02em] text-white/90 transition-colors duration-500 group-hover:text-white group-focus-visible:text-white ${
                                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                            }`}
                        >
                            {item.title}
                        </h3>
                        <p
                            className={`mt-3 font-medium leading-6 text-white/58 ${
                                featured
                                    ? "max-w-2xl text-sm sm:text-base sm:leading-7"
                                    : "line-clamp-3 text-sm"
                            }`}
                        >
                            {item.description}
                        </p>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 scale-100 items-center justify-center rounded-lg bg-[#c7a35a] text-[#171614] transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:bg-[#dec17c] group-focus-visible:scale-[1.08] group-focus-visible:bg-[#dec17c]">
            <ArrowUpRight size={19} strokeWidth={2.2} />
          </span>
                </div>
            </div>
        </a>
    );
}

export function NewsSection() {
    return (
        <section
            id="news"
            className="bg-[#171614] px-3 pb-10 text-white sm:px-6 sm:pb-16 lg:px-[60px] lg:pb-20"
        >
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-10 flex flex-col gap-7 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <a
                        href={NEWS_URL}
                        className="group/button relative order-2 inline-flex min-h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#171614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c] lg:order-1"
                    >
                        <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                        <span className="relative z-10">View All News</span>
                    </a>

                    <header className="order-1 ml-auto max-w-3xl text-right lg:order-2">
                        <h2 className="font-minecraft text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            News
                        </h2>
                        <p className="ml-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/65 sm:text-base sm:leading-7">
                            The latest from Brassworks - project updates, releases, and
                            everything currently taking shape behind the scenes.
                        </p>
                    </header>
                </div>

                <div className="grid gap-4">
                    <NewsCard item={NEWS_ITEMS[0]} featured />

                    <div className="grid gap-4 md:grid-cols-3">
                        <NewsCard item={NEWS_ITEMS[1]} />
                        <NewsCard item={NEWS_ITEMS[2]} />
                        <NewsCard item={NEWS_ITEMS[3]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
