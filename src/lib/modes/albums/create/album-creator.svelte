<script lang="ts" context="module">
	import AlbumCreator from "./album-creator.svelte"

	export function openAlbumCreatorModal() {
		openModal<AlbumCreator>({
			component: AlbumCreator,
			props: {},
			title: "Create New Album",
			loading: false
		})
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { v4 as uuid } from "uuid"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { AlbumAPI, type AlbumForm } from "$lib/scripts/api/AlbumAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { openModal } from "$lib/components/modal-manager/modal-manager.svelte"

	const dispatch = createEventDispatcher()

	export let loading = false

	let form: AlbumForm = {
		id: uuid(),
		title: "",
		artists: "",
		year: "",
		palette: Palette.gray
	}

	let file: File | undefined

	async function submit() {
		loading = true

		try {
			// Create the album in the database
			await AlbumAPI.create(form)

			// Upload the album cover
			await CoverAPI.upload(file, form.id, $user.id)

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
		<CoverField bind:palette={form.palette} bind:file />
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
