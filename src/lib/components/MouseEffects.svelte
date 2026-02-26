<script lang="ts">
	import { onMount } from "svelte";

	let mouseContainer: HTMLElement;
	let mouseX = 0;
	let mouseY = 0;
	let cursorX = 0;
	let cursorY = 0;
	let isHovering = false;

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;

			if (!mouseContainer) return;

			// Check for interactive elements
			const target = e.target as HTMLElement;
			isHovering = !!target.closest(
				'a, button, [role="button"], input, select, textarea',
			);

			// Zero-latency cursor positioning
			const cursor = mouseContainer.querySelector(
				".custom-cursor",
			) as HTMLElement;
			if (cursor) {
				cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
			}

			// Professional Star Trail Effect
			for (let i = 0; i < 4; i++) {
				const trail = document.createElement("div");
				trail.className = "mouse-trail";
				const size = Math.random() * 8 + 4;
				const offsetX = (Math.random() - 0.5) * 15;
				const offsetY = (Math.random() - 0.5) * 15;
				const rotation = Math.random() * 360;

				trail.style.width = `${size}px`;
				trail.style.height = `${size}px`;
				trail.style.left = `${mouseX + offsetX}px`;
				trail.style.top = `${mouseY + offsetY}px`;
				trail.style.setProperty("--rotation", `${rotation}deg`);
				trail.style.background =
					Math.random() > 0.5
						? "var(--text-color)"
						: "var(--accent-color, #fff)";

				mouseContainer.appendChild(trail);
				setTimeout(() => trail.remove(), 800);
			}
		};

		const createParticle = (x: number, y: number, color: string) => {
			const particle = document.createElement("div");
			particle.className = "click-particle";

			const size = Math.random() * 6 + 2;
			const destinationX = (Math.random() - 0.5) * 200;
			const destinationY = (Math.random() - 0.5) * 200;
			const rotation = Math.random() * 360;

			particle.style.cssText = `
				width: ${size}px;
				height: ${size}px;
				background: ${color};
				left: ${x}px;
				top: ${y}px;
				--dx: ${destinationX}px;
				--dy: ${destinationY}px;
				--dr: ${rotation}deg;
			`;

			mouseContainer.appendChild(particle);
			setTimeout(() => particle.remove(), 800);
		};

		const handleMouseDown = (e: MouseEvent) => {
			if (!mouseContainer) return;

			// Primary Ripple
			const ripple = document.createElement("div");
			ripple.className = "click-ripple";
			ripple.style.left = `${e.clientX}px`;
			ripple.style.top = `${e.clientY}px`;
			mouseContainer.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);

			// Secondary Subtle Ripple
			setTimeout(() => {
				const ripple2 = document.createElement("div");
				ripple2.className = "click-ripple-inner";
				ripple2.style.left = `${e.clientX}px`;
				ripple2.style.top = `${e.clientY}px`;
				mouseContainer.appendChild(ripple2);
				setTimeout(() => ripple2.remove(), 500);
			}, 50);

			// Particle Burst
			const colors = ["var(--text-color)", "var(--accent-color)", "#fff"];
			for (let i = 0; i < 12; i++) {
				createParticle(
					e.clientX,
					e.clientY,
					colors[Math.floor(Math.random() * colors.length)],
				);
			}
		};

		window.addEventListener("mousemove", handleMouseMove, {
			passive: true,
		});
		window.addEventListener("mousedown", handleMouseDown, {
			passive: true,
		});

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
		};
	});
</script>

<div bind:this={mouseContainer} id="MouseContainer">
	<div class="custom-cursor" class:hover={isHovering}>
		<div class="cursor-dot"></div>
	</div>
</div>

<style lang="scss">
	:global(html, body, *) {
		@media (hover: hover) and (pointer: fine) {
			cursor: none !important;
		}
	}

	#MouseContainer {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
		overflow: hidden;

		@media (hover: none), (pointer: coarse) {
			display: none;
		}
	}

	.custom-cursor {
		position: absolute;
		width: 16px;
		height: 16px;
		border: 1.5px solid var(--text-color);
		border-radius: 50%;
		top: 0;
		left: 0;
		margin-top: -8px;
		margin-left: -8px;
		display: flex;
		align-items: center;
		justify-content: center;
		will-change: transform;

		/* Transitions ONLY for colors/shadows to keep movement instant */
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			opacity 0.2s ease,
			box-shadow 0.2s ease;

		.cursor-dot {
			width: 4px;
			height: 4px;
			background: var(--text-color);
			border-radius: 50%;
			transition: transform 0.2s cubic-bezier(0.19, 1, 0.22, 1);
		}

		&.hover {
			width: 40px;
			height: 40px;
			margin-top: -20px;
			margin-left: -20px;
			background: var(--text-color);
			border-color: var(--text-color);
			box-shadow: 0 0 30px var(--text-color);
			opacity: 0.8;

			.cursor-dot {
				transform: scale(0);
			}
		}
	}

	:global(.mouse-trail) {
		position: absolute;
		pointer-events: none;
		opacity: 0.8;
		transform: translate(-50%, -50%) rotate(var(--rotation));
		animation: trailFade 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
		clip-path: polygon(
			50% 0%,
			61% 35%,
			98% 35%,
			68% 57%,
			79% 91%,
			50% 70%,
			21% 91%,
			32% 57%,
			2% 35%,
			39% 35%
		);
		box-shadow: 0 0 10px currentColor;
	}

	:global(.click-ripple) {
		position: absolute;
		width: 2px;
		height: 2px;
		border: 1px solid var(--text-color);
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		animation: rippleExpand 0.6s cubic-bezier(0, 0.5, 0.5, 1) forwards;
	}

	:global(.click-ripple-inner) {
		position: absolute;
		width: 2px;
		height: 2px;
		background: radial-gradient(
			circle,
			var(--text-color) 0%,
			transparent 70%
		);
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		animation: rippleExpandInner 0.5s cubic-bezier(0, 0.5, 0.5, 1) forwards;
	}

	:global(.click-particle) {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
		animation: particleShoot 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
	}

	@keyframes trailFade {
		to {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.1);
		}
	}

	@keyframes rippleExpand {
		0% {
			width: 0;
			height: 0;
			opacity: 1;
			border-width: 2px;
		}
		100% {
			width: 100px;
			height: 100px;
			opacity: 0;
			border-width: 0.5px;
		}
	}

	@keyframes rippleExpandInner {
		0% {
			width: 0;
			height: 0;
			opacity: 0.5;
		}
		100% {
			width: 60px;
			height: 60px;
			opacity: 0;
		}
	}

	@keyframes particleShoot {
		0% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}
		100% {
			transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
				rotate(var(--dr)) scale(0);
			opacity: 0;
		}
	}
</style>
