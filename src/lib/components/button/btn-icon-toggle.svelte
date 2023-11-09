<script lang="ts">
	export let src = "public/icons/unknown.svg"
	export let alt = "Button"
	export let size = 20

	$: sizeCSS = `--size: ${size}px`
</script>

<button class="btn" on:click style={sizeCSS}>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.button;
		box-sizing: content-box;
		height: var(--size);
		width: var(--size);
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
