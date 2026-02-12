<script>
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
	import { theme } from "$lib/stores/theme";

	function toggleTheme() {
		theme.update(t => t === 'light' ? 'dark' : 'light');
	}
</script>

<Page index={0}>
	<h1 class="sr-only">AzPepoze - My Portfolio & Showcase</h1>
	<div
		class="LeftFrame"
		in:scrollTransition={{ y: 100, duration: 1000, delay: 200, blur: 5 }}
		out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
	>
		<TiltCard className="tilt-card-container" bg={false}>
			<HeaderText text="HELLO!" className="MainText StrokeText glitch-header typing-cursor" />
			<div class="SubText">Welcome to my digital space.</div>
			
			<div class="theme-toggle-container">
				<button class="theme-btn" on:click={toggleTheme} aria-label="Toggle Theme">
					<div class="icon-pod">
						{#if $theme === 'dark'}
							<img src="/src/lib/assets/sun.svg" alt="Sun" width="20" height="20" class="theme-icon" />
						{:else}
							<img src="/src/lib/assets/moon.svg" alt="Moon" width="20" height="20" class="theme-icon" />
						{/if}
					</div>
					<span>{$theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
				</button>
			</div>
		</TiltCard>
	</div>

	<div
		class="RightFrame"
		in:scrollTransition={{ y: 100, duration: 1000, delay: 400, blur: 5 }}
		out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
	>
		<TiltCard className="tilt-card-container" bg={false}>
			<div id="google_translate_element" class="google-translate-container"></div>

			<div class="SubText CenterText">
				<br />Choose your language and explore.<br />
				Scroll down to see my projects.
			</div>
		</TiltCard>
	</div>
</Page>

<style lang="scss">
	:global(.glitch-header) {
		margin-bottom: 1rem;
	}

	:global(.typing-cursor) {
		border-right: 0.1em solid var(--text-color);
		padding-right: 0.1em;
		animation: Typing 0.8s infinite;
		display: inline-block;
	}

	.theme-toggle-container {
		margin-top: 2rem;
		display: flex;
		justify-content: flex-start;
	}

	.theme-btn {
		background: var(--text-color); /* White in Light, Dark in Dark */
		border: 1px solid var(--stroke-color);
		padding: 0.5rem;
		padding-right: 1.5rem;
		border-radius: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

		.icon-pod {
			width: 40px;
			height: 40px;
			background: #111; /* Always dark to make white icon pop */
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: transform 0.3s ease;
		}

		.theme-icon {
			filter: invert(1); /* ALWAYS WHITE ICON */
		}
		
		span {
			font-family: "JetBrains Mono", monospace;
			font-weight: 800;
			font-size: 0.85rem;
			letter-spacing: 1px;
			color: var(--bg-color); /* Dark text on white button */
		}

		&:hover {
			transform: scale(1.05);
			.icon-pod {
				transform: rotate(20deg);
			}
		}
	}

	@keyframes Typing {
		0% { border-color: transparent; }
		50% { border-color: var(--text-color); }
		100% { border-color: transparent; }
	}
</style>
