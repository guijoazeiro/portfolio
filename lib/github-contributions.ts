const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_LOGIN = "guijoazeiro";
const REVALIDATE_SECONDS = 60 * 60 * 12;

const CONTRIBUTIONS_QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  weekday: number;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type GithubContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type GithubGraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: GithubContributionCalendar;
      };
    } | null;
  };
  errors?: Array<{ message?: string }>;
};

export type GithubContributionsResult =
  | { ok: true; calendar: GithubContributionCalendar }
  | { ok: false };

export async function getGithubContributions(): Promise<GithubContributionsResult> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("[github-contributions] GITHUB_TOKEN is not configured");
    return { ok: false };
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { login: GITHUB_LOGIN },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      console.error("[github-contributions] GitHub request failed", {
        status: response.status,
      });
      return { ok: false };
    }

    const payload = (await response.json()) as GithubGraphqlResponse;

    if (payload.errors?.length) {
      console.error("[github-contributions] GitHub GraphQL returned errors", {
        errorCount: payload.errors.length,
      });
      return { ok: false };
    }

    const calendar = payload.data?.user?.contributionsCollection
      ?.contributionCalendar;

    if (!calendar) {
      console.error("[github-contributions] Contribution calendar is unavailable");
      return { ok: false };
    }

    return { ok: true, calendar };
  } catch (error) {
    console.error("[github-contributions] Unexpected GitHub request error", {
      error: error instanceof Error ? error.message : "unknown error",
    });
    return { ok: false };
  }
}
