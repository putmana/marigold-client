<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let src = "public/icons/unknown.svg"
	export let alt = "Button"
	export let size = 20
	export let toggled: boolean

	$: sizeCSS = `--size: ${size}px`

	function handleClick() {
		toggled = !toggled
		dispatch("click")
	}
</script>

<button class="btn" class:toggled on:click={handleClick} style={sizeCSS}>
	<img {src} {alt} />
</button>

<style lang="scss">
	@use "src/style/mixins";
	@use "src/style/colors";

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

		&::after {
			content: "";
			height: 0px;
			width: 0px;
			border-radius: 5px;
			background-color: colors.$white-a;
			transition: all 0.2s ease-in-out;
		}

		&.toggled {
			&::after {
				content: "";
				margin-top: 5px;
				width: 15px;
				height: 5px;
			}
		}
	}
</style>
