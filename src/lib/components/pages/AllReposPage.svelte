<script lang="ts">
	import { onMount } from "svelte";
	import Page from "../Page.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
	import type { Repo } from "$lib/types";

	let repos: Repo[] = [];
	let isLoading = true;

	onMount(async () => {
		try {
			const res = await fetch("https://api.github.com/users/AzPepoze/repos?per_page=100");
			if (res.ok) {
				const data: Repo[] = await res.json();
				repos = data.sort((a, b) => {
					const starsDiff = b.stargazers_count - a.stargazers_count;
					if (starsDiff !== 0) return starsDiff;
					return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
				});
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	});
</script>

<Page index={2}>
	<div class="PageContent">
		<div
			class="HeaderContainer"
			in:scrollTransition={{ y: -50, duration: 1000, delay: 200, blur: 5 }}
			out:scrollTransition={{ y: -50, duration: 500, blur: 5 }}
		>
			<HeaderText text="GITHUB PROJECTS" className="MainText StrokeText" />
		</div>

		<div class="RepoContainer scroll-mask" data-prevent-page-scroll>
			{#if isLoading}
				<div class="loading">Fetching data...</div>
			{:else}
				<div class="repo-dense-grid">
					{#each repos as repo}
						<a href={repo.html_url} target="_blank" class="mini-repo-card">
							<div class="card-content">
								<div class="repo-top">
									<span class="name">{repo.name}</span>
									<span class="stars">
										<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
										{repo.stargazers_count}
									</span>
								</div>
								{#if repo.description}
									<p class="desc">{repo.description}</p>
								{/if}
								<div class="footer">
									{#if repo.language}
										<span class="lang">{repo.language}</span>
									{/if}
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</Page>

<style lang="scss">
	.PageContent {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 2rem;
	}

	.HeaderContainer {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-bottom: 2rem;
		flex-shrink: 0;
		z-index: 10;
	}

	.RepoContainer {
		flex: 1;
		width: 100%;
		padding: 2rem;
		padding-bottom: 8rem;
		overflow-y: auto;
		display: flex;
		justify-content: center;
		-webkit-overflow-scrolling: touch;
	}

	.repo-dense-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
		max-width: 1200px;
		height: fit-content;
	}

	.mini-repo-card {
		text-decoration: none;
		background: var(--accent-color);
		border: 1px solid var(--stroke-color);
		border-radius: 16px;
		padding: 1.2rem;
		transition: all 0.3s ease;

		&:hover {
			background: var(--repo-card-hover);
			border-color: var(--star-color);
			transform: translateY(-3px);

			.stars {
				color: var(--star-color);
				text-shadow: 0 0 10px var(--star-bg);
			}

			.lang {
				border-color: var(--star-border);
				background: var(--star-bg);
			}
		}

		.repo-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.5rem;

			.name {
				font-family: "JetBrains Mono", monospace;
				color: var(--text-color);
				font-weight: 600;
				font-size: 1rem;
			}

			.stars {
				display: flex;
				align-items: center;
				gap: 4px;
				font-size: 0.8rem;
				color: var(--star-color);
				font-weight: 600;
			}
		}

		.desc {
			font-family: "Nunito", sans-serif;
			font-size: 0.85rem;
			color: var(--text-color);
			opacity: 0.7;
			margin: 0.5rem 0 1rem;
			line-height: 1.4;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.footer {
			.lang {
				font-family: "JetBrains Mono", monospace;
				font-size: 0.7rem;
				color: var(--star-color);
				opacity: 0.8;
				background: var(--star-bg);
				border: 1px solid var(--star-border);
				padding: 3px 10px;
				border-radius: 8px;
			}
		}
	}

	.loading {
		color: var(--text-color);
		text-align: center;
		padding: 4rem;
		opacity: 0.5;
	}

	.scroll-mask {
		mask-image: linear-gradient(to bottom, transparent, var(--bg-color) 10%, var(--bg-color) 90%, transparent);
	}

	@media (min-width: 768px) {
		.repo-dense-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1100px) {
		.repo-dense-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>