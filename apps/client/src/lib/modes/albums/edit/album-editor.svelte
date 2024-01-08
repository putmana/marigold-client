<script lang="ts" context="module">
	import AlbumEditor from "./album-editor.svelte"

	export function openAlbumEditorModal(album: Album) {
		openModal<AlbumEditor>({
			component: AlbumEditor,
			props: {
				album: album
			},
			title: "Edit Album Details",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { AlbumAPI, type AlbumForm } from "$lib/scripts/api/AlbumAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "$lib/components/modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let album: Album
	export let loading = false

	let form: AlbumForm = {
		id: album.id,
		title: album.title,
		artists: album.artists,
		year: album.year,
		palette: album.palette
	}

	let file: File | undefined

	async function submit() {
		loading = true

		try {
			// Update the album in the database
			await AlbumAPI.update(form)

			// Upload a new cover if one is provided
			if (file) {
				await CoverAPI.upload(file, form.id, $user.id)
			}

			// Load changes and close the modal
			await library.load()
			close()
		} catch (error) {
			console.error(error)
		}

		loading = false
	}

	function close() {
		dispatch("close")
	}
</script>

<div class="content">
	<form class="form" on:submit|preventDefault={submit}>
		<CoverField cover={album.cover} bind:palette={form.palette} bind:file required={false} />
		<Textbox id="title" label="Title" bind:value={form.title} />
		<Textbox id="artists" label="Artists" bind:value={form.artists} />
		<Textbox id="year" label="Year" bind:value={form.year} />
		<div class="footer">
			<BtnText submit label="Save" />
		</div>
	</form>
</div>

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
