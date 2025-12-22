<script lang="ts">
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { page } from "$lib/stores/page";
	import { scrollTransition } from "$lib/transitions/custom-transitions";

	interface Repo {
		html_url: string;
		name: string;
		stargazers_count: number;
		description: string | null;
		language: string | null;
		updated_at: string;
	}

	export let repos: Repo[] = [];
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
			<div
				in:scrollTransition={{ y: 100, duration: 1000, delay: 400, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
				class="project-card"
			>
				<TiltCard className="project-card">
					<div class="media-container">
						<iframe
							src="https://www.youtube.com/embed/videoseries?si=tuTqFvJaufMJfvyV&amp;list=PLr6Nl-A8PXhxhHBmEeVc64ns1Cpi8ygYc&autoplay=1&loop=1&mute=1&playsinline=1"
							title="Perthro"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
					</div>
					<div class="content-wrapper">
						<div class="title">Perthro</div>
						<div class="description">
							<p><strong>Genre:</strong> Open World RPG (Roblox)</p>
							<p><strong>Role:</strong> Solo Developer</p>
							<p>
								<strong>Status:</strong>
								<span class="status-tag developing">In Development</span>
							</p>
						</div>
					</div>
				</TiltCard>
			</div>

			<div
				in:scrollTransition={{ y: 100, duration: 1000, delay: 600, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
				class="project-card"
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
							<p><strong>Type:</strong> Browser Extension</p>
							<p>
								<strong>Available:</strong>
								<a
									href="https://chrome.google.com/webstore/detail/dnjjchajjdnfbjhjclmilicgheglcopj"
									target="_blank"
									class="link">Chrome</a
								>,
								<a
									href="https://addons.mozilla.org/en-US/firefox/addon/newtube-youtubestylecustomizer/"
									target="_blank"
									class="link">Firefox</a
								>
							</p>
							<p><strong>Status:</strong> <span class="status-tag public">Public</span></p>
						</div>
					</div>
				</TiltCard>
			</div>
		</div>

		<div
			class="repos-column"
			in:scrollTransition={{ x: 50, duration: 1000, delay: 800, blur: 5 }}
			out:scrollTransition={{ x: 50, duration: 500, blur: 5 }}
		>
			<h2 class="section-title">All Repositories</h2>
			<div class="repo-list-wrapper" data-prevent-page-scroll>
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
		padding: 6rem 1rem 2rem;
		overflow-y: auto;
		align-content: flex-start;
	}

	.featured-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 800px;
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
			background: rgba(255, 255, 255, 0.1);
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

	:global(.project-card) {
		display: flex;
		flex-direction: row;
		width: 100%;

		padding-block: 0;
		padding-inline: 10px;
		overflow: hidden;
		margin: 0 auto;

		.media-container {
			width: auto;
			max-width: 50%;
			height: auto;
			max-height: 100%;
			aspect-ratio: 16/9;
			border-radius: 8px;
			overflow: hidden;
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: black;
			flex-shrink: 0;
			margin: auto 0;
			margin-right: 0.5rem;

			iframe {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.content-wrapper {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0.8rem;
			overflow-y: auto;

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

				.link {
					color: #4da6ff;
					text-decoration: none;
					&:hover {
						text-decoration: underline;
					}
				}

				.status-tag {
					display: inline-block;
					padding: 1px 6px;
					border-radius: 10px;
					font-size: 0.75rem;
					font-weight: bold;
					margin-top: 0.2rem;

					&.developing {
						background: rgba(255, 165, 0, 0.2);
						color: orange;
					}
					&.public {
						background: rgba(0, 255, 0, 0.2);
						color: #00ff00;
					}
				}
			}
		}
	}

	@media (min-width: 768px) {
		.ProjectsContainer {
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;
			padding: 8rem 2rem 2rem;
			gap: 3rem;
		}

		.featured-column {
			width: 50%;
			gap: 2rem;
		}

		.repos-column {
			width: 40%;
			padding: 0;
			max-width: 500px;
			height: 100%;
			max-height: 70vh;
			display: flex;
			flex-direction: column;
		}

		.repo-list-wrapper {
			flex: 1;
			overflow-y: auto;
			padding-right: 10px;
			overscroll-behavior: contain;
			padding-block: 20px;
			-webkit-mask-image: linear-gradient(to bottom, transparent, black 20px, black 95%, transparent);

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

		.section-title {
			text-align: left;
			margin-bottom: 1.5rem;
		}

		:global(.project-card) {
			max-width: 100%;

			.content-wrapper {
				padding: 2rem;

				.title {
					font-size: 2.5rem;
					margin-bottom: 1rem;
				}

				.description {
					font-size: 1.2rem;
					line-height: 1.6;

					p {
						margin: 0.5rem 0;
					}
					.status-tag {
						padding: 4px 12px;
						font-size: 1rem;
					}
				}
			}
		}
	}
</style>
