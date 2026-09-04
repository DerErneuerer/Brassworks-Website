import { ArrowUpRight } from "lucide-react";
import { NewsCoverBrand } from "../news/NewsCoverBrand";
import type { NewsArticle } from "../../features/news/news.service";
import { useLatestNews } from "../../features/news/use-news";
import { ButtonWipe } from "./ButtonWipe";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function NewsCard({
  item,
  featured = false,
}: {
  item: NewsArticle;
  featured?: boolean;
}) {
  return (
    <a
      href={`/news/${item.id}`}
      className={`group relative isolate flex cursor-pointer overflow-hidden rounded-xl border-2 border-transparent bg-[#211f1b] outline-none transition-[border-color,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#d9b86e] hover:bg-[#27231d] focus-visible:border-[#d9b86e] ${
        featured
          ? "min-h-[470px] flex-col sm:min-h-[520px] lg:min-h-[420px] lg:flex-row"
          : "min-h-[360px] flex-col sm:min-h-[390px]"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#0d0c0b] ${
          featured
            ? "aspect-[2/1] w-full shrink-0 lg:w-[56%]"
            : "aspect-[2/1] shrink-0"
        }`}
      >
        <img
          src={item.cover}
          alt={item.coverAlt}
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover opacity-90 saturate-[0.9] brightness-90 transition-[opacity,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:saturate-100 group-hover:brightness-100 group-focus-visible:opacity-100 group-focus-visible:saturate-100 group-focus-visible:brightness-100"
        />
        <NewsCoverBrand large={featured}/>
      </div>

      <div
        className={`relative flex shrink-0 flex-col ${
          featured
            ? "px-6 pb-7 pt-5 sm:px-8 sm:pb-8 lg:w-[44%] lg:justify-center lg:px-10 lg:py-10"
            : "flex-1 px-5 pb-6 pt-4 sm:px-6"
        }`}
      >
        <span className="font-minecraft text-[11px] font-bold uppercase tracking-[0.12em] text-[#d9b86e]/80 transition-colors duration-500 group-hover:text-[#dec17c] group-focus-visible:text-[#dec17c]">
          {item.tag} · {formatDate(item.publishedAt)}
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
            {item.authors.length > 0 ? (
              <p className="mt-4 text-xs font-semibold text-white/42">
                By {item.authors.map((author) => author.name).join(", ")}
              </p>
            ) : null}
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c7a35a] text-[#171614] transition-colors duration-500 ease-in-out group-hover:bg-[#dec17c] group-focus-visible:bg-[#dec17c]">
            <ArrowUpRight size={19} strokeWidth={2.2}/>
          </span>
        </div>
      </div>
    </a>
  );
}

export function NewsSection() {
  const { data: articles = [], isPending, isError } = useLatestNews();

  if (isPending || isError || articles.length === 0) return null;

  return (
    <section
      id="news"
      className="bg-[#171614] px-3 pb-10 text-white sm:px-6 sm:pb-16 lg:px-[60px] lg:pb-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col gap-7 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <a
            href="/news"
            className="group/button relative order-2 inline-flex min-h-10 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#c7a35a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#171614] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dec17c] lg:order-1"
          >
            <ButtonWipe/>
            <span className="relative z-10">
              View All News
            </span>
          </a>

          <header className="order-1 ml-auto max-w-3xl text-right lg:order-2">
            <h2 className="font-minecraft text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              News
            </h2>
            <p className="ml-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/65 sm:text-base sm:leading-7">
              The latest from Brassworks - project updates, releases, and everything currently taking shape behind the scenes.
            </p>
          </header>
        </div>

        <div className="grid gap-4">
          <NewsCard item={articles[0]} featured/>
          {articles.length > 1 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {articles.slice(1, 4).map((article) => (
                <NewsCard key={article.id} item={article}/>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
