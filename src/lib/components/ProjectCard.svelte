<script lang="ts">
	import NoImage from "./NoImage.svelte";
	interface Project {
		title: string;
		tagline: string;
		description?: string;
		features?: string[];
		url?: string;
		demoUrl?: string;
		src?: string;
		images?: string[];
		category?: string;
	}

	let { project, onclick } = $props<{
		project: Project;
		onclick: () => void;
	}>();

	let coverImage = $derived(
		project.images && project.images.length > 0
			? project.images[0]
			: project.src,
	);
</script>

<button class="project-card" {onclick} aria-label="View details for {project.title}">
	<div class="image-wrapper">
		{#if coverImage}
			<img src={coverImage} alt={project.title} loading="lazy" />
		{:else}
			<div class="placeholder-img">
				<NoImage className="card-fallback" />
			</div>
		{/if}
		<div class="overlay">
			<span class="view-text">View Details</span>
		</div>
	</div>
	<div class="card-content">
		<h3 class="title">{project.title}</h3>
		<p class="tagline">{project.tagline}</p>
	</div>
</button>

<style lang="scss">
	.project-card {
		display: flex;
		flex-direction: column;
		background: var(--sub-bg-color, var(--card-bg, #1a1a1a));
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		overflow: hidden;
		cursor: pointer;
		text-align: left;
		padding: 0;
		margin: 0;
		width: 100%;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

		&:hover {
			transform: translateY(-8px);
			box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
			border-color: var(--accent-color, #a855f7);

			.image-wrapper img {
				transform: scale(1.05);
			}

			.overlay {
				opacity: 1;
			}
		}
	}

	:global([data-theme="light"]) .project-card {
		background: var(--bg-secondary, #f9f9f9);
		border-color: var(--stroke-color, #e0e0e0);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

		&:hover {
			box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);
		}
	}

	.image-wrapper {
		width: 100%;
		aspect-ratio: 16 / 9;
		position: relative;
		overflow: hidden;
		background: #000;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
		}

		.placeholder-img {
			width: 100%;
			height: 100%;
			background: linear-gradient(135deg, var(--sub-bg-color) 0%, var(--bg-color) 100%);
			
			:global(.card-fallback) {
				padding: 1rem;
				gap: 0.5rem;
			}
			:global(.card-fallback .icon-container) {
				width: 48px;
				height: 48px;
				color: var(--text-color) !important;
				opacity: 1 !important;
			}
			:global(.card-fallback .message) {
				font-size: 0.6rem;
				max-width: 80%;
				color: var(--text-color) !important;
				opacity: 1 !important;
			}
		}

		.overlay {
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			transition: opacity 0.3s ease;
			backdrop-filter: blur(2px);

			.view-text {
				color: white;
				font-family: "JetBrains Mono", monospace;
				font-weight: 700;
				padding: 0.5rem 1rem;
				border: 2px solid white;
				border-radius: 30px;
				transform: translateY(10px);
				transition: transform 0.3s ease;
			}
		}
	}

	.project-card:hover .overlay .view-text {
		transform: translateY(0);
	}

	.card-content {
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;

		.title {
			margin: 0;
			font-family: "JetBrains Mono", monospace;
			font-size: 1.3rem;
			color: var(--text-color);
			font-weight: 800;
		}

		.tagline {
			margin: 0;
			font-family: "Nunito", sans-serif;
			font-size: 0.85rem;
			color: var(--text-dim, #888);
			letter-spacing: 1px;
			text-transform: uppercase;
		}
	}
</style>
