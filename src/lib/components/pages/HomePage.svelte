<script lang="ts">
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
	import { theme } from "$lib/stores/theme";
	import sunIcon from "$lib/assets/sun.svg";
	import moonIcon from "$lib/assets/moon.svg";

	function toggleTheme() {
		theme.update((t) => (t === "light" ? "dark" : "light"));
	}
</script>

<Page index={0}>
	<h1 class="sr-only">AzPepoze - My Portfolio & Showcase</h1>

	<div
		class="center-logo-wrapper"
		in:scrollTransition={{ y: -50, duration: 1000, delay: 300, blur: 5 }}
		out:scrollTransition={{ y: 50, duration: 500, blur: 5 }}
	>
		<div class="logo-container">
			<img src="/img/logo.png" alt="AzPepoze Logo" class="main-logo" />
		</div>
	</div>

	<div
		class="LeftFrame"
		in:scrollTransition={{ y: 100, duration: 1000, delay: 200, blur: 5 }}
		out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
	>
		<TiltCard className="tilt-card-container" bg={false}>

			<HeaderText
				text="HELLO!"
				className="MainText StrokeText glitch-header"
				typing={true}
				nowrap={true}
			/>
			<div class="SubText">Welcome to my digital space.</div>

			<div class="theme-toggle-container">
				<button
					class="theme-btn"
					onclick={toggleTheme}
					aria-label="Toggle Theme"
				>
					<div class="icon-pod">
						{#if $theme === "dark"}
							<img
								src={sunIcon}
								alt="Sun"
								width="20"
								height="20"
								class="theme-icon"
							/>
						{:else}
							<img
								src={moonIcon}
								alt="Moon"
								width="20"
								height="20"
								class="theme-icon"
							/>
						{/if}
					</div>
					<span>{$theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span
					>
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
			<div
				id="google_translate_element"
				class="google-translate-container"
			></div>

			<div class="SubText CenterText">
				<br />Choose your language and explore.<br />
				Navigate through the menu to see my work.
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

	.center-logo-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		pointer-events: none;
	}

	.logo-container {
		width: 150px;
		height: 150px;
		filter: drop-shadow(0 10px 20px var(--accent-color));
		animation: FloatingLogo 5s ease-in-out infinite;
		will-change: transform;
		pointer-events: auto;
	}

	.main-logo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: filter 0.3s;
		filter: var(--theme-icon-filter);
	}

	@keyframes FloatingLogo {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-12px);
		}
	}

	@media (max-width: 1024px) {
		.center-logo-wrapper {
			position: relative;
			top: auto;
			left: auto;
			transform: none;
			margin: 2rem auto;
			display: flex;
			justify-content: center;
			order: -1;
		}
		
		.logo-container {
			width: 100px;
			height: 100px;
		}

		.theme-toggle-container {
			justify-content: center;
			margin-top: 1rem;
		}

		.CenterText {
			margin-top: 1rem;
		}

		:global(.tilt-card-container) {
			width: 100%;
			max-width: 320px;
			padding: 1rem;
		}
	}
</style>
