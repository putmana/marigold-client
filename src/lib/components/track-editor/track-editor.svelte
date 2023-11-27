<script lang="ts">
	import { onMount } from "svelte"

	import PopupBox from "../popup-box/popup-box.svelte"
	import Textbox from "../textbox/textbox.svelte"
	import BtnText from "../button/btn-text.svelte"

	import { TrackAPI, type TrackForm } from "$lib/scripts/api/TrackAPI"

	import { library } from "$lib/scripts/stores/LibraryStore"

	export let track: Track
	export let visible = false

	let form: TrackForm

	onMount(() => {
		form = {
			id: track.id,
			title: track.title,
			artists: track.artists,
			duration: track.duration,
			index: track.index,
			albumID: track.albumID
		}
	})

	async function submit() {
		await TrackAPI.update(form)
		await library.load()
		close()
	}

	function close() {
		visible = false
	}
</script>

<PopupBox label="Edit Track Details" bind:visible on:close={close}>
	<div slot="content" class="content">
		<form class="form" on:submit|preventDefault={submit}>
			<Textbox id="title" label="Title" bind:value={form.title} />
			<Textbox id="artists" label="Artists" bind:value={form.artists} />
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
