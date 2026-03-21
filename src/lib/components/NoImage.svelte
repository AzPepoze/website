<script lang="ts">
	let { className = "" } = $props<{ className?: string }>();
</script>

<div class="no-image {className}">
	<div class="icon-container">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			<circle cx="8.5" cy="8.5" r="1.5" />
			<polyline points="21 15 16 10 5 21" />
			<line x1="2" y1="2" x2="22" y2="22" stroke-width="1.5" />
		</svg>
	</div>
	<p class="message">No preview image yet or I'm lazy to gather the image</p>
</div>

<style lang="scss">
	.no-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		width: 100%;
		height: 100%;
		padding: 2rem;
		text-align: center;
		background: linear-gradient(
			145deg,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0.01) 100%
		);
		border-radius: 24px;
	}

	.icon-container {
		position: relative;
		width: 120px;
		height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-dim);
		opacity: 0.4;
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.05));

		svg {
			width: 100%;
			height: 100%;
		}

		&::after {
			content: "";
			position: absolute;
			inset: -20px;
			background: radial-gradient(
				circle,
				rgba(255, 255, 255, 0.05) 0%,
				transparent 70%
			);
			z-index: -1;
		}
	}

	.message {
		font-family: "JetBrains Mono", monospace;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--text-dim);
		max-width: 280px;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 1px;
		opacity: 0.6;
	}

	:root[data-theme="light"] {
		.no-image {
			background: linear-gradient(
				145deg,
				rgba(0, 0, 0, 0.02) 0%,
				rgba(0, 0, 0, 0.01) 100%
			);
		}

		.icon-container {
			color: var(--text-color);
			opacity: 0.2;
		}

		.message {
			color: var(--text-color);
			opacity: 0.4;
		}
	}
</style>
