<script lang="ts">
	import ProjectFooter from "./ProjectFooter.svelte";

	interface Project {
		title: string;
		tagline: string;
		description?: string;
		features?: string[];
		url?: string;
		demoUrl?: string;
		actions?: any;
	}

	let { project } = $props<{ project: Project }>();
</script>

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
			<h3>Main content</h3>
			<ul>
				{#each project.features as feature}
					<li>
						<span>○</span>
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

<style lang="scss">
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
				}
			}
		}
	}

	@media (max-width: 1024px) {
		.project-info {
			height: 100%;
			width: 100%;

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
			}

			.features-list {
				margin-bottom: 1rem;
				ul li {
					font-size: 0.85rem;
				}
			}
		}
	}
</style>
