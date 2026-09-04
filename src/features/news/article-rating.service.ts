export type ArticleRatingScore = 1 | 2 | 3 | 4 | 5;

export type ArticleRating = {
  articleId: string;
  score: ArticleRatingScore;
  createdAt: string;
  updatedAt: string;
};

export type SaveArticleRatingInput = {
  articleId: string;
  score: ArticleRatingScore;
};

const STORAGE_PREFIX = "brassworks:article-rating:";

function storageKey(articleId: string) {
  return `${STORAGE_PREFIX}${articleId}`;
}

function isScore(value: unknown): value is ArticleRatingScore {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5;
}

function isArticleRating(value: unknown): value is ArticleRating {
  if (!value || typeof value !== "object") return false;

  const rating = value as Partial<ArticleRating>;

  return (
    typeof rating.articleId === "string" &&
    isScore(rating.score) &&
    typeof rating.createdAt === "string" &&
    typeof rating.updatedAt === "string"
  );
}

export async function getArticleRating(
  articleId: string,
): Promise<ArticleRating | null> {
  const storedValue = window.localStorage.getItem(storageKey(articleId));

  if (!storedValue) return null;

  try {
    const rating: unknown = JSON.parse(storedValue);

    return isArticleRating(rating) && rating.articleId === articleId
      ? rating
      : null;
  } catch {
    return null;
  }
}

export async function saveArticleRating({
  articleId,
  score,
}: SaveArticleRatingInput): Promise<ArticleRating> {
  const existingRating = await getArticleRating(articleId);
  const timestamp = new Date().toISOString();
  const rating: ArticleRating = {
    articleId,
    score,
    createdAt: existingRating?.createdAt ?? timestamp,
    updatedAt: timestamp,
  };

  window.localStorage.setItem(storageKey(articleId), JSON.stringify(rating));

  return rating;
}
