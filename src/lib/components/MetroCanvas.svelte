<script lang="ts">
    import { onMount } from "svelte";
    import { theme } from "$lib/stores/theme";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let width = $state(0);
    let height = $state(0);
    let mouseX = $state(0);
    let mouseY = $state(0);
    let targetMouseX = 0;
    let targetMouseY = 0;

    interface Projectile {
        x: number;
        y: number;
        speed: number;
        length: number;
        width: number;
        opacity: number;
        layer: number; // 0: Back, 1: Mid, 2: Front
    }

    let projectiles: Projectile[] = [];
    const projectileCount = 25;
    let spriteCanvas: HTMLCanvasElement;

    function createProjectile(isInitial = false): Projectile {
        const layer = Math.floor(Math.random() * 3);
        const speedMult = [0.5, 1, 2][layer];
        const sizeMult = [0.8, 1, 1.5][layer];

        const p: Projectile = {
            x: isInitial ? Math.random() * width : -200,
            y: isInitial
                ? Math.random() * height
                : Math.random() * height * 1.5 - height * 0.25,
            speed: (Math.random() * 2 + 2) * speedMult,
            length: (Math.random() * 100 + 150) * sizeMult,
            width: (Math.random() * 1 + 1) * sizeMult,
            opacity: [0.1, 0.2, 0.4][layer],
            layer,
        };
        return p;
    }

    function generateSprite() {
        if (!spriteCanvas) spriteCanvas = document.createElement("canvas");
        spriteCanvas.width = 300;
        spriteCanvas.height = 10;
        const sctx = spriteCanvas.getContext("2d")!;
        const currentColor = $theme === "light" ? "0, 0, 0" : "255, 255, 255";

        const gradient = sctx.createLinearGradient(0, 0, 300, 0);
        gradient.addColorStop(0, `rgba(${currentColor}, 0)`);
        gradient.addColorStop(0.5, `rgba(${currentColor}, 0.5)`);
        gradient.addColorStop(1, `rgba(${currentColor}, 1)`);

        sctx.clearRect(0, 0, 300, 10);
        sctx.fillStyle = gradient;
        sctx.fillRect(0, 0, 300, 10);
    }

    $effect(() => {
        $theme; // reactive dependency
        generateSprite();
    });

    function update() {
        if (!ctx || !spriteCanvas) return;
        ctx.clearRect(0, 0, width, height);

        // Smooth mouse lerp
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        const projectileRotation = Math.atan2(0.5, 1);

        projectiles.forEach((p, i) => {
            // Movement
            p.x += p.speed;
            p.y += p.speed * 0.5;

            // Parallax offset
            const parallaxX = (mouseX - width / 2) * (p.layer + 1) * 0.02;
            const parallaxY = (mouseY - height / 2) * (p.layer + 1) * 0.02;

            const drawX = p.x + parallaxX;
            const drawY = p.y + parallaxY;

            // Draw pre-rendered sprite
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(drawX, drawY);
            ctx.rotate(Math.atan2(0.5, 1)); // 45-ish degree angle
            ctx.drawImage(
                spriteCanvas,
                -p.length,
                -p.width / 2,
                p.length,
                p.width,
            );
            ctx.restore();

            // Recycle
            if (p.x > width + 200 || p.y > height + 200) {
                projectiles[i] = createProjectile();
            }
        });

        requestAnimationFrame(update);
    }

    function handleMouseMove(e: MouseEvent) {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;
    }

    onMount(() => {
        const updateSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        updateSize();
        generateSprite();

        window.addEventListener("resize", updateSize);
        window.addEventListener("mousemove", handleMouseMove);

        ctx = canvas.getContext("2d", { alpha: true })!;

        for (let i = 0; i < projectileCount; i++) {
            projectiles.push(createProjectile(true));
        }

        update();

        return () => {
            window.removeEventListener("resize", updateSize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    });
</script>

<canvas bind:this={canvas} class="metro-canvas"></canvas>

<style>
    .metro-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    }
</style>
