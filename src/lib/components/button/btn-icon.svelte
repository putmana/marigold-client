<script lang="ts">
	export let src = "public/icons/unknown.svg"
	export let alt = "Button"
	export let submit = false
</script>

<button type={submit ? "submit" : "button"} class="btn" on:click>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use "src/style/mixins";
	@use "src/style/colors";

	.btn {
		@include mixins.button;
		box-sizing: content-box;
		height: 20px;
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 20px;
		}
	}
</style>
