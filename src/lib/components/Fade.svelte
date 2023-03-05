<script>
	import Saos from 'saos';
</script>

<Saos animation="fade-in .7s linear both" animation_out="fade-out .4s linear both" top={100}>
	<slot />
</Saos>

<style lang="scss">
	@keyframes -global-fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes -global-fade-out {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
