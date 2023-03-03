<script>
	import Waves from '$lib/components/waves.svelte';

	import Saos from 'saos';

	import { fade } from 'svelte/transition';

	let show = false;
	let hasScrolled = false;

	setTimeout(() => {
		show = true;
	}, 500);
</script>

<svelte:window
	on:scroll={() => {
		hasScrolled = true;
	}}
/>

{#if show}
	<section class="home">
		<div class="header">
			<div class="title" in:fade={{ duration: 400 }}>Ryan Salik</div>
			<div class="subtitle" in:fade={{ duration: 300, delay: 400 }}>Student</div>
		</div>

		{#if !hasScrolled}
			<div class="scroll nib" out:fade={{ duration: 300 }}><i>Scroll Down</i></div>
		{/if}

		<Waves />
	</section>

	<section class="main">
		<Saos animation="fade-in .7s linear both">
			<div class="section-title nib">Contact</div>
		</Saos>

		<div class="links">
			<Saos animation="fade-in .7s linear both">
				Email: <a href="mailto:rssalik14@gmail.com" class="mono">rssalik14@gmail.com</a>
			</Saos>

			<Saos animation="fade-in .7s linear both">
				GitHub: <a href="https://github.com/rsalik" class="mono">rsalik</a>
			</Saos>
		</div>

		<Waves color="#1a1a1a" startingHeight={0.85} />
	</section>
{/if}

<style lang="scss">
	.home {
		font-size: 3em;

		position: relative;

		align-items: center;
		justify-content: center;

		.title {
			position: relative;

			margin-top: -1.6em;
		}

		.subtitle {
			font-size: 0.5em;

			position: relative;

			margin-top: -0.8em;

			text-align: right;

			@media screen and (max-width: $mobile) {
				font-size: 0.6em;

				margin-top: -0.5em;
			}
		}
	}

	.scroll {
		font-size: 0.3em;

		position: absolute;
		z-index: 100;
		right: 0;
		bottom: 0.5em;
		left: 0;

		text-align: center;

		color: $bkg;
	}

	.main {
		color: $bkg;
		background: linear-gradient(to bottom, mix($accent, #fff, 85%), $accent);

		.links {
			z-index: 100;
			@media screen and (max-width: $mobile) {
				font-size: 1.2em;

				padding: 0 2em;
			}
		}
	}

	@keyframes -global-fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
