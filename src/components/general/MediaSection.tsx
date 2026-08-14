import { useState } from "react";
import { Play } from "lucide-react";

type Collection = "director" | "library";

type VideoItem = {
    id: string;
    title: string;
    channel: string;
    duration: string;
    href?: string;
    thumbnail?: string;
};

const DIRECTOR_URL = "https://www.youtube.com/@snowy-go";
const MEDIA_LIBRARY_URL = "https://www.youtube.com/@BrassworksSMP";

const DIRECTOR_VIDEOS: VideoItem[] = [
    {
        id: "Ztjqvh19kxE",
        title: "Gold Farms Waste Over 80% Their Gold - Here's Why",
        channel: "SnowGO",
        duration: "13:11",
    },
    {
        id: "aMBnnSpODJw",
        title: "This Fully Optimized XP Factory Hits Level 30 in 5 Minutes",
        channel: "SnowGO",
        duration: "24:52",
    },
    {
        id: "3rFNOh-8K7I",
        title: "This Andesite Farm Runs Forever",
        channel: "SnowGO",
        duration: "16:15",
    },
    {
        id: "XQHmrjFvz9k",
        title: "The Most Efficient Infinite Iron Farm in Create Mod",
        channel: "SnowGO",
        duration: "24:50",
    },
    {
        id: "AW_hvHX1xrE",
        title: "The Only 1-Wide XP Farm You Need",
        channel: "SnowGO",
        duration: "11:01",
    },
    {
        id: "o5ZtuSenoek",
        title: "We Built an Unreachable Minecraft Base - Then I Ruined It",
        channel: "SnowGO",
        duration: "12:12",
    },
    {
        id: "-4yx-2s51P4",
        title: "The Only Self-Sustaining Power Guide You'll Need",
        channel: "SnowGO",
        duration: "19:59",
    },
    {
        id: "u-a7xNPmmls",
        title: "I Engineered an Optimized Iron Farm That Beats My Old Design",
        channel: "SnowGO",
        duration: "6:00",
    },
];

const MEDIA_LIBRARY_VIDEOS: VideoItem[] = [
    {
        id: "eh_uQh58EeU",
        title: "Brassworks - Jasmine Leila - Truce",
        channel: "Brassworks",
        duration: "4:11",
    },
    {
        id: "CeJ1TUlmQkk",
        title: "Brassworks - Jasmine Leila - Brass Parade",
        channel: "Brassworks",
        duration: "5:09",
    },
    {
        id: "3SqrsYfKObM",
        title: "Chapter 1 - A World Above",
        channel: "Brassworks",
        duration: "3:11",
    },
    {
        id: "VXtJZloZ9bs",
        title: "Brassworks - Jasmine Leila - Brass Bells",
        channel: "Brassworks",
        duration: "Short",
        href: "https://www.youtube.com/shorts/VXtJZloZ9bs",
        thumbnail: "https://i.ytimg.com/vi/VXtJZloZ9bs/frame0.jpg",
    },
    {
        id: "eh_uQh58EeU",
        title: "Brassworks - Jasmine Leila - Truce",
        channel: "Brassworks",
        duration: "4:11",
    },
    {
        id: "CeJ1TUlmQkk",
        title: "Brassworks - Jasmine Leila - Brass Parade",
        channel: "Brassworks",
        duration: "5:09",
    },
    {
        id: "3SqrsYfKObM",
        title: "Chapter 1 - A World Above",
        channel: "Brassworks",
        duration: "3:11",
    },
    {
        id: "VXtJZloZ9bs",
        title: "Brassworks - Jasmine Leila - Brass Bells",
        channel: "Brassworks",
        duration: "Short",
        href: "https://www.youtube.com/shorts/VXtJZloZ9bs",
        thumbnail: "https://i.ytimg.com/vi/VXtJZloZ9bs/frame0.jpg",
    },
];

