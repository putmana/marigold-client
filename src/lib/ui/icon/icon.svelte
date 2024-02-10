<script lang="ts">
	export let src: string
	export let alt: string
</script>

<img {src} {alt} />

<style lang="scss">
	@use "../vars";

	img {
		display: block;
		height: vars.$button_content_size;
	}
</style>
