<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import EditorCover from "$lib/components/editor/editor-cover.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums, covers, library } from "$lib/scripts/stores/LibraryStore"

	export let currentAlbumID: string
	export let palette: Palette

	$: _album = $albums.get(currentAlbumID)

	$: palette = $covers.get(_album?.coverID)?.palette ?? Palette.gray

	let coverField: EditorCover

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
		<EditorCover bind:this={coverField} currentCoverID={_album.coverID} />
		<BtnText label="Save" on:click={submit} />
	</div>
{/if}
