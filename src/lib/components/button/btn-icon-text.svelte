<script lang="ts">
	export let label = "Button"
	export let smaller = false
	export let submit = false
	export let src = "public/icons/unknown.svg"
	export let alt = "button"

	export let trailing = true
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
		gap: 10px;

		img {
			max-width: 100%;
			max-height: 100%;
		}

		&.smaller {
			padding: 8px;
			font-size: x-small;
		}
	}
</style>
