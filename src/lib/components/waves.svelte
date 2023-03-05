<script lang="ts">
	import { onMount } from 'svelte';
	import { createNoise2D } from 'simplex-noise';
	import { lerpColor } from '$lib/util';
	import { accent } from '$lib/stores';
	import { get } from 'svelte/store';

	const simplex = createNoise2D();

	let canvas: HTMLCanvasElement;
	let w = 1,
		h = 1;

	let iw = 1,
		ih = 1;

	export let startingHeight = 0.7;
	export let color =  get(accent);
	export let inverse = false;

	const resScale = 2;

	$: {
		w = iw * resScale;
		h = ih * resScale;
	}

	let t = 0;

	onMount(() => {
		draw();
	});

	function n(x: number, y: number) {
		return simplex(x / 450, y / 450);
	}

	function draw() {
		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		ctx.clearRect(0, 0, w, h);

		let colorUp = lerpColor(color, '#000000', 0.35),
			colorDown = lerpColor(color, '#ffffff', 0.15);

		drawWave(ctx, inverse ? colorDown : colorUp, startingHeight - 0.05, 100, 0.5, -100);
		drawWave(ctx, color, startingHeight, 80);
		drawWave(ctx, inverse ? colorUp : colorDown, startingHeight + 0.05, 60, 2.5, 100);

		setTimeout(() => {
			t += 1;
			draw();
		}, 10);
	}

	function drawWave(
		ctx: CanvasRenderingContext2D,
		color: string,
		height: number,
		variation: number,
		speed = 1,
		seed = 0
	) {
		const inc = w / 200;

		ctx.beginPath();
		ctx.moveTo(0, h);

		for (let x = 0; x <= w + 1; x += inc) {
			const y = height * h - n(x + t * speed, seed + t / 2) * variation;

			ctx.lineTo(x, y);
		}

		ctx.lineTo(w, h);
		ctx.lineTo(0, h);

		ctx.fillStyle = color;
		ctx.fill();
	}
</script>

<svelte:window bind:innerHeight={ih} bind:innerWidth={iw} />

<canvas bind:this={canvas} width={w} height={h} />

<style lang="scss">
	canvas {
		position: absolute;
		bottom: 0;
		left: 0;

		width: 100vw;
		height: 100vh;
	}
</style>
