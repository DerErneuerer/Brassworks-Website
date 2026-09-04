import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getArticleRating,
  saveArticleRating,
  type ArticleRatingScore,
} from "../../features/news/article-rating.service";

const scores: ArticleRatingScore[] = [1, 2, 3, 4, 5];

type SaveState = "idle" | "saved" | "error";

export function ArticleRating({ articleId }: { articleId: string }) {
  const [score, setScore] = useState<ArticleRatingScore | null>(null);
  const [previewScore, setPreviewScore] =
    useState<ArticleRatingScore | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const saveSequence = useRef(0);
  const visibleScore = previewScore ?? score ?? 0;

  useEffect(() => {
    let active = true;

    saveSequence.current += 1;
    setScore(null);
    setPreviewScore(null);
    setSaveState("idle");

    void getArticleRating(articleId)
      .then((rating) => {
        if (!active || !rating) return;

        setScore(rating.score);
        setSaveState("saved");
      })
      .catch(() => {
        if (active) setSaveState("error");
      });

    return () => {
      active = false;
    };
  }, [articleId]);

  const selectScore = async (nextScore: ArticleRatingScore) => {
    const sequence = saveSequence.current + 1;
    saveSequence.current = sequence;
    setScore(nextScore);
    setSaveState("idle");

    try {
      await saveArticleRating({ articleId, score: nextScore });

      if (saveSequence.current === sequence) setSaveState("saved");
    } catch {
      if (saveSequence.current === sequence) setSaveState("error");
    }
  };

  return (
    <section
      aria-labelledby="article-rating-title"
      className="mt-16 border-t border-white/10 pt-10 text-center"
    >
      <h2
        id="article-rating-title"
        className="text-xl font-semibold tracking-[-0.015em] text-white sm:text-2xl"
      >
        Rate this article
      </h2>

      <div
        role="group"
        aria-label="Rate this article from 1 to 5 stars"
        onMouseLeave={() => setPreviewScore(null)}
        className="mt-5 inline-flex items-center justify-center gap-1 sm:gap-2"
      >
        {scores.map((ratingScore) => {
          const filled = ratingScore <= visibleScore;
          const highlighted = ratingScore === visibleScore;

          return (
            <button
              key={ratingScore}
              type="button"
              onClick={() => void selectScore(ratingScore)}
              onMouseEnter={() => setPreviewScore(ratingScore)}
              onFocus={() => setPreviewScore(ratingScore)}
              onBlur={() => setPreviewScore(null)}
              aria-label={`${ratingScore} out of 5 stars`}
              aria-pressed={score === ratingScore}
              className={`site-interactive flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-[color,transform] active:scale-95 sm:h-12 sm:w-12 ${
                filled
                  ? "text-[#d9b86e]"
                  : "text-white/18 hover:text-[#d9b86e]"
              } ${highlighted ? "scale-110" : "scale-100"}`}
            >
              <Star
                className="h-7 w-7 sm:h-8 sm:w-8"
                fill={filled ? "currentColor" : "none"}
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>

      <span className="sr-only" aria-live="polite">
        {saveState === "saved"
          ? `${score} out of 5 stars saved.`
          : saveState === "error"
            ? "The rating could not be saved in this browser."
            : ""}
      </span>
    </section>
  );
}
