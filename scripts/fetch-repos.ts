import type { Repo } from "../src/data/types.ts";

const USER = "AzPepoze";
const URL = `https://api.github.com/users/${USER}/repos?per_page=100`;
const OUT = new globalThis.URL("../public/repos.json", import.meta.url);
const MAX_LOGO_BYTES = 500 * 1024;
const LOGO_DIRS = ["", "assets/", "branding/", "docs/", "showcase/", "public/", "src/assets/"];

type ApiRepo = Repo & { default_branch: string };
type TreeEntry = { path: string; type: string; size?: number };

const token = process.env.GITHUB_TOKEN;
const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
if (token) headers.Authorization = `Bearer ${token}`;

function pick(repo: ApiRepo): Repo {
  const { html_url, name, stargazers_count, description, language, updated_at } = repo;
  return { html_url, name, stargazers_count, description, language, updated_at, logo: null };
}

function isLogoName(file: string): boolean {
  const lower = file.toLowerCase();
  if (!/\.(png|svg|jpe?g|webp)$/.test(lower)) return false;
  return /^(logo|icon)\./.test(lower) || lower.includes("logo");
}

function dirRank(path: string): number {
  const dir = path.includes("/") ? path.slice(0, path.lastIndexOf("/") + 1) : "";
  const rank = LOGO_DIRS.findIndex((prefix) => (prefix === "" ? dir === "" : dir === prefix || dir.startsWith(prefix)));
  return rank === -1 ? LOGO_DIRS.length : rank;
}

function nameRank(path: string): number {
  const file = path.split("/").pop()!.toLowerCase();
  if (/^logo\./.test(file)) return 0;
  if (/^icon\./.test(file)) return 1;
  return 2;
}

function findLogo(tree: TreeEntry[]): string | null {
  const candidates = tree
    .filter((entry) => entry.type === "blob")
    .filter((entry) => !entry.path.split("/").some((part) => part === "node_modules" || part === "test" || part === "tests"))
    .filter((entry) => (entry.size ?? 0) <= MAX_LOGO_BYTES)
    .filter((entry) => isLogoName(entry.path.split("/").pop()!));
  candidates.sort((a, b) => dirRank(a.path) - dirRank(b.path) || nameRank(a.path) - nameRank(b.path) || a.path.length - b.path.length);
  return candidates[0]?.path ?? null;
}

async function fetchLogo(repo: ApiRepo, previous: string | null): Promise<string | null> {
  try {
    const api = `https://api.github.com/repos/${USER}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`;
    const res = await fetch(api, { headers });
    if (!res.ok) {
      console.warn(`[repos] tree for ${repo.name} responded ${res.status}, keeping its previous logo`);
      return previous;
    }
    const { tree } = (await res.json()) as { tree: TreeEntry[] };
    const path = findLogo(tree);
    if (path === null) return null;
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    return `https://raw.githubusercontent.com/${USER}/${repo.name}/${repo.default_branch}/${encoded}`;
  } catch (error) {
    console.warn(`[repos] logo lookup for ${repo.name} failed, keeping its previous logo`, error);
    return previous;
  }
}

const res = await fetch(URL, { headers });
if (!res.ok) {
  // Keep the previous snapshot so a rate limit never breaks the build.
  console.warn(`[repos] GitHub responded ${res.status}, keeping the existing public/repos.json`);
  process.exit(0);
}

const apiRepos = (await res.json()) as ApiRepo[];
const previous = await Bun.file(OUT)
  .json()
  .then((list: Repo[]) => new Map(list.map((repo) => [repo.name, repo.logo ?? null])))
  .catch(() => new Map<string, string | null>());
const repos = apiRepos.map(pick);
await Promise.all(
  apiRepos.map(async (repo, index) => {
    repos[index].logo = await fetchLogo(repo, previous.get(repo.name) ?? null);
  }),
);
await Bun.write(OUT, `${JSON.stringify(repos)}\n`);
const withLogo = repos.filter((repo) => repo.logo !== null).length;
console.log(`[repos] wrote ${repos.length} repos (${withLogo} with logo) to public/repos.json`);
