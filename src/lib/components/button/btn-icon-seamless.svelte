<script lang="ts">
	export let src = "public/icons/unknown.svg"
	export let alt = "Button"
</script>

<button type="button" class="btn" on:click on:focusout>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use "src/style/mixins";

	.btn {
		@include mixins.clickable;
		box-sizing: content-box;
		padding: 2px;
		border-radius: 5px;
		min-width: 20px;
		min-height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 20px;
		}
	}
</style>
