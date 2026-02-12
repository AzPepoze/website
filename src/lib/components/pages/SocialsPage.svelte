<script>
	import Page from "../Page.svelte";
	import TiltCard from "$lib/components/TiltCard.svelte";
	import HeaderText from "$lib/components/HeaderText.svelte";
	import { scrollTransition } from "$lib/transitions/custom-transitions";
</script>

<Page index={3}>
	<div
		class="LeftFrame"
		in:scrollTransition={{ y: 100, duration: 1000, delay: 200, blur: 5 }}
		out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
	>
		<div class="title-container">
			<HeaderText text="CONNECT" className="MainText StrokeText glitch" />
			<div class="SubText">Find me on these platforms</div>
		</div>
	</div>

	<div class="RightFrame">
		<div class="grid-container">
			<div
				in:scrollTransition={{ y: 100, duration: 500, delay: 200, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
			>
				<TiltCard rotationIntensity={10} className="card-wrapper">
					<a
						href="https://www.youtube.com/channel/UCJ2C0UTfxQo6iGTfudPfoRQ"
						target="_blank"
						class="social-card youtube"
					>
						<div class="card-content">
							<div class="icon-wrapper">
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
									alt="Youtube"
								/>
							</div>
							<div class="text-wrapper">
								<span class="platform">YouTube</span>
								<span class="username">AzPepoze</span>
							</div>
						</div>
						<div class="glow"></div>
					</a>
				</TiltCard>
			</div>

			<div
				in:scrollTransition={{ y: 100, duration: 500, delay: 300, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
			>
				<TiltCard rotationIntensity={10} className="card-wrapper">
					<a href="https://www.pixiv.net/en/users/44970537" target="_blank" class="social-card pixiv">
						<div class="card-content">
							<div class="icon-wrapper">
								<img
									src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/65/cc/d2/65ccd259-6ed6-4e34-20f0-d83018f6663a/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg"
									alt="Pixiv"
								/>
							</div>
							<div class="text-wrapper">
								<span class="platform">Pixiv</span>
								<span class="username">AzPepoze</span>
							</div>
						</div>
						<div class="glow"></div>
					</a>
				</TiltCard>
			</div>

			<div
				in:scrollTransition={{ y: 100, duration: 500, delay: 400, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
			>
				<TiltCard rotationIntensity={10} className="card-wrapper">
					<a href="https://www.tiktok.com/@azpepoze_1" target="_blank" class="social-card tiktok">
						<div class="card-content">
							<div class="icon-wrapper">
								<img
									src="https://img.freepik.com/premium-vector/tik-tok-logo_578229-290.jpg"
									alt="Tiktok"
								/>
							</div>
							<div class="text-wrapper">
								<span class="platform">TikTok</span>
								<span class="username">@azpepoze_1</span>
							</div>
						</div>
						<div class="glow"></div>
					</a>
				</TiltCard>
			</div>

			<div
				in:scrollTransition={{ y: 100, duration: 500, delay: 500, blur: 5 }}
				out:scrollTransition={{ y: -100, duration: 500, blur: 5 }}
			>
				<TiltCard rotationIntensity={10} className="card-wrapper">
					<a href="https://github.com/AzPepoze" target="_blank" class="social-card github">
						<div class="card-content">
							<div class="icon-wrapper">
								<img
									src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
									alt="GitHub"
								/>
							</div>
							<div class="text-wrapper">
								<span class="platform">GitHub</span>
								<span class="username">AzPepoze</span>
							</div>
						</div>
						<div class="glow"></div>
					</a>
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

	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		width: 100%;
		max-width: 800px;
		padding: 0.5rem;
	}

	:global(.card-wrapper) {
		height: 100px;
		width: 100%;
	}

	.social-card {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		width: 100%;
		border: 1px solid var(--stroke-color);
		border-radius: 15px;
		text-decoration: none;
		overflow: hidden;
		transition: border-color 0.3s;
		padding: 0 1.5rem;

		.card-content {
			z-index: 2;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1rem;
			width: 100%;
		}

		.icon-wrapper {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
			border: 1px solid var(--stroke-color);
			flex-shrink: 0;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				filter: grayscale(100%);
				transition: filter 0.3s;
			}
		}

		.text-wrapper {
			text-align: left;
			opacity: 0.8;
			transform: none;
			transition: all 0.3s ease;
			color: var(--text-color);

			.platform {
				display: block;
				font-family: "JetBrains Mono", monospace;
				font-size: 0.9rem;
				font-weight: bold;
				margin-bottom: 0.1rem;
				transition: color 0.3s;
				color: var(--text-color);
			}

			.username {
				font-family: "Nunito", sans-serif;
				font-size: 0.75rem;
				transition: color 0.3s;
				color: var(--text-color);
			}
		}

		/* Desktop Styles */
		@media (min-width: 768px) {
			flex-direction: column;
			justify-content: center;
			border-radius: 20px;
			padding: 0;

			.card-content {
				flex-direction: column;
				gap: 1.5rem;
			}

			.icon-wrapper {
				width: 80px;
				height: 80px;
				border-width: 2px;
			}

			.text-wrapper {
				text-align: center;
				opacity: 0.7;
				transform: translateY(10px);

				.platform {
					font-size: 1.2rem;
				}
				.username {
					font-size: 0.9rem;
				}
			}
		}

		/* Glow Effect */
		.glow {
			position: absolute;
			width: 600px;
			height: 600px;
			background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
			top: calc(var(--mouse-y, 0) - 300px);
			left: calc(var(--mouse-x, 0) - 300px);
			opacity: 0;
			transition:
				opacity 0.3s,
				background 0.3s;
			pointer-events: none;
			z-index: 1;
		}

		/* Hover States */
		&:hover {
			.glow {
				opacity: 1;
			}
			.icon-wrapper {
				transform: scale(1.1);
				img {
					filter: grayscale(0%);
				}
			}
			.text-wrapper {
				opacity: 1;
				transform: translateY(0);
			}
		}

		/* Brand Specific Colors */
		&.youtube:hover {
			border-color: #ff0000;
			.icon-wrapper {
				border-color: #ff0000;
			}
			.text-wrapper .platform {
				color: #ff0000 !important;
			}
			.text-wrapper .username {
				color: #ff0000 !important;
			}
			.glow {
				background: radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, transparent 60%);
			}
		}

		&.pixiv:hover {
			border-color: #0096fa;
			.icon-wrapper {
				border-color: #0096fa;
			}
			.text-wrapper .platform {
				color: #0096fa !important;
			}
			.text-wrapper .username {
				color: #0096fa !important;
			}
			.glow {
				background: radial-gradient(circle, rgba(0, 150, 250, 0.15) 0%, transparent 60%);
			}
		}

		&.tiktok:hover {
			border-color: #ff0050;
			.icon-wrapper {
				border-color: #ff0050;
			}
			.text-wrapper .platform {
				color: #ff0050 !important;
			}
			.text-wrapper .username {
				color: #ff0050 !important;
			}
			.glow {
				background: radial-gradient(circle, rgba(255, 0, 80, 0.15) 0%, transparent 60%);
			}
		}

		&.github:hover {
			border-color: #a855f7;
			.icon-wrapper {
				border-color: #a855f7;
			}
			.text-wrapper .platform {
				color: #a855f7 !important;
			}
			.text-wrapper .username {
				color: #a855f7 !important;
			}
			.glow {
				background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%);
			}
		}
	}

	/* Desktop Overrides for Grid/Wrapper */
	@media (min-width: 768px) {
		.grid-container {
			gap: 2rem;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			padding: 1rem;
		}
		:global(.card-wrapper) {
			height: 300px;
		}
	}

	@media (max-width: 480px) {
		.grid-container {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}
		:global(.card-wrapper) {
			height: 80px;
		}
		.social-card {
			padding: 0 1rem;
			.icon-wrapper {
				width: 35px;
				height: 35px;
			}
			.text-wrapper .platform {
				font-size: 0.85rem;
			}
		}
	}
</style>
