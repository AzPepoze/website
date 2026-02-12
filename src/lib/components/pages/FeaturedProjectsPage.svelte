<script lang="ts">
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";

	let activeIndex = 0;
	const projects = [
		{
			title: "NewTube",
			tagline: "Next-gen YouTube Customization",
			url: "https://github.com/AzPepoze/NewTube",
			type: "video",
			src: "https://www.youtube-nocookie.com/embed/Z3Hrpjsi9AY?rel=0&controls=0&mute=1",
		},
		{
			title: "Wallpaper Engine",
			tagline: "Linux GUI for Wallpaper Engine",
			url: "https://github.com/AzPepoze/linux-wallpaperengine-gui",
			type: "image",
			src: "https://github.com/AzPepoze/linux-wallpaperengine-gui/raw/main/showcase/preview-logo.png",
		},
		{
			title: "Media Sync",
			tagline: "Real-time Watch Party Sync",
			url: "https://github.com/AzPepoze/media-sync",
			type: "image",
			src: "https://github.com/AzPepoze/media-sync/raw/main/assets/logo.png",
		},
		{
			title: "GDrive BiSync",
			tagline: "Cloud Storage Synchronizer",
			url: "https://github.com/AzPepoze/gdrive-bisync",
			type: "icon",
			src: "☁️",
		},
	];

	function next() {
		activeIndex = (activeIndex + 1) % projects.length;
	}

	function prev() {
		activeIndex = (activeIndex - 1 + projects.length) % projects.length;
	}
</script>

<Page index={1}>
	<div class="Header">
		<HeaderText text="FEATURED" className="MainText StrokeText" />
	</div>

	<div class="StageContainer">
		<div class="stage">
			{#each projects as project, i}
				{@const offset = i - activeIndex}
				{@const absOffset = Math.abs(offset)}
				<!-- Handle wrapping for circular feel -->
				{@const normalizedOffset =
					offset > projects.length / 2
						? offset - projects.length
						: offset < -projects.length / 2
							? offset + projects.length
							: offset}

				<div
					class="card-wrapper"
					class:active={i === activeIndex}
					style:--offset={normalizedOffset}
					style:--abs-offset={Math.abs(normalizedOffset)}
					style:z-index={10 - Math.abs(normalizedOffset)}
				>
					<a href={project.url} target="_blank" class="project-link">
						<TiltCard className="stage-card">
							<div class="card-inner">
								<div class="media-box" class:contain={project.type === "image"}>
									{#if project.type === "video"}
										<iframe src={project.src} title={project.title} frameborder="0"
										></iframe>
									{:else if project.type === "image"}
										<img src={project.src} alt={project.title} />
									{:else}
										<div class="icon-placeholder">{project.src}</div>
									{/if}
								</div>
								<div class="info">
									<h3 class="title">{project.title}</h3>
									<p class="tagline">{project.tagline}</p>
								</div>
							</div>
						</TiltCard>
					</a>
				</div>
			{/each}
		</div>

		<div class="controls">
			<button on:click={prev} class="control-btn" aria-label="Previous">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
					><path d="M15 18l-6-6 6-6" /></svg
				>
			</button>
			<div class="dots">
				{#each projects as _, i}
					<button class="dot" class:active={i === activeIndex} on:click={() => (activeIndex = i)}
					></button>
				{/each}
			</div>
			<button on:click={next} class="control-btn" aria-label="Next">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
					><path d="M9 18l6-6-6-6" /></svg
				>
			</button>
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
		z-index: 20;
		pointer-events: none;
	}

	.StageContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		perspective: 1500px;
		overflow: visible;
		padding-top: 4rem;
	}

	.stage {
		position: relative;
		width: 100%;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
	}

	.card-wrapper {
		position: absolute;
		width: 320px;
		height: 450px;
		transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		
		/* Simple 2D-like positioning for side cards to avoid perspective conflicts */
		transform: translateX(calc(var(--offset) * 110%)) scale(calc(1 - var(--abs-offset) * 0.2));
		opacity: calc(1 - var(--abs-offset) * 0.4);
		pointer-events: none;
		z-index: calc(10 - var(--abs-offset));

		&.active {
			pointer-events: auto;
			opacity: 1;
			z-index: 20;
			/* Only apply 3D transform to active card if needed, or rely on TiltCard */
			transform: translateX(0) scale(1);
		}
	}

	.project-link {
		text-decoration: none;
		display: block;
		height: 100%;
		transform-style: preserve-3d;
	}

	:global(.stage-card) {
		height: 100%;
		background: var(--card-gradient) !important;
		border: 1px solid var(--accent-color) !important;
		border-radius: 32px !important;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3) !important;
		overflow: hidden; /* Ensure inner content follows radius */

		.card-inner {
			display: flex;
			flex-direction: column;
			height: 100%;
		}

		.media-box {
			width: 100%;
			flex: 1;
			overflow: hidden;
			background: var(--media-box-bg);

			&.contain img {
				object-fit: contain !important;
				padding: 2rem;
			}

			iframe,
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.icon-placeholder {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 5rem;
			}
		}

		.info {
			padding: 1.5rem;
			background: var(--info-box-bg);
			/* Added rounding to bottom corners */
			border-radius: 0 0 32px 32px;

			.title {
				font-family: "JetBrains Mono", monospace;
				font-size: 1.4rem;
				color: var(--text-color);
				margin: 0 0 0.5rem 0;
			}

			.tagline {
				font-family: "Nunito", sans-serif;
				font-size: 0.9rem;
				color: var(--text-dim);
				margin: 0;
			}
		}
	}

	.controls {
		margin-top: 3rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		z-index: 30;
	}

	.control-btn {
		background: var(--accent-color);
		border: 1px solid var(--stroke-color);
		color: var(--text-color);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;

		&:hover {
			transform: scale(1.1);
			background: var(--accent-color);
			opacity: 0.8;
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
		background: var(--dot-bg);
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;

		&.active {
			background: var(--text-color);
			transform: scale(1.3);
			box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		}
	}

	@media (max-width: 768px) {
		.card-wrapper {
			width: 260px;
			height: 350px;
		}
		.stage {
			height: 380px;
		}
	}
</style>
