<script>
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
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
			<div class="SubText">First of all, Please choose your language.</div>
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
				<br />You can scroll (Mouse), swipe (Touch screen)<br />and select page at bottom to change page.
			</div>
		</TiltCard>
	</div>
</Page>

<style lang="scss">
	:global(.glitch-header) {
		margin-bottom: 1rem;
	}

	:global(.typing-cursor) {
		border-right: 0.1em solid white;
		padding-right: 0.1em;
		animation: Typing 0.8s infinite;
		display: inline-block;
	}

	@keyframes Typing {
		0% {
			border-color: transparent;
		}
		50% {
			border-color: white;
		}
		100% {
			border-color: transparent;
		}
	}
</style>
