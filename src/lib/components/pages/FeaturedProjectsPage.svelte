<script lang="ts">
	import Page from "../Page.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import ProjectSlider from "$lib/components/ProjectSlider.svelte";
	import ProjectFooter from "$lib/components/ProjectFooter.svelte";
	import { featuredProjects } from "$lib/data/projects";
	import { fly } from "svelte/transition";

	let activeIndex = $state(0);
	let categoryFilter = $state("all");
	let selectedIndex = $state(0);

	let projects = $derived(
		categoryFilter === "all"
			? featuredProjects
			: featuredProjects.filter((p) =>
					p.category
						? p.category === categoryFilter
						: categoryFilter === "software",
				),
	);

	$effect(() => {
		selectedIndex =
			categoryFilter === "all"
				? 0
				: categoryFilter === "software"
					? 1
					: 2;
	});

	function next() {
		activeIndex = (activeIndex + 1) % projects.length;
	}

	function prev() {
		activeIndex = (activeIndex - 1 + projects.length) % projects.length;
	}

	$effect(() => {
		if (!projects || projects.length === 0) {
			activeIndex = 0;
			return;
		}
		if (activeIndex >= projects.length) activeIndex = 0;
	});
</script>

<Page index={1} className="ProjectPage">
	<div class="Header">
		<HeaderText text="FEATURED" className="MainText StrokeText" />
	</div>

	<div class="filter-controls" style="--i: {selectedIndex}">
		<div class="thumb" aria-hidden="true"></div>
		<button
			class:active={categoryFilter === "all"}
			onclick={() => (categoryFilter = "all")}
		>
			All
		</button>
		<button
			class:active={categoryFilter === "software"}
			onclick={() => (categoryFilter = "software")}
		>
			Software
		</button>
		<button
			class:active={categoryFilter === "game"}
			onclick={() => (categoryFilter = "game")}
		>
			Games
		</button>
	</div>

	<div class="ProjectStage">
		<div class="project-view-container">
			{#key categoryFilter}
				<div
					in:fly={{ y: 20, duration: 600, delay: 200 }}
					out:fly={{ y: -20, duration: 400 }}
					class="filter-transition-wrapper"
				>
					{#key activeIndex}
						{@const project = projects[activeIndex]}
						<div
							class="project-view"
							in:fly={{ x: 50, duration: 800, delay: 200 }}
							out:fly={{ x: -20, duration: 400 }}
						>
							<div class="left-side">
								<ProjectSlider
									images={project.images &&
									project.images.length > 0
										? project.images
										: [project.src]}
									type={project.type}
									title={project.title}
								/>
							</div>

							<div class="right-side">
								<div class="project-info">
									<h2 class="title">{project.title}</h2>
									<p class="tagline">{project.tagline}</p>

									{#if project.description}
										<p class="description">
											{project.description}
										</p>
									{/if}

									{#if project.features && project.features.length > 0}
										<div class="features-list">
											<h3>Key Features</h3>
											<ul>
												{#each project.features as feature}
													<li>
														<svg
															width="18"
															height="18"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
														>
															<polyline
																points="20 6 9 17 4 12"
															></polyline>
														</svg>
														<span>{feature}</span>
													</li>
												{/each}
											</ul>
										</div>
									{/if}

									<ProjectFooter
										githubUrl={project.url}
										demoUrl={project.demoUrl}
										actions={project.actions}
									/>
								</div>
							</div>
						</div>
					{/key}
				</div>
			{/key}
		</div>

		<div class="navigation">
			<button
				onclick={prev}
				class="nav-btn"
				aria-label="Previous project"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>
			<div class="dots">
				{#each projects as _, i}
					<button
						class="dot"
						class:active={i === activeIndex}
						onclick={() => (activeIndex = i)}
						aria-label="Go to project {i + 1}"
					></button>
				{/each}
			</div>
			<button onclick={next} class="nav-btn" aria-label="Next project">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</div>
	</div>
</Page>

<style lang="scss">
	/* Scoped Page override for this specific screen structure */
	:global(.ProjectPage) {
		display: flex !important;
		flex-direction: column !important;
		justify-content: flex-start !important;
		align-items: center !important;
		height: 100vh;
		overflow: hidden;
	}

	.Header {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 0.5rem 0; /* Reduced from 1rem */
		z-index: 20;
		pointer-events: none;
		position: relative;
		flex-shrink: 0;

		:global(.MainText) {
			font-size: 5rem;
		}
	}

	.filter-controls {
		margin-top: 0.5rem;
		pointer-events: auto;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		gap: 0.5rem;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 6px;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.02),
			rgba(0, 0, 0, 0.02)
		);
		border-radius: 999px;
		border: 1px solid var(--stroke-color);

		.thumb {
			position: absolute;
			top: 6px;
			left: 6px;
			width: calc((100% - 12px) / 3);
			height: calc(100% - 12px);
			background: var(--text-color);
			border: 1px solid rgba(var(--accent-rgb), 0.12);
			border-radius: 999px;
			box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.12);
			transition:
				transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
				background 200ms ease;
			transform: translateX(calc(var(--i, 0) * 100%));
			pointer-events: none;
			z-index: 1;
		}

		button {
			position: relative;
			z-index: 2;
			padding: 0.5rem 1rem;
			border-radius: 999px;
			border: none;
			background: transparent;
			color: var(--text-color);
			cursor: pointer;
			font-family: "JetBrains Mono", monospace;
			font-weight: 700;
			transition: color 180ms ease;

			&.active {
				color: var(--bg-color);
			}
		}
	}

	.ProjectStage {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		overflow: visible;
	}

	.project-view-container {
		position: relative;
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		.filter-transition-wrapper {
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.project-view {
		position: absolute;
		top: 55%; /* Moved slightly down from 50% */
		left: 0;
		transform: translateY(-50%);
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 3rem;
		width: 100%;
		align-items: center;
	}

	/* Theme-Consistent Descriptive Variables */
	:root {
		--project-card-bg: var(--sub-bg-color);
		--project-card-border: rgba(255, 255, 255, 0.1);
		--project-title-start: #ffffff;
		--project-title-end: rgba(255, 255, 255, 0.4);
		--project-tagline-color: var(--text-color);
		--project-description-color: var(--text-dim);
		--project-nav-bg: #171717;
		--project-nav-hover-bg: #333333;
		--project-nav-text: #ffffff;
	}

	:root[data-theme="light"] {
		--project-card-bg: var(--bg-secondary);
		--project-card-border: var(--stroke-color);
		--project-title-start: var(--text-color);
		--project-title-end: rgba(0, 0, 0, 0.4);
		--project-tagline-color: var(--text-color);
		--project-description-color: var(--text-dim);
		--project-nav-bg: #f0f0f5;
		--project-nav-hover-bg: #e0e0e0;
		--project-nav-text: #1a1a1a;
	}

	.left-side {
		width: 100%;
		aspect-ratio: 16 / 9;
		height: auto;
		border-radius: 32px;
		background: var(--project-card-bg);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		border: 1px solid var(--project-card-border);
	}

	.right-side {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
	}

	.project-info {
		display: flex;
		flex-direction: column;

		.title {
			font-family: "JetBrains Mono", monospace;
			font-size: 2.2rem;
			color: var(--text-color);
			margin: 0;
			line-height: 1.1;
			background: linear-gradient(
				135deg,
				var(--project-title-start) 30%,
				var(--project-title-end) 100%
			);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-weight: 800;
		}

		.tagline {
			font-family: "Nunito", sans-serif;
			font-size: 1rem;
			color: var(--project-tagline-color);
			margin: 0.5rem 0 1.2rem;
			font-weight: 700;
			letter-spacing: 4px;
			text-transform: uppercase;
			opacity: 1;
		}

		.description {
			font-family: "Nunito", sans-serif;
			font-size: 1.05rem;
			color: var(--text-dim);
			white-space: pre-wrap;
			line-height: 1.6;
			margin-bottom: 2rem;
		}

		.features-list {
			margin-bottom: 2rem;

			h3 {
				font-family: "JetBrains Mono", monospace;
				font-size: 0.8rem;
				color: var(--text-color);
				text-transform: uppercase;
				letter-spacing: 2px;
				margin-bottom: 0.8rem;
				opacity: 0.5;
			}

			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				display: grid;
				grid-template-columns: 1fr;
				gap: 0.6rem;

				li {
					display: flex;
					align-items: center;
					gap: 0.8rem;
					font-family: "Nunito", sans-serif;
					color: var(--text-color);
					font-size: 0.9rem;

					svg {
						color: var(--accent-color);
						flex-shrink: 0;
					}
				}
			}
		}
	}

	.navigation {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		z-index: 30;
		flex-shrink: 0;
	}

	.nav-btn {
		background: var(--project-nav-bg);
		border: 1px solid var(--project-card-border);
		color: var(--project-nav-text);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

		&:hover {
			transform: scale(1.1);
			background: var(--project-nav-hover-bg);
			box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
		}
	}

	.dots {
		display: flex;
		gap: 0.8rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--text-dim);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;

		&.active {
			background: var(--text-color);
			transform: scale(1.4);
			box-shadow: 0 0 15px var(--text-color);
		}
	}

	@media (max-width: 1024px) {
		:global(.ProjectPage) {
			padding: 1rem !important;
			height: 100vh !important;
			overflow: hidden !important;
			display: flex !important;
			flex-direction: column !important;
		}

		.Header {
			padding: 0.5rem 0;
			flex-shrink: 0;
			:global(.MainText) {
				font-size: 2rem;
			}
		}

		.ProjectStage {
			flex: 1;
			width: 100%;
			padding: 0;
			margin-bottom: 80px; /* Adjusted for BottomNav */
			position: relative;
			display: flex;
			flex-direction: column;
			overflow: hidden; /* Contain transitions */
		}

		.project-view-container {
			flex: 1;
			position: relative;
			width: 100%;
			overflow: visible;
		}

		.project-view {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			transform: none;
			padding-bottom: 60px; /* Space for dots */
		}

		.left-side {
			width: 100%;
			aspect-ratio: 16 / 9;
			height: auto;
			flex-shrink: 0;
			margin-bottom: 0.5rem;
			max-width: 500px;
		}

		.right-side {
			flex: 1;
			overflow-y: auto;
			padding-bottom: 80px; /* Space for absolute navigation within project-view */
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
		}

		.project-info {
			.title {
				font-size: 1.8rem;
			}

			.tagline {
				font-size: 0.9rem;
				letter-spacing: 2px;
			}

			.description {
				font-size: 0.9rem;
				line-height: 1.5;
				margin-bottom: 1rem;
				white-space: pre-wrap;
			}

			.features-list {
				margin-bottom: 1rem;
				ul li {
					font-size: 0.85rem;
				}
			}
		}

		.navigation {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1.5rem;
			z-index: 50;
			background: none;
			pointer-events: auto;

			.nav-btn {
				width: 40px;
				height: 40px;
			}

			.dots {
				display: flex;
				gap: 0.6rem;
				overflow-x: auto;
				max-width: 180px;
				padding: 4px 10px;
				scrollbar-width: none;
				-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar {
					display: none;
				}

				.dot {
					flex-shrink: 0;
					width: 8px;
					height: 8px;
				}
			}
		}
	}
</style>
