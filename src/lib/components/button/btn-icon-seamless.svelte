<script lang="ts">
	export let src = "public/icons/unknown.svg"
	export let alt = "Button"
</script>

<button class="btn" on:click>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.clickable;
		box-sizing: content-box;
		padding: 2px;
		border-radius: 5px;
		height: 20px;
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
