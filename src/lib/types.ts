export interface Project {
	title: string;
	tagline: string;
	description?: string;
	features?: string[];
	url: string; // GitHub URL
	demoUrl?: string;
	actions?: { label: string; url: string; icon?: string }[];
	category?: "game" | "software" | "other";
	type: "video" | "image" | "icon";
	src: string; // This can be the main image or first image
	images?: string[]; // Multiple images for the slider
}

export type Theme = 'light' | 'dark';

export interface Repo {
	html_url: string;
	name: string;
	stargazers_count: number;
	description: string | null;
	language: string | null;
	updated_at: string;
}
