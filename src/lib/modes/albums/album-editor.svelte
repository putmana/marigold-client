<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import TrackEditor from "$lib/components/track-editor/track-editor.svelte"
	import { Palette } from "$lib/scripts/color-engine/palette"

	import { albums, emptyAlbumForm, type AlbumForm } from "$lib/scripts/library/AlbumsStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	let coverField: CoverField
	let trackEditor: TrackEditor

	export let currentAlbumID: string

	let _album: AlbumForm = emptyAlbumForm()
	let _palette: Palette = Palette.gray

	$: resetFields(currentAlbumID)

	function resetFields(albumID: string) {
		_album = {
			data: { ...$albums.get(albumID) },
			action: "UPDATE"
		}
		_palette = Palette.parse(_album.data.palette)
	}

	function close() {
		dispatch("close")
	}

	async function save() {
		_album.data.palette = _palette.toString()

		await trackEditor.save()
		await albums.upsert(_album)
		close()
	}
</script>

{#if currentAlbumID}
	<header class="header">
		<section class="info">
			<Textbox id="{_album.data.id}_title" bind:value={_album.data.title} label="Title" />
			<Textbox id="{_album.data.id}_artists" bind:value={_album.data.artists} label="Artists" />

			<div class="btns">
				<BtnText label="Save" on:click={save} />
				<BtnText label="Cancel" on:click={close} />
			</div>
		</section>
		<section class="cover">
			<CoverField
				bind:this={coverField}
				cover={_album.data.cover}
				bind:file={_album.file}
				bind:palette={_palette}
			/>
		</section>
	</header>

	<TrackEditor bind:this={trackEditor} currentAlbumID={_album.data.id} />
{/if}

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.header {
		display: flex;
		box-sizing: border-box;
		border-bottom: 1px solid colors.$border;

		@include mixins.mobile-only {
			flex-direction: column-reverse;
			gap: 20px;
			padding: 20px;
		}

		@include mixins.desktop-only {
			justify-content: center;
			padding: 60px;
			gap: 60px;
			flex-wrap: wrap-reverse;
		}

		.info {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			gap: 15px;
			justify-content: center;
		}
	}
</style>
