<script lang="ts">
    import Page from "../Page.svelte";
    import TiltCard from "$lib/components/TiltCard.svelte";
    import HeaderText from "$lib/components/HeaderText.svelte";
    import { scrollTransition } from "$lib/transitions/custom-transitions";

    let discordCopied = false;
    let gmailCopied = false;
    let discordTimeout: number | undefined;
    let gmailTimeout: number | undefined;

    function copyToClipboard(text: string, type: "discord" | "gmail") {
        navigator.clipboard.writeText(text).then(() => {
            if (type === "discord") {
                discordCopied = true;
                if (discordTimeout) clearTimeout(discordTimeout);
                discordTimeout = window.setTimeout(
                    () => (discordCopied = false),
                    2000,
                );
            } else {
                gmailCopied = true;
                if (gmailTimeout) clearTimeout(gmailTimeout);
                gmailTimeout = window.setTimeout(
                    () => (gmailCopied = false),
                    2000,
                );
            }
        });
    }
</script>

<Page index={4}>
    <div
        class="LeftFrame"
        in:scrollTransition={{ y: 100, duration: 1000, delay: 200, blur: 5 }}
        out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
    >
        <div class="title-container">
            <HeaderText text="CONTACT" className="MainText StrokeText glitch" />
            <div class="SubText">Let's build something amazing together</div>
        </div>
    </div>

    <div class="RightFrame">
        <div class="contact-grid">
            <div
                in:scrollTransition={{
                    y: 100,
                    duration: 500,
                    delay: 300,
                    blur: 5,
                }}
                out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
            >
                <TiltCard
                    rotationIntensity={15}
                    scale={1.05}
                    className="contact-card-wrapper"
                >
                    <div
                        role="button"
                        tabindex="0"
                        on:click={() =>
                            copyToClipboard("azpepoze01", "discord")}
                        on:keydown={(e) =>
                            e.key === "Enter" &&
                            copyToClipboard("azpepoze01", "discord")}
                        class="contact-card discord"
                        class:copied={discordCopied}
                    >
                        <div class="card-glow"></div>
                        <div class="card-content">
                            <div class="info-section">
                                <div class="icon-box">
                                    <svg
                                        viewBox="0 0 24 24"
                                        class="brand-svg discord"
                                    >
                                        <path
                                            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div class="text-box">
                                    <span class="label">Discord</span>
                                    <span class="value">azpepoze01</span>
                                </div>
                            </div>

                            <div class="action-section">
                                <div class="copy-feedback">
                                    {#if discordCopied}
                                        <span
                                            in:scrollTransition={{
                                                y: 10,
                                                duration: 300,
                                            }}>COPIED!</span
                                        >
                                    {:else}
                                        <span
                                            in:scrollTransition={{
                                                y: -10,
                                                duration: 300,
                                            }}>CLICK TO COPY</span
                                        >
                                    {/if}
                                </div>
                                <div class="svg-container">
                                    <svg
                                        viewBox="0 0 24 24"
                                        class="copy-svg"
                                        class:hidden={discordCopied}
                                    >
                                        <path
                                            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                                        />
                                        <rect
                                            x="8"
                                            y="2"
                                            width="8"
                                            height="4"
                                            rx="1"
                                            ry="1"
                                        />
                                    </svg>
                                    <svg
                                        viewBox="0 0 24 24"
                                        class="check-svg"
                                        class:visible={discordCopied}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </TiltCard>
            </div>

            <div
                in:scrollTransition={{
                    y: 100,
                    duration: 500,
                    delay: 400,
                    blur: 5,
                }}
                out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
            >
                <TiltCard
                    rotationIntensity={15}
                    scale={1.05}
                    className="contact-card-wrapper"
                >
                    <div
                        role="button"
                        tabindex="0"
                        on:click={() =>
                            copyToClipboard("azpepoze@gmail.com", "gmail")}
                        on:keydown={(e) =>
                            e.key === "Enter" &&
                            copyToClipboard("azpepoze@gmail.com", "gmail")}
                        class="contact-card gmail"
                        class:copied={gmailCopied}
                    >
                        <div class="card-glow"></div>
                        <div class="card-content">
                            <div class="info-section">
                                <div class="icon-box">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                                        alt="Gmail"
                                    />
                                </div>
                                <div class="text-box">
                                    <span class="label">Email</span>
                                    <span class="value">azpepoze@gmail.com</span
                                    >
                                </div>
                            </div>

                            <div class="action-section">
                                <div class="copy-feedback">
                                    {#if gmailCopied}
                                        <span
                                            in:scrollTransition={{
                                                y: 10,
                                                duration: 300,
                                            }}>COPIED!</span
                                        >
                                    {:else}
                                        <span
                                            in:scrollTransition={{
                                                y: -10,
                                                duration: 300,
                                            }}>CLICK TO COPY</span
                                        >
                                    {/if}
                                </div>
                                <div class="svg-container">
                                    <svg
                                        viewBox="0 0 24 24"
                                        class="copy-svg"
                                        class:hidden={gmailCopied}
                                    >
                                        <path
                                            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                                        />
                                        <rect
                                            x="8"
                                            y="2"
                                            width="8"
                                            height="4"
                                            rx="1"
                                            ry="1"
                                        />
                                    </svg>
                                    <svg
                                        viewBox="0 0 24 24"
                                        class="check-svg"
                                        class:visible={gmailCopied}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </div>
    </div>
</Page>

<style lang="scss">
    .title-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .contact-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        max-width: 600px;
        padding: 1rem;
    }

    :global(.contact-card-wrapper) {
        height: 120px;
        width: 100%;
    }

    .contact-card {
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.01) 100%
        );
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        display: flex;
        align-items: center;
        padding: 0 2rem;

        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1),
                transparent
            );
            opacity: 0;
            transition: opacity 0.4s;
        }

        &:hover {
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-5px);
            &::before {
                opacity: 1;
            }
            .card-glow {
                opacity: 0.6;
            }
            .icon-box img,
            .icon-box svg {
                transform: scale(1.1) rotate(5deg);
            }
        }

        &.copied {
            border-color: #4ade80;
            background: linear-gradient(
                135deg,
                rgba(74, 222, 128, 0.1) 0%,
                rgba(74, 222, 128, 0.02) 100%
            );
            .card-glow {
                background: radial-gradient(
                    circle at center,
                    rgba(74, 222, 128, 0.4) 0%,
                    transparent 70%
                );
                opacity: 0.8 !important;
            }
        }

        .card-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150%;
            height: 150%;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 70%
            );
            opacity: 0;
            transition:
                opacity 0.6s,
                background 0.4s;
            pointer-events: none;
        }

        .card-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .info-section {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            min-width: 0;
            flex: 1;
        }

        .icon-box {
            width: 56px;
            height: 56px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.1);

            img,
            svg {
                width: 32px;
                height: 32px;
                transition: transform 0.4s;
            }
        }

        .text-box {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
            flex: 1;

            .label {
                font-family: "JetBrains Mono", monospace;
                font-size: 0.75rem;
                color: var(--text-color);
                opacity: 0.5;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .value {
                font-family: "Nunito", sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--text-color);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .action-section {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex-shrink: 0;
        }

        .copy-feedback {
            font-family: "JetBrains Mono", monospace;
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 1px;
            color: var(--text-color);
            opacity: 0.3;
            overflow: hidden;
            height: 1rem;
            display: flex;
            align-items: center;
        }

        .svg-container {
            position: relative;
            width: 24px;
            height: 24px;
        }

        .copy-svg,
        .check-svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .copy-svg {
            color: var(--text-color);
            opacity: 0.4;
            &.hidden {
                opacity: 0;
                transform: scale(0.5) rotate(-45deg);
            }
        }

        .check-svg {
            color: #4ade80;
            opacity: 0;
            transform: scale(1.5) rotate(45deg);
            &.visible {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }

        /* Brand States */
        &.discord:hover {
            background: linear-gradient(
                135deg,
                rgba(88, 101, 242, 0.15) 0%,
                rgba(88, 101, 242, 0.05) 100%
            );
            border-color: rgba(88, 101, 242, 0.4);
            .card-glow {
                background: radial-gradient(
                    circle at center,
                    rgba(88, 101, 242, 0.3) 0%,
                    transparent 70%
                );
            }
            .icon-box {
                background: rgba(88, 101, 242, 0.2);
                border-color: rgba(88, 101, 242, 0.4);
            }
        }

        &.gmail:hover {
            background: linear-gradient(
                135deg,
                rgba(234, 67, 53, 0.15) 0%,
                rgba(234, 67, 53, 0.05) 100%
            );
            border-color: rgba(234, 67, 53, 0.4);
            .card-glow {
                background: radial-gradient(
                    circle at center,
                    rgba(234, 67, 53, 0.3) 0%,
                    transparent 70%
                );
            }
            .icon-box {
                background: rgba(234, 67, 53, 0.2);
                border-color: rgba(234, 67, 53, 0.4);
            }
        }
    }

    @media (max-width: 1024px) {
        :global(.Header) {
            padding: 0.5rem 0;
            margin-bottom: 0.5rem;
        }
        .contact-card {
            padding: 0 1rem;
            min-height: 70px;
            margin-bottom: 0.5rem;
            .icon-box {
                width: 40px;
                height: 40px;
                img,
                svg {
                    width: 20px;
                    height: 20px;
                }
            }
            .text-box .value {
                font-size: 0.9rem;
            }
            .action-section {
                gap: 0.5rem;
            }
            .copy-feedback {
                display: none;
            }
        }
        :global(.contact-card-wrapper) {
            height: auto;
            min-height: 70px;
        }
    }
</style>
