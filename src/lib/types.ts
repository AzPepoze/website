export interface Project {
	title: string;
	tagline: string;
	url: string;
	type: 'video' | 'image' | 'icon';
	src: string;
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
