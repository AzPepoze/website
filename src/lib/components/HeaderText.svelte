<script lang="ts">
	import { theme } from "$lib/stores/theme";
	export let text: string;
	export let className = "";
</script>

<div class="header-text {className}" class:light={$theme === "light"}>
	{text}
</div>

<style lang="scss">
	.header-text {
		position: relative;
		font-family: "JetBrains Mono", monospace;
		font-weight: 900;
		color: var(--text-color);
		transition: color 0.3s ease;

		&.StrokeText {
			color: transparent !important;
			-webkit-text-stroke: 1px var(--text-color);
		}
	}
</style>
