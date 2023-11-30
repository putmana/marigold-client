<script lang="ts">
	import { onMount } from "svelte"

	import { v4 as uuid } from "uuid"

	import CoverField from "$lib/components/field/cover-field.svelte"
	import PopupBox from "$lib/components/popup-box/popup-box.svelte"
	import Textbox from "$lib/components/textbox/textbox.svelte"
	import BtnText from "$lib/components/button/btn-text.svelte"

	import { Palette } from "$lib/scripts/color-engine/palette"
	import { AlbumAPI, type AlbumForm } from "$lib/scripts/api/AlbumAPI"
	import { CoverAPI } from "$lib/scripts/api/CoverAPI"

	import { user } from "$lib/scripts/stores/UserStore"
	import { library } from "$lib/scripts/stores/LibraryStore"

	export let visible = false

	let form: AlbumForm
	let file: File | undefined

	onMount(() => {
		form = {
			id: uuid(),
			title: "",
			artists: "",
			year: "",
			palette: Palette.gray
		}
	})

	async function submit() {
		await AlbumAPI.create(form)
		await CoverAPI.upload(file, form.id, $user.id)
		await library.load()
		close()
	}

	function close() {
		visible = false
	}
</script>

<PopupBox title="Create New Album" bind:visible on:close={close}>
	<div slot="content" class="content">
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
