<script lang="ts">
	import { updateCover } from "$lib/scripts/library/covers"
	import { covers } from "$lib/scripts/stores/LibraryStore"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { getPalette } from "$lib/scripts/image-palette/image-palette"

	import ImageInput from "../input/image-input.svelte"
	import PaletteInput from "../input/palette-input.svelte"

	export let coverID: string = ""

	let _id: string = ""
	let _palette: Palette = Palette.gray
	let _file: File | undefined

	let _src: string = ""

	$: resetFields(coverID)

	function resetFields(coverID: string) {
		const _cover = $covers.get(coverID)

		_id = _cover?.id ?? ""
		_src = _cover?.fileLarge ?? ""
		_palette = Palette.parse(_cover?.palette)
		_file = undefined
	}

	async function handleImageChange(e: CustomEvent) {
		_src = e.detail.url
		_file = e.detail.file
		await autoPickPalette()
	}

	async function autoPickPalette() {
		_palette = await getPalette(_src)
	}

	export async function save(): Promise<string> {
		const coverData = {
			id: _id,
			palette: _palette,
			file: _file
		}

		return updateCover(coverData)
	}
</script>

<div class="wrapper">
	<ImageInput id="cover" src={_src} label="Cover" on:change={handleImageChange} required />
	<PaletteInput bind:palette={_palette} on:autopick={autoPickPalette} />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
</style>
