<script lang="ts">
	import Page from "../Page.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import ProjectSlider from "$lib/components/ProjectSlider.svelte";
	import ProjectDetails from "$lib/components/ProjectDetails.svelte";
	import ProjectCard from "$lib/components/ProjectCard.svelte";
	import { featuredProjects } from "$lib/data/projects";
	import { fly, fade } from "svelte/transition";
	import { flip } from "svelte/animate";

	let categoryFilter = $state("all");
	let selectedIndex = $state(0);
	
	// Modal state
	let selectedProject: any = $state(null);

	let projects = $derived(
		categoryFilter === "all"
			? featuredProjects
			: featuredProjects.filter((p) =>
					p.category
						? p.category === categoryFilter
						: categoryFilter === "software",
				),
	);

	const categories = [
		{ id: "all", label: "All" },
		{ id: "software", label: "Software" },
		{ id: "game", label: "Games" },
	];

	$effect(() => {
		selectedIndex = categories.findIndex((c) => c.id === categoryFilter);
	});

	// Close modal on escape key
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape" && selectedProject) {
			selectedProject = null;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Page index={1} className="ProjectPage">
	<div class="Header">
		<HeaderText text="FEATURED" className="MainText StrokeText" />
	</div>

	<div class="filter-controls" style="--i: {selectedIndex}">
		<div class="thumb" aria-hidden="true"></div>
		{#each categories as cat}
			<button
				class:active={categoryFilter === cat.id}
				onclick={() => {
					categoryFilter = cat.id;
				}}
			>
				{cat.label}
			</button>
		{/each}
	</div>

	<div class="ProjectStage scroll-mask" data-prevent-page-scroll="true">
		<div class="project-grid">
			{#each projects as project (project.title)}
				<div
					animate:flip={{ duration: 400 }}
					in:fly={{ y: 20, duration: 600, delay: 100 }}
					out:fade={{ duration: 200 }}
				>
					<ProjectCard 
						{project} 
						onclick={() => (selectedProject = project)} 
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- Modal Popup -->
	{#if selectedProject}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div 
			class="modal-overlay" 
			in:fade={{ duration: 200 }} 
			out:fade={{ duration: 200 }}
			onclick={() => (selectedProject = null)}
			data-prevent-page-scroll="true"
		>
			<div 
				class="modal-content project-view"
				onclick={(e) => e.stopPropagation()}
				in:fly={{ y: 50, duration: 400, delay: 100 }}
				out:fly={{ y: 20, duration: 300 }}
			>
				<button class="close-btn" onclick={() => (selectedProject = null)} aria-label="Close modal">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>

				<div class="left-side">
					<ProjectSlider
						images={selectedProject.images && selectedProject.images.length > 0
							? selectedProject.images
							: [selectedProject.src]}
						type={selectedProject.type}
						title={selectedProject.title}
					/>
				</div>

				<div class="right-side">
					<ProjectDetails project={selectedProject} />
				</div>
			</div>
		</div>
	{/if}
</Page>

<style lang="scss">
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
		padding: 0.5rem 0;
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
		z-index: 10;

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
		padding-block: 20px;
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		padding-inline: 1rem;
		pointer-events: auto;
	}

	.scroll-mask {
		mask-image: linear-gradient(
			to bottom,
			transparent,
			black 5%,
			black 95%,
			transparent
		);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		width: 100%;
		padding-bottom: 2rem;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: var(--modal-overlay-bg, rgba(0, 0, 0, 0.75));
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.modal-content {
		position: relative;
		background: transparent;
		width: 100%;
		max-width: 1400px;
		height: 100%;
		border: none;
		box-shadow: none;
		padding: 2rem;
		display: flex;
		gap: 4rem;
		align-items: center;
		justify-content: center;
	}

	.close-btn {
		position: absolute;
		top: 2rem;
		right: 2rem;
		background: var(--modal-btn-bg, rgba(255, 255, 255, 0.1));
		border: 1px solid var(--modal-btn-border, rgba(255, 255, 255, 0.2));
		backdrop-filter: blur(10px);
		color: var(--text-color);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 50;
		transition: all 0.2s ease;

		&:hover {
			background: var(--accent-color);
			color: white;
			transform: scale(1.1);
		}
	}

	:root {
		--project-card-bg: var(--sub-bg-color);
		--project-card-border: rgba(255, 255, 255, 0.1);
		--project-title-start: #ffffff;
		--project-title-end: rgba(255, 255, 255, 0.4);
		--project-tagline-color: var(--text-color);
		--project-description-color: var(--text-dim);
		--modal-overlay-bg: rgba(0, 0, 0, 0.75);
		--modal-btn-bg: rgba(255, 255, 255, 0.1);
		--modal-btn-border: rgba(255, 255, 255, 0.2);
		--modal-left-border: rgba(255, 255, 255, 0.1);
		--modal-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
	}

	:root[data-theme="light"] {
		--project-card-bg: var(--bg-secondary);
		--project-card-border: var(--stroke-color);
		--project-title-start: var(--text-color);
		--project-title-end: rgba(0, 0, 0, 0.4);
		--project-tagline-color: var(--text-color);
		--project-description-color: var(--text-dim);
		--modal-overlay-bg: rgba(255, 255, 255, 0.75);
		--modal-btn-bg: rgba(0, 0, 0, 0.05);
		--modal-btn-border: rgba(0, 0, 0, 0.1);
		--modal-left-border: rgba(0, 0, 0, 0.1);
		--modal-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
	}

	.left-side {
		aspect-ratio: 16 / 9;
		width: min(55%, calc(80vh * 16 / 9));
		height: auto;
		border-radius: 20px;
		background: transparent;
		box-shadow: var(--modal-shadow, 0 20px 50px rgba(0, 0, 0, 0.5));
		overflow: hidden;
		border: 1px solid var(--modal-left-border, rgba(255, 255, 255, 0.1));
		flex-shrink: 0;
	}

	.right-side {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: auto;
		max-height: 90vh;
		width: 45%;
		padding-right: 1rem;
		scrollbar-width: thin;
	}

	@media (max-width: 1024px) {
		:global(.ProjectPage) {
			padding: 0 !important;
			padding-top: 1rem !important;
			padding-bottom: 80px !important;
		}

		.Header {
			:global(.MainText) {
				font-size: 3rem;
			}
		}

		.ProjectStage {
			padding-inline: 1rem;
			padding-top: 1rem;
			overflow-y: auto;
			overscroll-behavior-y: contain;
			-webkit-overflow-scrolling: touch;
		}

		.project-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		/* Mobile Modal */
		.modal-overlay {
			padding: 0;
			align-items: flex-end;
		}

		.modal-content {
			height: 100%;
			padding: 1rem;
			padding-top: 4rem;
			flex-direction: column;
			gap: 2rem;
			overflow-y: auto;
			align-items: center;
			justify-content: flex-start;
		}

		.close-btn {
			top: 1.5rem;
			right: 1.5rem;
			width: 35px;
			height: 35px;
		}

		.left-side {
			width: 100%;
			flex-shrink: 0;
			margin-bottom: 0;
		}

		.right-side {
			width: 100%;
			overflow: visible;
			padding-right: 0;
			padding-bottom: 2rem;
			justify-content: flex-start;
		}
	}
</style>
