import type { Project } from "../types";

export const featuredProjects: Project[] = [
	{
		title: "NewTube",
		tagline: "Customizing YouTube with ease.",
		description: "A browser extension that allows users to customize the YouTube interface, adding or removing features to suit their preferences.",
		features: [
			"Customizable UI elements",
			"Lightweight and fast",
			"Cross-browser support (Chrome & Firefox)"
		],
		url: "https://github.com/AzPepoze/NewTube",
		category: "software",
		actions: [
			{ label: "Install on Chrome", url: "https://chrome.google.com/webstore/detail/youtube-style-customizer/dnjjchajjdnfbjhjclmilicgheglcopj" },
			{ label: "Install on Firefox", url: "https://addons.mozilla.org/en-US/firefox/addon/newtube-youtubestylecustomizer/" }
		],
		type: "video",
		src: "https://www.youtube-nocookie.com/embed/Z3Hrpjsi9AY?rel=0&controls=0&mute=1",
		images: [
			"https://www.youtube-nocookie.com/embed/Z3Hrpjsi9AY?rel=0&controls=0&mute=1"
		]
	},
	{
		title: "Linux Wallpaper Engine GUI",
		tagline: "Sleek GUI for Wallpaper Engine on Linux.",
		description: "A graphical user interface for managing wallpapers on Linux, powered by Go and Electron. It's designed for maximum memory efficiency.",
		features: [
			"Steam Workshop integration",
			"Playlist support",
			"Multi-monitor management",
			"Memory efficient (Electron process terminates on minimize)"
		],
		url: "https://github.com/AzPepoze/linux-wallpaperengine-gui",
		category: "software",
		type: "image",
		src: "https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine-gui/main/showcase/preview-logo.png",
		images: [
			"https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine-gui/main/showcase/main.png",
			"https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine-gui/main/showcase/main-list.png",
			"https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine-gui/main/showcase/display.png",
			"https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine-gui/main/showcase/workshop.png"
		]
	},
	{
		title: "GoProton",
		tagline: "Independent Proton instance manager.",
		description: "A games launcher for non-Steam games on Linux using umu (Unified Linux Runtime). Manage and run Windows applications through Proton seamlessly.",
		features: [
			"Stand-alone detached process lifecycle",
			"Process isolation for multi-game support",
			"Real-time terminal integration for logging",
			"Minimal memory footprint"
		],
		url: "https://github.com/AzPepoze/goproton",
		category: "software",
		type: "image",
		src: "https://raw.githubusercontent.com/AzPepoze/goproton/main/docs/home.png",
		images: [
			"https://raw.githubusercontent.com/AzPepoze/goproton/main/docs/home.png",
			"https://raw.githubusercontent.com/AzPepoze/goproton/main/docs/add_games.png",
			"https://raw.githubusercontent.com/AzPepoze/goproton/main/docs/run.png",
			"https://raw.githubusercontent.com/AzPepoze/goproton/main/docs/prefix.png"
		]
	},
	{
		title: "Linux Wallpaper Engine\n{STILL IN DEVELOPMENT}",
		tagline: "Native Go implementation of Wallpaper Engine.",
		description: "A high-performance reimplementation of Wallpaper Engine for Linux systems, written in Go using Raylib.",
		features: [
			"High-performance Raylib rendering",
			"Argument compatibility with Almamu/linux-wallpaperengine implementation",
			"Support for scene.pkg and folder formats",
			"Audio system with PipeWire support"
		],
		url: "https://github.com/AzPepoze/linux-wallpaperengine",
		category: "software",
		type: "image",
		src: "https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine/master/docs/preview.png",
		images: [
			"https://raw.githubusercontent.com/AzPepoze/linux-wallpaperengine/master/docs/preview.png"
		]
	},
	{
		title: "GDrive BiSync",
		tagline: "Robust two-way Google Drive sync tool.",
		description: "A command-line utility for bidirectional synchronization between a local directory and a Google Drive folder, focusing on efficiency and stability.",
		features: [
			"Fast incremental updates via Changes API",
			"Real-time local monitoring",
			"Parallel remote scanning",
			"Smart conflict resolution and state persistence"
		],
		url: "https://github.com/AzPepoze/gdrive-bisync",
		category: "software",
		type: "icon",
		src: "☁️",
		images: []
	},
	{
		title: "WaifuPaper",
		tagline: "Cross-platform anime wallpaper app.",
		description: "Displays random high-quality anime wallpapers from Konachan directly on your desktop. Supports both Linux and Windows.",
		features: [
			"Cross-platform support (Linux & Windows)",
			"Smooth crossfade transitions",
			"System tray integration",
			"Native web engine usage for low footprint"
		],
		url: "https://github.com/AzPepoze/waifupaper",
		category: "software",
		type: "image",
		src: "https://raw.githubusercontent.com/AzPepoze/waifupaper/main/showcase/screen1.png",
		images: [
			"https://raw.githubusercontent.com/AzPepoze/waifupaper/main/showcase/screen1.png"
		]
	},
	{
		title: "StyleShift",
		tagline: "Personalize any website's appearance.",
		description: "A browser extension that enables users to inject custom CSS and JS into websites, providing a way to completely overhaul their browsing experience.",
		features: [
			"Inject custom CSS/JS with live UI",
			"Theme export and import",
			"Support for both Chrome and Firefox",
			"Persistent UI overrides"
		],
		url: "https://github.com/AzPepoze/StyleShift",
		category: "software",
		type: "icon",
		src: "🎨",
		images: []
	},
	{
		title: "Browser As Wallpaper",
		tagline: "Web page as your live wallpaper.",
		description: "A modern, cross-platform application that hosts any web page as your desktop wallpaper. High performance using native system web engines.",
		features: [
			"Support any URL or local web page",
			"Cross-platform (Linux & Windows)",
			"Minimal system footprint",
			"System tray integration"
		],
		url: "https://github.com/AzPepoze/browser-as-wallpaper",
		category: "software",
		type: "icon",
		src: "🌐",
		images: []
	},
	{
		title: "Waifu Randomizer",
		tagline: "Random anime wallpaper generator.",
		description: "A tool to generate and manage random anime wallpapers from various sources, providing a fresh look to your desktop every time.",
		features: [
			"Multiple source support",
			"High-quality content filtering",
			"Easy integration with other tools",
			"Lightweight and fast"
		],
		url: "https://github.com/AzPepoze/waifu-randomizer",
		category: "software",
		type: "icon",
		src: "🎲",
		actions: [
			{ label: "Website", url: "https://waifu-randomizer.azpepoze.com/" },
		],
		images: []
	}
	,
	{
		title: "How to Flirt With a Girl",
		tagline: "A short experimental game.",
		description: "Short experimental narrative game.\n\nSubmitted to GMTK Patreon Jam 2024.",
		features: ["Experimental narrative", "Short playtime"],
		url: "https://azpepoze.itch.io/how-to-flirt-with-a-girl",
		category: "game",
		demoUrl: "https://azpepoze.itch.io/how-to-flirt-with-a-girl",
		actions: [{ label: "Itch.io", url: "https://azpepoze.itch.io/how-to-flirt-with-a-girl" }],
		type: "image",
		src: "https://img.itch.zone/aW1nLzE5MDIwMjQ5LmpwZw==/original/9BZcI5.jpg",
		images: [
			"https://img.itch.zone/aW1nLzE5MDIwMjQ5LmpwZw==/original/9BZcI5.jpg",
			"https://img.itch.zone/aW1hZ2UvMzE4NTI3MS8xOTAyMDE3NC5wbmc=/original/wJcSFy.png",
			"https://img.itch.zone/aW1hZ2UvMzE4NTI3MS8xOTAyMDE3NS5wbmc=/347x500/uLEs2d.png"
		]
	},
	{
		title: "Maskderer",
		tagline: "A small game project.",
		description: "Short horror game about a murderer. Best experienced by downloading;\n\nSubmitted to Winter MelonJam 2025.",
		features: ["Indie mechanics", "Built for fun"],
		url: "https://azpepoze.itch.io/maskderer",
		category: "game",
		demoUrl: "https://azpepoze.itch.io/maskderer",
		actions: [
			{ label: "Itch.io", url: "https://azpepoze.itch.io/maskderer" },
			{ label: "Source", url: "https://github.com/AzPepoze/Maskderer" }
		],
		type: "image",
		src: "https://img.itch.zone/aW1nLzI0Nzc2NjEwLmpwZw==/original/cqf0xq.jpg",
		images: [
			"https://img.itch.zone/aW1nLzI0Nzc2NjEwLmpwZw==/original/cqf0xq.jpg",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc4MzUyOC5wbmc=/347x500/szpExn.png",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc4MzU1NS5wbmc=/347x500/qCByoT.png",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc4MzUzMS5wbmc=/347x500/GJ%2BT3X.png",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc4MzU0Mi5wbmc=/347x500/lE5Ds5.png",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc2MTc5Mi5wbmc=/347x500/ShZLxK.png",
			"https://img.itch.zone/aW1hZ2UvNDE1NDg4Ni8yNDc2MTc5NC5wbmc=/347x500/ftvUGL.png"
		]
	}
	,
	{
		title: "Tani (ตานี)",
		tagline: "Game about a cute Thai ghost.",
		description: "Short spooky game about a cute Thai ghost. Play on itch.io.\n\nSubmitted for SAIG.",
		features: ["Short spooky experience", "Cute ghost character"],
		url: "https://azpepoze.itch.io/tani",
		category: "game",
		demoUrl: "https://azpepoze.itch.io/tani",
		actions: [{ label: "Itch.io", url: "https://azpepoze.itch.io/tani" }],
		type: "icon",
		src: "👻",
		images: []
	}
	,
	{
		title: "Perthro (Showcase)",
		tagline: "Graphics showcase for Perthro.",
		description: "Graphics showcase demo for Perthro. Demo available on Roblox.\n\nThis game will not be released as a full game; Because I've moved to godot game engine.",
		features: ["Graphics showcase"],
		url: "https://www.roblox.com/id/games/14913055408/Perthro",
		category: "game",
		demoUrl: "https://www.roblox.com/id/games/14913055408/Perthro",
		actions: [{ label: "Play on Roblox", url: "https://www.roblox.com/id/games/14913055408/Perthro" }],
		type: "icon",
		src: "🎮",
		images: []
	}
];