function VideoCard({
                       video,
                       collection,
                       preview = false,
                   }: {
    video: VideoItem;
    collection: Collection;
    preview?: boolean;
}) {
    const isDirector = collection === "director";
    const href = video.href ?? `https://www.youtube.com/watch?v=${video.id}`;
    const thumbnail =
        video.thumbnail ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    const cardClassName = `${
        preview ? "" : "group"
    } relative isolate flex min-h-[300px] overflow-hidden rounded-xl border-2 border-transparent bg-[#211f1b] outline-none transition-[border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-[320px] ${
        preview
            ? ""
            : isDirector
                ? "hover:border-[#79c4ff] hover:bg-[#182a3a] focus-visible:border-[#79c4ff]"
                : "hover:border-[#d9b86e] hover:bg-[#27231d] focus-visible:border-[#d9b86e]"
    }`;
    const content = (
        <div className="flex w-full flex-1 flex-col">
            <div className="relative aspect-video overflow-hidden bg-[#0d0c0b]">
                <img
                    src={thumbnail}
                    alt=""
                    loading="lazy"
                    draggable="false"
                    className="h-full w-full object-cover opacity-85 saturate-[0.88] brightness-90 transition-[opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:saturate-100 group-hover:brightness-100 group-focus-visible:opacity-100 group-focus-visible:saturate-100 group-focus-visible:brightness-100"
                />
            </div>

            <div className="relative flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.1em]">
          <span
              className={`font-minecraft transition-[color,opacity] duration-500 ${
                  isDirector
                      ? "text-[#9ed7ff]/80 group-hover:text-[#eaf6ff] group-focus-visible:text-[#eaf6ff]"
                      : "text-[#d9b86e]/80 group-hover:text-[#dec17c] group-focus-visible:text-[#dec17c]"
              }`}
          >
            {video.channel}
          </span>
                    <span className="text-white/45 transition-colors duration-500 group-hover:text-white/70 group-focus-visible:text-white/70">
            {video.duration}
          </span>
                </div>

                <h3 className="mt-3 pr-14 text-base font-semibold leading-6 tracking-[-0.01em] text-white/85 transition-colors duration-500 group-hover:text-white group-focus-visible:text-white sm:text-lg">
                    {video.title}
                </h3>

                <span
                    className={`pointer-events-none absolute bottom-5 right-5 flex h-10 w-10 scale-100 items-center justify-center rounded-lg transition-[background-color,color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-active:scale-95 group-focus-visible:scale-[1.08] sm:bottom-6 sm:right-6 ${
                        isDirector
                            ? "bg-[#2f78c4] text-white group-hover:bg-[#eaf6ff] group-hover:text-[#15324d] group-focus-visible:bg-[#eaf6ff] group-focus-visible:text-[#15324d]"
                            : "bg-[#c7a35a] text-[#171614] group-hover:bg-[#dec17c] group-focus-visible:bg-[#dec17c]"
                    }`}
                >
          <Play size={18} strokeWidth={2.4} fill="currentColor" />
        </span>
            </div>
        </div>
    );

    if (preview) {
        return (
            <article className={cardClassName} aria-hidden="true">
                {content}
            </article>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${video.title} on YouTube`}
            className={cardClassName}
        >
            {content}
        </a>
    );
}

function WatchMoreButton({ collection }: { collection: Collection }) {
    const isDirector = collection === "director";

    return (
        <a
            href={isDirector ? DIRECTOR_URL : MEDIA_LIBRARY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/button absolute left-1/2 top-1/2 z-20 inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                isDirector
                    ? "bg-[#2f78c4] text-white focus-visible:outline-[#9ed7ff]"
                    : "bg-[#c7a35a] text-[#171614] focus-visible:outline-[#dec17c]"
            }`}
        >
      <span
          className={`absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0 ${
              isDirector ? "bg-[#eaf6ff]" : "bg-[#dec17c]"
          }`}
      />
            <span
                className={`relative z-10 transition-colors duration-300 ${
                    isDirector ? "group-hover/button:text-[#15324d]" : ""
                }`}
            >
        Watch More
      </span>
        </a>
    );
}

