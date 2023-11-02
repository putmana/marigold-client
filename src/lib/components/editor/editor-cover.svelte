<script lang="ts">
	import { updateCover } from "$lib/scripts/library/covers"
	import { covers } from "$lib/scripts/stores/LibraryStore"
	import { Palette } from "$lib/scripts/color-engine/palette"

	import ImageInput from "../image-input/image-input.svelte"
	import { getPalette } from "$lib/scripts/image-palette/image-palette"

	export let currentCoverID: string = ""

	let _id: string = ""
	let _src: string = ""
	let _palette: Palette = Palette.gray
	let _file: File | undefined

	$: resetFields(currentCoverID)

	function resetFields(coverID: string) {
		const _cover = $covers.get(coverID)

		_id = _cover?.id ?? ""
		_src = _cover?.fileLarge ?? ""
		_palette = _cover?.palette ?? Palette.gray
		_file = undefined
	}

	async function handleImageChange(e: CustomEvent) {
		_src = e.detail.url
		_file = e.detail.file
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

<ImageInput id="cover" src={_src} label="Cover" on:change={handleImageChange} required />

<div class="palette" style={_palette.toCSS()}>
	<span class="p" />
	<span class="s" />
</div>

<style lang="scss">
	.palette {
		display: flex;
		width: 500px;
		height: 40px;
		background-image: linear-gradient(to right, var(--primary-medium), var(--secondary-dark));
		span {
			height: 20px;
			flex-grow: 1;
		}
		.p {
			background-color: var(--primary-initial);
		}
		.s {
			background-color: var(--secondary-initial);
		}
	}
</style>
