<script lang="ts">
	import { onMount } from "svelte";
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";

	interface Repo {
		html_url: string;
		name: string;
		stargazers_count: number;
		description: string | null;
		language: string | null;
		updated_at: string;
	}

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

<Page index={1}>
	<div
		class="Header"
		in:scrollTransition={{ y: -50, duration: 1000, delay: 200, blur: 5 }}
		out:scrollTransition={{ y: -50, duration: 500, blur: 5 }}
	>
		<HeaderText text="PROJECTS" className="MainText StrokeText" />
	</div>

	<div class="ProjectsContainer">
		<div class="featured-column">
			<h2 class="section-title">Featured Projects</h2>
			<div class="featured-list-wrapper scroll-mask" data-prevent-page-scroll>
				<a
					href="https://github.com/AzPepoze/NewTube"
					target="_blank"
					in:scrollTransition={{ y: 100, duration: 1000, delay: 400, blur: 5 }}
					out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
					class="project-card-link"
				>
					<TiltCard className="project-card">
						<div class="media-container">
							<iframe
								src="https://www.youtube.com/embed/Z3Hrpjsi9AY?rel=0&wmode=opaque&enablejsapi=1&autoplay=1&loop=1&mute=1&playsinline=1&playlist=Z3Hrpjsi9AY"
								title="Newtube"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							></iframe>
						</div>
						<div class="content-wrapper">
							<div class="title">Newtube</div>
							<div class="description">
								<p>Customize your YouTube website with a lot customizable.</p>
							</div>
						</div>
					</TiltCard>
				</a>

				<a
					href="https://github.com/AzPepoze/linux-wallpaperengine-gui"
					target="_blank"
					in:scrollTransition={{ y: 100, duration: 1000, delay: 600, blur: 5 }}
					out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
					class="project-card-link"
				>
					<TiltCard className="project-card">
						<div class="media-container">
							<img
								src="https://github.com/AzPepoze/linux-wallpaperengine-gui/raw/main/showcase/preview-logo.png"
								alt="Linux Wallpaper Engine GUI"
							/>
						</div>
						<div class="content-wrapper">
							<div class="title">Linux Wallpaper Engine GUI</div>
							<div class="description">
								<p>
									A graphical user interface for managing wallpapers on Linux, powered by
									Electron, Svelte, and linux-wallpaperengine.
								</p>
							</div>
						</div>
					</TiltCard>
				</a>

				<a
					href="https://github.com/AzPepoze/media-sync"
					target="_blank"
					in:scrollTransition={{ y: 100, duration: 1000, delay: 800, blur: 5 }}
					out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
					class="project-card-link"
				>
					<TiltCard className="project-card">
						<div class="media-container">
							<img
								src="https://github.com/AzPepoze/media-sync/raw/main/assets/logo.png"
								alt="Media Sync"
							/>
						</div>
						<div class="content-wrapper">
							<div class="title">Media Sync</div>
							<div class="description">
								<p>
									A real-time video watch party application that lets you watch HLS streams
									together with friends in perfect sync.
								</p>
							</div>
						</div>
					</TiltCard>
				</a>

				<a
					href="https://github.com/AzPepoze/gdrive-bisync"
					target="_blank"
					in:scrollTransition={{ y: 100, duration: 1000, delay: 1000, blur: 5 }}
					out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
					class="project-card-link"
				>
					<TiltCard className="project-card">
						<div class="content-wrapper">
							<div class="title">Google Drive Bisync</div>
							<div class="description">
								<p>
									gdrive-bisync is a command-line utility designed to synchronize a local
									directory with a Google Drive folder. It provides robust features for
									keeping your local files and Google Drive in sync, including periodic
									scans, real-time local change detection, and a user-friendly console
									interface.
								</p>
							</div>
						</div>
					</TiltCard>
				</a>
			</div>
		</div>

		<div
			class="repos-column"
			in:scrollTransition={{ x: 50, duration: 1000, delay: 800, blur: 5 }}
			out:scrollTransition={{ x: 50, duration: 500, blur: 5 }}
		>
			<h2 class="section-title">All Repositories</h2>
			<div class="repo-list-wrapper scroll-mask" data-prevent-page-scroll>
				{#if isLoading}
					<div class="loading">Loading...</div>
				{:else}
					<div class="repo-list">
						{#each repos as repo}
							<a href={repo.html_url} target="_blank" class="repo-item">
								<div class="repo-header">
									<span class="repo-name">{repo.name}</span>
									<span class="repo-stars">★ {repo.stargazers_count}</span>
								</div>
								<p class="repo-desc">{repo.description || "No description available."}</p>
								<div class="repo-footer">
									<span class="repo-lang">{repo.language || "Unknown"}</span>
								</div>
							</a>
						{/each}
					</div>
					{#if repos.length === 0}
						<div class="loading">No repositories found.</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</Page>

<style lang="scss">
	.Header {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-top: 2rem;
		position: absolute;
		top: 0;
		z-index: 10;
	}

	.ProjectsContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		height: 100%;
		padding: 8rem 1rem 2rem;
		overflow: hidden;
	}

	.featured-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 800px;
		height: 100%;
		padding-bottom: 2rem;
	}

	.scroll-mask {
		mask-image: linear-gradient(to bottom, transparent, black 20px, black 95%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, black 20px, black 95%, transparent);
	}

	.featured-list-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		overflow-y: auto;
		padding-right: 10px;
		padding-block: 20px;

		/* Scrollbar styling */
		&::-webkit-scrollbar {
			width: 6px;
		}
		&::-webkit-scrollbar-track {
			background: rgba(255, 255, 255, 0.05);
			border-radius: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.2);
			border-radius: 3px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background: rgba(255, 255, 255, 0.4);
		}
	}

	.repos-column {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 800px;
		gap: 1rem;
		padding: 0 10px;
	}

	.section-title {
		font-family: "JetBrains Mono", monospace;
		font-size: 1.5rem;
		color: white;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	.repo-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.repo-item {
		display: flex;
		flex-direction: column;
		background: rgba(10, 10, 10, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 1rem;
		text-decoration: none;
		transition:
			background 0.2s,
			transform 0.2s;

		&:hover {
			background: rgba(30, 30, 30, 1);
			transform: translateY(-2px);
		}

		.repo-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.5rem;

			.repo-name {
				font-family: "JetBrains Mono", monospace;
				font-size: 1.1rem;
				font-weight: 1000;
				color: #ffffff;
			}
			.repo-stars {
				font-size: 0.9rem;
				color: gold;
			}
		}

		.repo-desc {
			font-family: "Nunito", sans-serif;
			font-size: 0.9rem;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 0.8rem;
			line-height: 1.4;
			flex-grow: 1;
		}

		.repo-footer {
			font-family: "Nunito", sans-serif;
			font-size: 0.8rem;
			color: rgba(255, 255, 255, 0.5);

			.repo-lang {
				border-radius: 10px;
				background: rgba(255, 255, 255, 0.2);
				padding-inline: 10px;
			}
		}
	}

	.loading {
		color: white;
		text-align: center;
		font-family: "Nunito", sans-serif;
	}

	.project-card-link {
		text-decoration: none;
		display: block;
		width: 100%;
	}

	:global(.project-card) {
		display: flex;
		flex-direction: row;
		width: calc(100% - 40px); /* Adjust width for margin-inline */
		height: auto;
		min-height: fit-content;

		padding-block: 0;
		padding-inline: 10px;
		margin: 0 20px; /* Add margin-inline */
		background: rgba(10, 10, 10, 0.8) !important; /* Restore dark background */
		transition:
			background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

		&:hover {
			background: rgba(30, 30, 30, 1) !important;
		}

		.media-container {
			width: 130px; /* Smaller base width */
			height: auto;
			aspect-ratio: 16/9;
			border-radius: 8px;
			overflow: hidden;
			background: transparent;
			flex-shrink: 0;
			margin: auto 0;
			margin-right: 0.4rem;
			padding: 5px; /* Reduced padding */

			iframe,
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}

		.content-wrapper {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0.8rem;
			height: auto;
			min-width: 0; /* Prevent overflow */

			.title {
				font-family: "JetBrains Mono", monospace;
				font-size: 1.2rem;
				font-weight: bold;
				margin-bottom: 0.4rem;
				text-align: left;
				color: white;
				flex-shrink: 0;
			}

			.description {
				font-family: "Nunito", sans-serif;
				font-size: 0.85rem;
				line-height: 1.3;
				color: rgba(255, 255, 255, 0.8);

				p {
					margin: 0.2rem 0;
				}
			}
		}
	}

	@media (min-width: 480px) {
		:global(.project-card) {
			.media-container {
				width: 180px;
				padding: 10px;
			}
		}
	}

	@media (min-width: 768px) {
		.ProjectsContainer {
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;
			padding: 10rem 2rem 2rem;
			gap: 3rem;
		}

		.featured-column {
			width: 50%;
			gap: 2rem;
			height: calc(100vh - 12rem);
			padding-right: 0;
			overflow: hidden;
		}

		.featured-list-wrapper {
			overflow-y: auto;
			padding-right: 10px;
			height: 100%;
		}

		.repos-column {
			width: 40%;
			padding: 0;
			max-width: 500px;
			height: calc(100vh - 12rem);
			display: flex;
			flex-direction: column;
		}

		.repo-list-wrapper {
			flex: 1;
			overflow-y: auto;
			padding-right: 10px;
			overscroll-behavior: contain;
			padding-block: 20px;
		}

		.section-title {
			text-align: left;
			margin-bottom: 1.5rem;
			width: 100%;
		}

		:global(.project-card) {
			max-width: calc(100% - 60px);
			margin-inline: 30px;

			.media-container {
				width: 350px;
				padding: 10px;
			}
		}
	}
</style>
