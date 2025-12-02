<script>
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { page } from "$lib/stores/page";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
</script>

<Page>
	{#if $page === 1}
		<div
			class="Header"
			in:scrollTransition={{ y: -50, duration: 1000, delay: 200, blur: 5 }}
			out:scrollTransition={{ y: -50, duration: 500, blur: 5 }}
		>
			<HeaderText text="PROJECTS" className="MainText StrokeText" />
		</div>

		<div class="ProjectsContainer">
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
	{/if}
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
		display: flex; /* Flex layout */
		flex-direction: column;
		align-items: center;

		gap: 1.5rem;
		width: 100%;

		height: 100%;
		padding: 6rem 1rem 2rem;
		overflow-y: auto;
		align-content: flex-start;
	}

	:global(.project-card) {
		display: flex;
		flex-direction: row;
		width: 100%;

		padding-block: 0;
		padding-inline: 10px;
		overflow: hidden;
		margin: 0 auto; /* Center if singular */

		.media-container {
			/* 16:9 Aspect Ratio Constraint */
			width: auto;
			max-width: 50%; /* Ensure it doesn't crowd text */
			height: auto;
			max-height: 100%;
			aspect-ratio: 16/9;

			border-radius: 8px; /* Matching inner radius */
			overflow: hidden;
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: black;
			flex-shrink: 0;
			margin: auto 0; /* Center vertically */
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
			padding: 8rem 2rem 2rem;
			gap: 2rem;
		}

		:global(.project-card) {
			max-width: 800px; /* Wider cards on desktop */

			.content-wrapper {
				padding: 2rem;

				.title {
					font-size: 2.5rem; /* Larger title */
					margin-bottom: 1rem;
				}

				.description {
					font-size: 1.2rem; /* Larger text */
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
