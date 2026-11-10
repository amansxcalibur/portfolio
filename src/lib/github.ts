import { cacheLife } from "next/cache";

/** Live star count for an `owner/name` repo, or null if GitHub can't be reached. */
export async function getRepoStars(repo: string): Promise<number | null> {
  "use cache";

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);

    const { stargazers_count: stars } = (await response.json()) as {
      stargazers_count: number;
    };
    cacheLife("hours");
    return stars;
  } catch {
    // Unauthenticated requests are rate limited, so retry soon rather than
    // keeping a missing count for hours.
    cacheLife("minutes");
    return null;
  }
}