function VideoCollection({
                             collection,
                             videos,
                             isActive,
                         }: {
    collection: Collection;
    videos: VideoItem[];
    isActive: boolean;
}) {
    return (
        <div
            id={`${collection}-videos`}
            role="tabpanel"
            aria-hidden={!isActive}
            className={`relative col-start-1 row-start-1 min-w-0 transition-[opacity,filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                    ? "z-10 translate-y-0 opacity-100 blur-0"
                    : "pointer-events-none z-0 translate-y-2 opacity-0 blur-[2px]"
            }`}
        >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {videos.slice(0, 4).map((video, index) => (
                    <VideoCard
                        key={`${collection}-main-${video.id}-${index}`}
                        video={video}
                        collection={collection}
                    />
                ))}
            </div>

            <div className="relative mt-4 h-[285px] overflow-hidden sm:h-[305px] lg:h-[320px]">
                <div className="pointer-events-none relative left-1/2 grid w-[920px] -translate-x-1/2 grid-cols-4 gap-4 sm:w-[1100px] xl:left-0 xl:w-full xl:translate-x-0">
                    {videos.slice(4, 8).map((video, index) => (
                        <VideoCard
                            key={`${collection}-preview-${video.id}-${index}`}
                            video={video}
                            collection={collection}
                            preview
                        />
                    ))}
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(23,22,20,0.78)_0%,rgba(23,22,20,0.97)_42%,#171614_80%)]" />
                <WatchMoreButton collection={collection} />
            </div>
        </div>
    );
}

export function MediaSection() {
    const [activeCollection, setActiveCollection] =
        useState<Collection>("director");

    return (
        <section
            id="media"
            className="bg-[#171614] px-3 pb-10 text-white sm:px-6 sm:pb-16 lg:px-[60px] lg:pb-20"
        >
            <div className="mx-auto max-w-[1600px]">
                <div className="mb-10 flex flex-col gap-7 sm:mb-12 lg:flex-row lg:items-start lg:justify-between">
                    <header className="max-w-2xl text-left">
                        <h2 className="font-minecraft text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            Our Media
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/65 sm:text-base sm:leading-7">
                            Watch the latest builds, stories, and behind-the-scenes moments
                            from Brassworks and our director.
                        </p>
                    </header>

                    <div
                        className="flex flex-wrap items-center justify-start gap-2 lg:justify-end lg:pt-1"
                        role="tablist"
                        aria-label="Choose a video collection"
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeCollection === "director"}
                            aria-controls="director-videos"
                            onClick={() => setActiveCollection("director")}
                            className={`group/button relative inline-flex min-h-10 items-center justify-center overflow-hidden rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] outline-none transition-[background-color,color] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ed7ff] ${
                                activeCollection === "director"
                                    ? "bg-[#2f78c4] text-white"
                                    : "bg-[#14202b] text-[#9ed7ff]"
                            }`}
                        >
                            <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#eaf6ff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                            <span className="relative z-10 transition-colors duration-300 group-hover/button:text-[#15324d]">
                Our Director
              </span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeCollection === "library"}
                            aria-controls="library-videos"
                            onClick={() => setActiveCollection("library")}
                            className={`group/button relative inline-flex min-h-10 items-center justify-center overflow-hidden rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] outline-none transition-[background-color,color] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c] ${
                                activeCollection === "library"
                                    ? "bg-[#c7a35a] text-[#171614]"
                                    : "bg-[#29251f] text-[#d9b86e]"
                            }`}
                        >
                            <span className="absolute inset-y-0 -left-1/3 w-[140%] -translate-x-full -skew-x-[24deg] bg-[#dec17c] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-0" />
                            <span className="relative z-10 transition-colors duration-300 group-hover/button:text-[#171614]">
                Media Library
              </span>
                        </button>
                    </div>
                </div>

                <div className="grid">
                    <VideoCollection
                        collection="director"
                        videos={DIRECTOR_VIDEOS}
                        isActive={activeCollection === "director"}
                    />
                    <VideoCollection
                        collection="library"
                        videos={MEDIA_LIBRARY_VIDEOS}
                        isActive={activeCollection === "library"}
                    />
                </div>
            </div>
        </section>
    );
}
