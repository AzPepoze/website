<script lang="ts">
	export let text: string;
	export let className = "";
</script>

<div class="header-text {className}">
	{text}
</div>

<style lang="scss">
	.header-text {
		position: relative;
		font-family: "JetBrains Mono", monospace;
		font-weight: 900;
		color: white;
	}
</style>
