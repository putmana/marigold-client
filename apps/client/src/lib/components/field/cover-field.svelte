<script lang="ts">
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { getPalette } from "$lib/scripts/image-palette/image-palette"

	import ImageInput from "../input/image-input.svelte"
	import PaletteInput from "../input/palette-input.svelte"

	export let cover: Cover | undefined = undefined
	export let palette: Palette = Palette.gray
	export let file: File | undefined = undefined
	export let required = false

	let _src: string

	$: resetFields(cover)

	function resetFields(cvr: Cover | undefined) {
		_src = cvr?.large ?? "public/images/default_cover.png"
	}

	async function handleImageChange(e: CustomEvent) {
		_src = e.detail.url
		file = e.detail.file
		await autoPickPalette()
	}

	async function autoPickPalette() {
		palette = await getPalette(_src)
	}
</script>

<div class="wrapper">
	<ImageInput id="cover" src={_src} label="Cover" on:change={handleImageChange} {required} />
	<PaletteInput bind:palette on:autopick={autoPickPalette} on:change />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}
</style>
