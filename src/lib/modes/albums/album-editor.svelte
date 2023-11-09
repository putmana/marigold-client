<script lang="ts">
	import BtnText from "$lib/components/button/btn-text.svelte"
	import CoverField from "$lib/components/field/cover-field.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import TrackEditor from "$lib/components/track-editor/track-editor.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { albums, covers } from "$lib/scripts/stores/LibraryStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	let coverField: CoverField
	let trackEditor: TrackEditor

	export let currentAlbumID: string

	let _id: string = ""
	let _title: string = ""
	let _artists: string = ""
	let _coverID: string = ""
	let _palette: Palette = Palette.gray

	$: resetFields(currentAlbumID)

	function resetFields(albumID: string) {
		const _album = $albums.get(albumID)
		const _cover = $covers.get(_album?.coverID)

		_id = _album?.id ?? ""
		_title = _album?.title ?? ""
		_artists = _album?.artists ?? ""
		_coverID = _cover?.id ?? ""
		_palette = Palette.parse(_cover?.palette)
	}

	function close() {
		dispatch("close")
	}

	async function submit() {
		await saveAll()
	}

	async function saveAll() {
		await coverField.save()
		await trackEditor.save()
		close()
	}
</script>

{#if currentAlbumID}
	<header class="header">
		<section class="info">
			<Textbox id="{_id}_title" bind:value={_title} label="Title" />
			<Textbox id="{_id}_artists" bind:value={_artists} label="Artists" />

			<div class="btns">
				<BtnText label="Save" on:click={submit} />
				<BtnText label="Cancel" on:click={close} />
			</div>
		</section>
		<section class="cover">
			<CoverField bind:this={coverField} coverID={_coverID} />
		</section>
	</header>

	<TrackEditor bind:this={trackEditor} currentAlbumID={_id} />
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
