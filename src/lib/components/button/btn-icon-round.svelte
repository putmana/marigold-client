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
		@include mixins.button;
		box-sizing: border-box;
		height: 50px;
		width: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;

		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
