<script lang="ts">
	interface ProjectAction {
		label: string;
		url: string;
		icon?: string;
	}

	let {
		githubUrl = "",
		demoUrl = "",
		actions = [],
	} = $props<{
		githubUrl: string;
		demoUrl?: string;
		actions?: ProjectAction[];
	}>();
</script>

<div class="project-footer">
	<div class="links">
		{#if actions && actions.length > 0}
			{#each actions as action}
				<a
					href={action.url}
					target="_blank"
					class="footer-btn demo-btn"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
						></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
					<span>{action.label}</span>
				</a>
			{/each}
		{:else if demoUrl}
			<a href={demoUrl} target="_blank" class="footer-btn demo-btn">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
					></path>
					<polyline points="15 3 21 3 21 9"></polyline>
					<line x1="10" y1="14" x2="21" y2="3"></line>
				</svg>
				<span>Live Demo</span>
			</a>
		{/if}
		{#if githubUrl && githubUrl.includes("github.com")}
			<a href={githubUrl} target="_blank" class="footer-btn github-btn">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
					></path>
				</svg>
				<span>GitHub</span>
			</a>
		{/if}
	</div>
</div>

<style lang="scss">
	.project-footer {
		width: 100%;
		padding: 1.5rem 0;
		border-top: 1px solid rgba(var(--accent-rgb), 0.2);
		margin-top: auto;
	}

	.links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.footer-btn {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.8rem 1.5rem;
		border-radius: 12px;
		font-family: "JetBrains Mono", monospace;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border: 1px solid var(--stroke-color);

		&.demo-btn {
			background: var(--text-color);
			color: var(--bg-color) !important;

			* {
				color: var(--bg-color) !important;
			}

			&:hover {
				background: var(--accent-color);
				color: var(--text-color) !important;
				transform: translateY(-2px);
				box-shadow: 0 4px 15px rgba(var(--accent-rgb), 0.4);

				* {
					color: var(--text-color) !important;
				}
			}
		}

		&.github-btn {
			background: var(--accent-color);
			color: var(--text-color);
			border: 1px solid var(--stroke-color);

			&:hover {
				background: rgba(var(--accent-rgb), 0.1);
				transform: translateY(-2px);
				border-color: var(--text-color);
			}
		}
	}
	@media (max-width: 1024px) {
		.project-footer {
			padding: 1rem 0;
			margin-top: 1rem;
		}

		.links {
			gap: 0.5rem;
			justify-content: center;
		}

		.footer-btn {
			padding: 0.6rem 0.8rem;
			font-size: 0.75rem;
			border-radius: 8px;
			flex: 1;
			min-width: 120px;
			justify-content: center;
			gap: 0.4rem;

			svg {
				width: 16px;
				height: 16px;
			}
		}
	}
</style>
