import { featuredProjects } from "./projects.ts";
import type { Project } from "./types.ts";

export type Link = { label: string; url: string };

export type Featured = {
  name: string;
  desc: string;
  lang: string;
  stars: number | null;
  url: string;
  image: string | null;
  images: string[];
  fit?: "cover" | "contain";
  video?: boolean;
  description: string;
  features: string[];
  links: Link[];
};

export type FeaturedCategory = { id: string; label: string; items: Featured[] };

const RAW = "https://raw.githubusercontent.com";
// Git LFS files: raw.githubusercontent.com serves the 130-byte pointer instead of the image.
const MEDIA = "https://media.githubusercontent.com/media";

export function labelFor(url: string): string {
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("youtube.com")) return "Watch on YouTube";
  return "Open page";
}

function projectByUrl(url: string): Project | undefined {
  return featuredProjects.find((project) => project.url.toLowerCase() === url.toLowerCase());
}

function software(
  entry: Omit<Featured, "description" | "features" | "links" | "images"> & { images: string[] },
): Featured {
  const project = projectByUrl(entry.url);
  return {
    ...entry,
    description: project?.description ?? entry.desc,
    features: project?.features ?? [],
    links: project?.actions ?? [],
  };
}

function fromProject(project: Project): Featured {
  const images = project.images?.length ? project.images : project.src ? [project.src] : [];
  return {
    name: project.title,
    desc: project.tagline,
    lang: "",
    stars: null,
    url: project.url,
    image: images[0] ?? null,
    images,
    description: project.description ?? project.tagline,
    features: project.features ?? [],
    links: project.actions ?? [],
  };
}

