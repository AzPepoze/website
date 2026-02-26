<script lang="ts">
	import { theme } from "$lib/stores/theme";

	let {
		text,
		className = "",
		typing = false,
	} = $props<{
		text: string;
		className?: string;
		typing?: boolean;
	}>();

	let lines = $derived(text.split("\n"));

	function getGlobalIndex(lineIdx: number, charIdx: number) {
		let index = 0;
		for (let i = 0; i < lineIdx; i++) {
			index += lines[i].length;
		}
		return index + charIdx;
	}
</script>

<div class="header-text-container {className}" class:light={$theme === "light"}>
	<div class="header-text">
		{#each lines as line, lineIdx}
			<div class="line">
				{#each line.split("") as char, charIdx}
					<span
						class="char"
						style:--index={getGlobalIndex(lineIdx, charIdx)}
						>{char === " " ? "\u00A0" : char}</span
					>
				{/each}
				{#if typing && lineIdx === lines.length - 1}
					<span class="cursor"></span>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.header-text-container {
		position: relative;
		display: inline-block;
	}

	.header-text {
		position: relative;
		font-family: "JetBrains Mono", monospace;
		font-weight: 900;
		color: var(--text-color);
		transition: color 0.3s ease;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.line {
		display: flex;
		flex-wrap: wrap;
		width: auto;
	}

	.char {
		display: inline-block;
		color: transparent;
		-webkit-text-stroke: 1px var(--text-color);
		animation: char-pulse 4s ease-in-out infinite;
		animation-delay: calc(var(--index) * 0.1s);
		will-change: transform;
		opacity: 0.6;
	}

	.cursor {
		display: inline-block;
		width: 0.1em;
		height: 1.2em;
		background-color: var(--text-color);
		margin-left: 0.1em;
		animation: blink 0.8s step-end infinite;
		vertical-align: middle;
	}

	@keyframes char-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.6;
			color: transparent;
			-webkit-text-stroke: 1px var(--text-color);
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
			color: var(--text-color);
			-webkit-text-stroke: 0px transparent;
		}
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
