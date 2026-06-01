<script lang="ts">
	import { theme } from "$lib/stores/theme";
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width = $state(0);
	let height = $state(0);

	const cellSize = 80; // The spacing between symbols
	const fontSize = 28; // The visual size of the symbols
	let columns = 0;
	let rows = 0;

	const chars = [
		"□",
		"■",
		"△",
		"▲",
		"○",
		"●",
		"◇",
		"◆",
	];

	interface Cell {
		char: string;
		baseOpacity: number;
		currentOpacity: number;
		x: number;
		y: number;
	}

	let grid: Cell[][] = [];

	function randomChar() {
		return chars[Math.floor(Math.random() * chars.length)];
	}

	function initGrid() {
		columns = Math.ceil(width / cellSize);
		rows = Math.ceil(height / cellSize);
		grid = [];

		for (let c = 0; c < columns; c++) {
			grid[c] = [];
			for (let r = 0; r < rows; r++) {
				// Slightly higher base opacity
				const opacity = Math.random() * 0.03 + 0.02;
				grid[c][r] = {
					char: "●", // All start with filled circle
					baseOpacity: opacity,
					currentOpacity: opacity,
					x: c * cellSize,
					y: r * cellSize,
				};
			}
		}
	}

	function draw() {
		if (!ctx) return;

		// Clear canvas completely
		ctx.clearRect(0, 0, width, height);

		const isLight = $theme === "light";
		const baseColor = isLight ? "0, 0, 0" : "255, 255, 255";
		const highlightColor = isLight ? "0, 0, 0" : "255, 255, 255";

		ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Very slow, calm changes. Only a tiny fraction changes per frame.
		const cellsToGlitch = Math.max(1, Math.floor(columns * rows * 0.001));
		for (let i = 0; i < cellsToGlitch; i++) {
			// Throttle the actual change so it feels very slow and deliberate
			if (Math.random() > 0.05) continue;

			const c = Math.floor(Math.random() * columns);
			const r = Math.floor(Math.random() * rows);
			if (grid[c] && grid[c][r] && grid[c][r].char === "●") {
				let newChar = randomChar();
				// Ensure it actually changes to something else
				while (newChar === "●") newChar = randomChar();
				
				grid[c][r].char = newChar;
				// Noticeable brightness bump
				grid[c][r].currentOpacity = Math.random() * 0.15 + 0.08;
			}
		}

		// Draw
		for (let c = 0; c < columns; c++) {
			for (let r = 0; r < rows; r++) {
				const cell = grid[c][r];

				// Decay gently back to base
				if (cell.currentOpacity > cell.baseOpacity) {
					cell.currentOpacity -= 0.0005;
				} else {
					cell.currentOpacity = cell.baseOpacity;
					cell.char = "●"; // Revert to filled circle when fade completes
				}

				if (cell.currentOpacity > 0.06) {
					ctx.fillStyle = `rgba(${highlightColor}, ${cell.currentOpacity})`;
				} else {
					ctx.fillStyle = `rgba(${baseColor}, ${cell.currentOpacity})`;
				}

				ctx.fillText(
					cell.char,
					cell.x + cellSize / 2,
					cell.y + cellSize / 2,
				);
			}
		}

		requestAnimationFrame(draw);
	}

	onMount(() => {
		const updateSize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
			initGrid();
		};

		updateSize();
		window.addEventListener("resize", updateSize);

		ctx = canvas.getContext("2d", { alpha: true })!;

		// Start animation loop
		let animationId = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener("resize", updateSize);
			cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas bind:this={canvas} class="symbol-canvas"></canvas>

<style>
	.symbol-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}
</style>