const softwareItems: Featured[] = [
  software({
    name: "linux-wallpaperengine-gui",
    desc: "GUI for linux-wallpaperengine, Go backend + Electron frontend.",
    lang: "Svelte",
    stars: 105,
    url: "https://github.com/AzPepoze/linux-wallpaperengine-gui",
    image: `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/main.png`,
    images: [
      `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/main.png`,
      `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/main-list.png`,
      `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/playlist.png`,
      `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/setting.png`,
      `${RAW}/AzPepoze/linux-wallpaperengine-gui/main/showcase/display.png`,
    ],
  }),
  software({
    name: "linux-wallpaperengine",
    desc: "Wallpaper engine for Linux written in C++ (Sokol).",
    lang: "C++",
    stars: 42,
    url: "https://github.com/AzPepoze/linux-wallpaperengine",
    image: `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/scene.jpg`,
    images: [
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/scene.jpg`,
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/video.jpg`,
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/web.jpg`,
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/3d.jpg`,
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/transition.jpg`,
      `${RAW}/AzPepoze/linux-wallpaperengine/main/docs/imgs/preset.jpg`,
    ],
  }),
  software({
    name: "Lusia",
    desc: "UI framework for Bun. One file with TypeScript, HTML and SCSS.",
    lang: "TypeScript",
    stars: null,
    url: "https://github.com/lusiajs/lusia",
    image: `${RAW}/lusiajs/lusia/main/logo/logo-animated.svg`,
    images: [`${RAW}/lusiajs/lusia/main/logo/logo-animated.svg`],
    fit: "contain",
  }),
  software({
    name: "newtube",
    desc: "Customize your YouTube website.",
    lang: "TypeScript",
    stars: 23,
    url: "https://github.com/AzPepoze/newtube",
    image: `${RAW}/AzPepoze/newtube/main/logo.png`,
    images: [
      ...(projectByUrl("https://github.com/AzPepoze/newtube")?.images ?? []),
      `${RAW}/AzPepoze/newtube/main/logo.png`,
    ],
    fit: "contain",
  }),
  software({
    name: "godot-vrm",
    desc: "Godot VRM, MToon shader, Godot 4.3+.",
    lang: "GDScript",
    stars: 29,
    url: "https://github.com/AzPepoze/godot-vrm",
    image: `${MEDIA}/AzPepoze/godot-vrm/dev/docs/overall.png`,
    images: [
      `${MEDIA}/AzPepoze/godot-vrm/dev/docs/overall.png`,
      `${MEDIA}/AzPepoze/godot-vrm/dev/docs/vrm_instance.png`,
    ],
  }),
  software({
    name: "light-launcher",
    desc: "Proton instance manager for Linux that runs non-Steam games through umu.",
    lang: "Svelte",
    stars: 2,
    url: "https://github.com/AzPepoze/light-launcher",
    image: `${RAW}/AzPepoze/light-launcher/main/docs/home.png`,
    images: [
      `${RAW}/AzPepoze/light-launcher/main/docs/home.png`,
      `${RAW}/AzPepoze/light-launcher/main/docs/add_games.png`,
      `${RAW}/AzPepoze/light-launcher/main/docs/run.png`,
      `${RAW}/AzPepoze/light-launcher/main/docs/prefix.png`,
    ],
  }),
  software({
    name: "browser-as-wallpaper",
    desc: "Hosts any web page as your desktop wallpaper on Linux (Wayland) and Windows.",
    lang: "Python",
    stars: 1,
    url: "https://github.com/AzPepoze/browser-as-wallpaper",
    image: null,
    images: [],
  }),
  software({
    name: "gdrive-bisync",
    desc: "Two-way sync between a local folder and Google Drive, with a terminal dashboard for activity and errors.",
    lang: "Go",
    stars: 1,
    url: "https://github.com/AzPepoze/gdrive-bisync",
    image: null,
    images: [],
  }),
  software({
    name: "stream-screen-protocol",
    desc: "Custom UDP protocol for streaming a screen from a server to a client.",
    lang: "Go",
    stars: 1,
    url: "https://github.com/AzPepoze/stream-screen-protocol",
    image: null,
    images: [],
  }),
  software({
    name: "waifupaper",
    desc: "Live wallpaper that shows random anime wallpapers from Konachan on Linux and Windows.",
    lang: "Python",
    stars: 0,
    url: "https://github.com/AzPepoze/waifupaper",
    image: `${RAW}/AzPepoze/waifupaper/main/showcase/screen1.png`,
    images: [`${RAW}/AzPepoze/waifupaper/main/showcase/screen1.png`],
  }),
  software({
    name: "styleshift",
    desc: "Browser extension that injects custom CSS and JS to change how websites look and feel.",
    lang: "TypeScript",
    stars: 0,
    url: "https://github.com/AzPepoze/styleshift",
    image: `${RAW}/AzPepoze/styleshift/main/src/extension/icon/128.png`,
    images: [`${RAW}/AzPepoze/styleshift/main/src/extension/icon/128.png`],
    fit: "contain",
  }),
  software({
    name: "media-sync",
    desc: "Real-time watch party app that keeps HLS video streams in sync between friends.",
    lang: "Svelte",
    stars: 0,
    url: "https://github.com/AzPepoze/media-sync",
    image: `${RAW}/AzPepoze/media-sync/main/assets/logo.png`,
    images: [`${RAW}/AzPepoze/media-sync/main/assets/logo.png`],
    fit: "contain",
  }),
  software({
    name: "github-actions-manager",
    desc: "Terminal UI for managing GitHub Actions self-hosted runners on Linux.",
    lang: "Go",
    stars: 0,
    url: "https://github.com/AzPepoze/github-actions-manager",
    image: `${RAW}/AzPepoze/github-actions-manager/main/docs/dashboard.png`,
    images: [
      `${RAW}/AzPepoze/github-actions-manager/main/docs/dashboard.png`,
      `${RAW}/AzPepoze/github-actions-manager/main/docs/config-runner.png`,
      `${RAW}/AzPepoze/github-actions-manager/main/docs/download-runner.png`,
    ],
  }),
  software({
    name: "typescript-to-zig",
    desc: "Early-stage transpiler that converts TypeScript into Zig.",
    lang: "TypeScript",
    stars: 0,
    url: "https://github.com/AzPepoze/typescript-to-zig",
    image: null,
    images: [],
  }),
  software({
    name: "Windows-Workspace-Shortcut",
    desc: "AutoHotkey script to switch and move windows between Windows workspaces with hotkeys.",
    lang: "AutoHotkey",
    stars: 0,
    url: "https://github.com/AzPepoze/Windows-Workspace-Shortcut",
    image: null,
    images: [],
  }),
];

const thumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
const playlistEmbed = (listId: string) => `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}&rel=0`;
const playlistPage = (listId: string) => `https://www.youtube.com/playlist?list=${listId}`;

type Playlist = { name: string; listId: string; cover: string; desc: string; tag: string; count?: number; page?: string };

function playlist({ name, listId, cover, desc, tag, count, page = playlistPage(listId) }: Playlist): Featured {
  const total = count ? ` ${count} videos, playable right here.` : " Playable right here.";
  return {
    name,
    desc,
    lang: tag,
    stars: null,
    url: page,
    image: thumb(cover),
    images: [playlistEmbed(listId)],
    video: true,
    description: `${desc}${total}`,
    features: [],
    links: [{ label: "Open on YouTube", url: page }],
  };
}

// Perthro devlogs playlist on the AzPepoze YouTube channel.
const PERTHRO_PLAYLIST = "PLr6Nl-A8PXhxhHBmEeVc64ns1Cpi8ygYc";

function withDevlogs(item: Featured): Featured {
  if (!item.name.startsWith("Perthro")) return item;
  return {
    ...item,
    image: thumb("Jc3KQFecuMc"),
    images: [playlistEmbed(PERTHRO_PLAYLIST)],
    video: true,
    links: [...item.links, { label: "Devlogs on YouTube", url: playlistPage(PERTHRO_PLAYLIST) }],
  };
}

const gameItems: Featured[] = featuredProjects
  .filter((project) => project.category === "game")
  .map(fromProject)
  .map(withDevlogs);

// Playlists from the AzPepoze channel, plus the uploads of the AzPepoze2 cover channel (UU + channel id).
const musicItems: Featured[] = [
  playlist({ name: "Remixes", listId: "PLr6Nl-A8PXhwjiXddfsmlHgCX4bpNxvLq", cover: "NinnYx1ck8c", desc: "My remixes of songs I like.", tag: "Remix", count: 18 }),
  playlist({ name: "Original Music", listId: "PLr6Nl-A8PXhzm5TACMb7g-bGHn4R4kVwp", cover: "0hTrb8ngxnM", desc: "Songs I wrote and produced.", tag: "Original", count: 4 }),
  playlist({ name: "Covers", listId: "UUDRDUlWgIMPKxQAMsQsmMpg", cover: "jiN4-AnnPfw", desc: "Vocal covers from my second channel, AzPepoze2.", tag: "Cover", page: "https://www.youtube.com/@AzPepoze2" }),
  playlist({ name: "Instrumentals", listId: "PLr6Nl-A8PXhwWwJ4rxBizc8QI03_FKKae", cover: "SHHiCnvnu8w", desc: "Instrumental versions of my remixes.", tag: "Inst", count: 4 }),
  playlist({ name: "Piano Covers", listId: "PLr6Nl-A8PXhyoGniP2Az6VgHkaVkJdd1g", cover: "lo1P67usmyc", desc: "Piano covers, some with MIDI files.", tag: "Piano", count: 2 }),
];

export const featuredCategories: FeaturedCategory[] = [
  { id: "software", label: "Software", items: softwareItems },
  { id: "game", label: "Games", items: gameItems },
  { id: "music", label: "Music", items: musicItems },
];
