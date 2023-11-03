<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums, covers, library } from "$lib/scripts/stores/LibraryStore"

	export let currentAlbumID: string
	export let palette: Palette

	$: _album = $albums.get(currentAlbumID)
	$: _cover = $covers.get(_album?.coverID)

	$: palette = Palette.parse(_cover?.palette)

	let coverField: CoverField

	async function submit() {
		await saveAll()
		library.load()
	}

	async function saveAll() {
		await coverField.save()
	}
</script>

{#if _album}
	<div class="wrapper">
		<CoverField bind:this={coverField} currentCoverID={_album.coverID} />
		<BtnText label="Save" on:click={submit} />
	</div>
{/if}
