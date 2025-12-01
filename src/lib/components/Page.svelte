<div class="Page">
	<slot />
</div>

<style> .Page {
		min-width: 100%;
		scroll-snap-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: -webkit-fill-available;
		height: -moz-available;
		position: relative;
	}

	@media (max-width: 768px) {
		.Page {
			flex-direction: column;
		}
	}

	/* Generic styles for frames within a page */
	:global(.Page > .LeftFrame),
	:global(.Page > .RightFrame) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-width: 50%;
	}

	:global(.Page > .Collum3) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-width: 33.33%;
	}
</style>