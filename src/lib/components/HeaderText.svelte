<script lang="ts">
	import { theme } from "$lib/stores/theme";

	let {
		text,
		className = "",
		typing = false,
		nowrap = false,
	} = $props<{
		text: string;
		className?: string;
		typing?: boolean;
		nowrap?: boolean;
	}>();

	let lines = $derived(text.split("\n"));

	function getGlobalIndex(lineIdx: number, charIdx: number) {
		let index = 0;
		for (let i = 0; i < lineIdx; i++) {
			index += lines[i].length;
		}
		return index + charIdx;
	}

	function getWords(line: string) {
		let words = [];
		let currentWord = [];
		for (let i = 0; i < line.length; i++) {
			if (line[i] === " ") {
				if (currentWord.length > 0) words.push(currentWord);
				words.push([{ char: " ", index: i }]);
				currentWord = [];
			} else {
				currentWord.push({ char: line[i], index: i });
			}
		}
		if (currentWord.length > 0) words.push(currentWord);
		return words;
	}
</script>

<div class="header-text-container {className}" class:light={$theme === "light"}>
	<div class="header-text">
		{#each lines as line, lineIdx}
			<div class="line" class:nowrap={nowrap}>
				{#each getWords(line) as word}
					<span class="word">
						{#each word as { char, index }}
							<span
								class="char"
								style:--index={getGlobalIndex(lineIdx, index)}
								>{char === " " ? "\u00A0" : char}</span
							>
						{/each}
					</span>
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
		
		&.nowrap {
			flex-wrap: nowrap;
			white-space: nowrap;
		}
	}

	.word {
		display: flex;
		flex-wrap: nowrap;
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
