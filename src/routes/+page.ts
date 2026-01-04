import type { PageLoad } from "./$types";

interface Repo {
	html_url: string;
	name: string;
	stargazers_count: number;
	description: string | null;
	language: string | null;
	updated_at: string;
}

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch("https://api.github.com/users/AzPepoze/repos?per_page=100");
		if (res.ok) {
			const data: Repo[] = await res.json();
			const repos = data.sort((a, b) => {
				// Primary sort: Stars (descending)
				const starsDiff = b.stargazers_count - a.stargazers_count;
				if (starsDiff !== 0) return starsDiff;
				// Secondary sort: Updated date (descending)
				return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
			});
			return { repos };
		}
		return { repos: [] };
	} catch (e) {
		console.error(e);
		return { repos: [] };
	}
};
