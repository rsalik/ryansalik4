<script>
	import { accent, bkg, mobile } from '$lib/stores';
	import { onMount } from 'svelte';
	import '../styles/style.scss';

	onMount(() => {
		accent.set(getComputedStyle(document.documentElement).getPropertyValue('--accent'));
		bkg.set(getComputedStyle(document.documentElement).getPropertyValue('--bkg'));
		mobile.set(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mobile')));
	});
</script>

<slot />
