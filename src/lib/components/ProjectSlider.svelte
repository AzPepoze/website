<script lang="ts">
	import { fade } from "svelte/transition";
	import NoImage from "./NoImage.svelte";

	let {
		images = [],
		type = "image",
		title = "",
	} = $props<{
		images: string[];
		type?: "video" | "image" | "icon";
		title?: string;
	}>();

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}
</script>

<div class="slider">
	{#if images.length > 0}
		<div class="media-container">
			{#key currentIndex}
				<div class="slide" in:fade={{ duration: 400 }} out:fade={{ duration: 400 }}>
					{#if type === "video" && images[currentIndex].includes("youtube")}
						<iframe
							src={images[currentIndex]}
							title="{title} demo"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					{:else if type === "icon"}
						<div class="icon-display">
							<NoImage />
						</div>
					{:else}
						<img src={images[currentIndex]} alt="{title} screenshot {currentIndex + 1}" />
					{/if}
				</div>
			{/key}
		</div>

		{#if images.length > 1}
			<div class="controls">
				<button class="nav-btn prev" onclick={prev} aria-label="Previous image">
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
					{#each images as _, i}
						<button
							class="dot"
							class:active={i === currentIndex}
							onclick={() => (currentIndex = i)}
							aria-label="Go to image {i + 1}"
						></button>
					{/each}
				</div>
				<button class="nav-btn next" onclick={next} aria-label="Next image">
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
		{/if}
	{:else}
		<div class="placeholder">
			<span>No images available</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.slider {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.media-container {
		flex: 1;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.icon-display {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 6rem;
			line-height: 1;
			color: var(--text-color);
			background: transparent;
		}

		iframe {
			width: 100%;
			height: 100%;
			border: none;
		}
	}

	.controls {
		position: absolute;
		bottom: 1rem;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		z-index: 10;
		padding: 0.5rem;
	}

	.nav-btn {
		background: var(--bg-color);
		border: 1px solid var(--text-color);
		color: var(--text-color);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;

		&:hover {
			transform: scale(1.1);
			background: #333333;
			box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
		}
	}

	.dots {
		display: flex;
		gap: 0.5rem;
		background: var(--bg-color);
		border: 1px solid var(--stroke-color);
		padding: 0.4rem 0.8rem;
		border-radius: 20px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--text-dim);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;

		&.active {
			background: var(--text-color);
			transform: scale(1.2);
			box-shadow: 0 0 10px var(--text-color);
		}
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-dim);
		font-family: inherit;
	}
</style>
