<script lang="ts">
	export let label = "Button"
	export let smaller = false
	export let submit = false
	export let src = "public/icons/unknown.svg"
	export let alt = "button"

	export let trailing = false
</script>

<button class="btn" type={submit ? "submit" : "button"} class:smaller on:click>
	{#if trailing}
		{label}
		<img {src} {alt} />
	{:else}
		<img {src} {alt} />
		{label}
	{/if}
</button>

<style lang="scss">
	@use "src/style/mixins";
	.btn {
		@include mixins.button;
		box-sizing: content-box;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;

		img {
			width: 15px;
		}

		&.smaller {
			padding: 8px;
			font-size: x-small;
		}
	}
</style>
