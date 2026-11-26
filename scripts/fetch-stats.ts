type DayRepos = [repo: string, commits: number][];
type Calendar = { start: string; weeks: number[][]; counts: number[][]; days: Record<string, DayRepos> };

type Stats = {
  repos: number;
  stars: number;
  contributions: number;
  followers: number;
  since: number;
  updated: string;
  calendar?: Calendar | null;
};

type CalendarDay = { date: string; contributionCount: number; contributionLevel: string };
type RepoContributions = {
  repository: { name: string };
  contributions: { pageInfo: { hasNextPage: boolean }; nodes: { occurredAt: string; commitCount: number }[] };
};
type Contributions = { total: number; calendar: Calendar };

const TOP_REPOS = 5;

const USER = "AzPepoze";
const API = "https://api.github.com";
const OUT = new globalThis.URL("../public/stats.json", import.meta.url);
const DAY = 86_400_000;
const MISSING = -1;
const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const token = process.env.GITHUB_TOKEN;
const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
if (token) headers.Authorization = `Bearer ${token}`;

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers, ...init });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return (await res.json()) as T;
}

async function readPrevious(): Promise<Stats | null> {
  try {
    return (await Bun.file(OUT).json()) as Stats;
  } catch {
    return null;
  }
}

function toDayRepos(repos: RepoContributions[]): Record<string, DayRepos> {
  const byDay: Record<string, Map<string, number>> = {};
  for (const repo of repos) {
    if (repo.contributions.pageInfo.hasNextPage) console.warn(`[stats] ${repo.repository.name} has more than 100 commit days, details truncated`);
    for (const node of repo.contributions.nodes) {
      const date = node.occurredAt.slice(0, 10);
      const day = (byDay[date] ??= new Map());
      day.set(repo.repository.name, (day.get(repo.repository.name) ?? 0) + node.commitCount);
    }
  }
  const days: Record<string, DayRepos> = {};
  for (const [date, repoMap] of Object.entries(byDay)) {
    days[date] = [...repoMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP_REPOS);
  }
  return days;
}

function toCalendar(days: CalendarDay[], repos: RepoContributions[]): Calendar {
  const first = Date.parse(`${days[0].date}T00:00:00Z`);
  const start = new Date(first - new Date(first).getUTCDay() * DAY);
  const weeks: number[][] = [];
  const counts: number[][] = [];
  for (const day of days) {
    const offset = Math.round((Date.parse(`${day.date}T00:00:00Z`) - start.getTime()) / DAY);
    const week = Math.floor(offset / 7);
    weeks[week] ??= Array<number>(7).fill(MISSING);
    counts[week] ??= Array<number>(7).fill(MISSING);
    weeks[week][offset % 7] = LEVELS[day.contributionLevel] ?? 0;
    counts[week][offset % 7] = day.contributionCount;
  }
  return { start: start.toISOString().slice(0, 10), weeks, counts, days: toDayRepos(repos) };
}

async function fetchContributions(): Promise<Contributions | null> {
  if (!token) return null;
  const query = `query { user(login: "${USER}") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } commitContributionsByRepository(maxRepositories: 100) { repository { name } contributions(first: 100) { pageInfo { hasNextPage } nodes { occurredAt commitCount } } } } } }`;
  const body = await getJson<{
    data?: {
      user?: {
        contributionsCollection: {
          contributionCalendar: { totalContributions: number; weeks: { contributionDays: CalendarDay[] }[] };
          commitContributionsByRepository: RepoContributions[];
        };
      };
    };
  }>(`${API}/graphql`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const collection = body.data?.user?.contributionsCollection;
  const calendar = collection?.contributionCalendar;
  if (!collection || !calendar || typeof calendar.totalContributions !== "number") throw new Error("GraphQL returned no contribution calendar");
  const days = calendar.weeks.flatMap((week) => week.contributionDays);
  return { total: calendar.totalContributions, calendar: toCalendar(days, collection.commitContributionsByRepository) };
}

async function collect(previous: Stats | null): Promise<Stats> {
  const user = await getJson<{ public_repos: number; followers: number; created_at: string }>(`${API}/users/${USER}`);
  const repos = await getJson<{ stargazers_count: number }[]>(`${API}/users/${USER}/repos?per_page=100`);
  const contributions = await fetchContributions();

  return {
    repos: user.public_repos,
    stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    contributions: contributions?.total ?? previous?.contributions ?? 0,
    followers: user.followers,
    since: new Date(user.created_at).getUTCFullYear(),
    updated: new Date().toISOString(),
    calendar: contributions?.calendar ?? previous?.calendar ?? null,
  };
}

const previous = await readPrevious();

try {
  const stats = await collect(previous);
  await Bun.write(OUT, `${JSON.stringify(stats)}\n`);
  console.log(`[stats] wrote public/stats.json (${stats.repos} repos, ${stats.stars} stars, ${stats.contributions} contributions)`);
} catch (error) {
  // Keep the previous snapshot so a rate limit never breaks the build.
  console.warn(`[stats] ${(error as Error).message}, keeping the existing public/stats.json`);
}
process.exit(0);
