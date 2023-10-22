<script lang="ts">
	import { getPalette, resizeImage } from "$lib/scripts/image-palette/image-palette"
	import { onMount } from "svelte"

	let colors = []

	onMount(async () => {
		colors = await getPalette("public/images/two_time.jpg")
	})
</script>

<div class="wrapper">
	{#each colors as c}
		<div class="swatch" style={`--color: rgb(${c.R} ${c.G}, ${c.B})`}>
			<p>{`${c.R}, ${c.G}, ${c.B}`}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.wrapper {
		.swatch {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 300px;
			height: 50px;
			background-color: var(--color);
		}
	}
</style>
