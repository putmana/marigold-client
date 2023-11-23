<script lang="ts">
	import { onMount } from "svelte"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import type { AlbumForm } from "$lib/scripts/api/AlbumAPI"
	import { albums } from "$lib/scripts/library/AlbumsStore"

	export let album: Album
	export let visible = false

	let id: string
	let form: AlbumForm
	let file: File | undefined

	let cover: Cover

	onMount(() => {
		id = album.id
		form = {
			title: album.title,
			artists: album.artists,
			year: album.year,
			palette: album.palette
		}

		cover = album.cover
	})

	async function submit() {
		await albums.update(id, form, file)
		close()
	}

	function close() {
		visible = false
	}
</script>

<PopupBox label="Edit Album Details" bind:visible on:close={close}>
	<div slot="content" class="content">
		<form class="form" on:submit|preventDefault={submit}>
			<CoverField {cover} bind:palette={form.palette} bind:file />
			<Textbox id="title" label="Title" bind:value={form.title} />
			<Textbox id="artists" label="Artists" bind:value={form.artists} />
			<Textbox id="year" label="Year" bind:value={form.year} />
			<div class="footer">
				<BtnText submit label="Save" />
			</div>
		</form>
	</div>
</PopupBox>

<style lang="scss">
	.content {
		width: 300px;

		.form {
			display: flex;
			flex-direction: column;
			gap: 15px;
			width: 100%;

			.footer {
				display: flex;
				justify-content: space-between;
				justify-content: flex-end;
				gap: 10px;
			}
		}
	}
</style>
