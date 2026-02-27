<script lang="ts">
	import { onMount } from "svelte";

	let mouseContainer: HTMLElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let isHovering = false;
	let particles: Particle[] = [];
	let animationFrame: number;

	class Particle {
		x: number;
		y: number;
		size: number;
		rotation: number;
		color: string;
		life: number = 1;
		decay: number;
		type: "trail" | "click";
		vx: number = 0;
		vy: number = 0;

		constructor(
			x: number,
			y: number,
			size: number,
			color: string,
			type: "trail" | "click",
			vx = 0,
			vy = 0,
		) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.rotation = Math.random() * Math.PI * 2;
			this.color = color;
			this.type = type;
			this.vx = vx;
			this.vy = vy;
			this.decay =
				type === "trail"
					? 0.02 + Math.random() * 0.02
					: 0.015 + Math.random() * 0.015;
		}

		update() {
			this.life -= this.decay;
			this.x += this.vx;
			this.y += this.vy;
			if (this.type === "click") {
				this.rotation += 0.02;
			}
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation);
			ctx.globalAlpha = this.life;
			ctx.fillStyle = this.color;

			if (this.type === "trail") {
				drawStarPath(ctx, 0, 0, 5, this.size, this.size / 2.5);
			} else {
				ctx.beginPath();
				ctx.arc(0, 0, this.size, 0, Math.PI * 2);
			}
			ctx.fill();
			ctx.restore();
		}
	}

	function drawStarPath(
		ctx: CanvasRenderingContext2D,
		cx: number,
		cy: number,
		spikes: number,
		outerRadius: number,
		innerRadius: number,
	) {
		let rot = (Math.PI / 2) * 3;
		let x = cx;
		let y = cy;
		const step = Math.PI / spikes;

		ctx.beginPath();
		ctx.moveTo(cx, cy - outerRadius);
		for (let i = 0; i < spikes; i++) {
			x = cx + Math.cos(rot) * outerRadius;
			y = cy + Math.sin(rot) * outerRadius;
			ctx.lineTo(x, y);
			rot += step;

			x = cx + Math.cos(rot) * innerRadius;
			y = cy + Math.sin(rot) * innerRadius;
			ctx.lineTo(x, y);
			rot += step;
		}
		ctx.lineTo(cx, cy - outerRadius);
		ctx.closePath();
	}

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth * window.devicePixelRatio;
		canvas.height = window.innerHeight * window.devicePixelRatio;
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;
		if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	onMount(() => {
		ctx = canvas.getContext("2d");
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const animate = () => {
			if (!ctx) return;
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.update();
				if (p.life <= 0) {
					particles.splice(i, 1);
				} else {
					p.draw(ctx);
				}
			}

			animationFrame = requestAnimationFrame(animate);
		};
		animate();

		const handleMouseMove = (e: MouseEvent) => {
			if (!mouseContainer) return;

			const target = e.target as HTMLElement;
			isHovering = !!target.closest(
				'a, button, [role="button"], input, select, textarea',
			);

			const cursor = mouseContainer.querySelector(
				".custom-cursor",
			) as HTMLElement;
			if (cursor) {
				cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
			}

			// Add trail particles
			const textColor =
				getComputedStyle(document.documentElement)
					.getPropertyValue("--text-color")
					.trim() || "#fff";
			const accentColor =
				getComputedStyle(document.documentElement)
					.getPropertyValue("--accent-color")
					.trim() || "#fff";

			const size = Math.random() * 2 + 1;
			const offsetX = (Math.random() - 0.5) * 15;
			const offsetY = (Math.random() - 0.5) * 15;
			const color = Math.random() > 0.5 ? textColor : accentColor;

			particles.push(
				new Particle(
					e.clientX + offsetX,
					e.clientY + offsetY,
					size,
					color,
					"trail",
				),
			);
		};

		const handleMouseDown = (e: MouseEvent) => {
			if (!mouseContainer) return;

			// Primary Ripple (Keep DOM for now as it's a simple CSS animation and looks good)
			const ripple = document.createElement("div");
			ripple.className = "click-ripple";
			ripple.style.left = `${e.clientX}px`;
			ripple.style.top = `${e.clientY}px`;
			mouseContainer.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);

			// Particle Burst on Canvas
			const textColor =
				getComputedStyle(document.documentElement)
					.getPropertyValue("--text-color")
					.trim() || "#fff";
			const accentColor =
				getComputedStyle(document.documentElement)
					.getPropertyValue("--accent-color")
					.trim() || "#fff";
			const colors = [textColor, accentColor, "#fff"];

			for (let i = 0; i < 12; i++) {
				const size = Math.random() * 3 + 1;
				const vx = (Math.random() - 0.5) * 8;
				const vy = (Math.random() - 0.5) * 8;
				const color =
					colors[Math.floor(Math.random() * colors.length)];
				particles.push(
					new Particle(
						e.clientX,
						e.clientY,
						size,
						color,
						"click",
						vx,
						vy,
					),
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
			cancelAnimationFrame(animationFrame);
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
		};
	});
</script>

<div bind:this={mouseContainer} id="MouseContainer">
	<canvas bind:this={canvas} id="MouseCanvas"></canvas>
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
</style>
