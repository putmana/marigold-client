<script lang="ts">
	import { tracks } from "$lib/scripts/library/TracksStore"
	import { createEventDispatcher } from "svelte"
	import BtnText from "../button/btn-text.svelte"
	import PopupBox from "../popup-box/popup-box.svelte"
	import Textbox from "../textbox/textbox.svelte"
	import TrackPickerResult from "./track-picker-result.svelte"

	const dispatch = createEventDispatcher()

	let visible = false
	let query = ""
	let picked: string[] = []
	let results: string[] = []

	export function open() {
		visible = true
	}

	export function close() {
		visible = false
	}

	export function submit() {
		dispatch("submit", {
			tracks: picked
		})
		close()
	}

	function pickTrack(id: string) {
		if (picked.includes(id)) {
			picked = picked.filter((pid) => pid !== id)
		} else {
			picked = [...picked, id]
		}
	}

	$: pool = Array.from($tracks.values())
	$: results = pool
		// Only return tracks that have titles or artists that include the query
		.filter((track) => {
			return (
				track.title.toLowerCase().includes(query.toLowerCase()) ||
				track.artists.toLowerCase().includes(query.toLowerCase())
			)
		})
		// Filter out any tracks that have already been picked
		.map((track) => track.id)
</script>

<div class="wrapper">
	<PopupBox {visible} label="Add tracks" on:close={close}>
		<div class="content" slot="content">
			<Textbox id="fuzzyfind" bind:value={query} label="Search tracks" />
			<div class="results">
				{#each results as id}
					<TrackPickerResult
						trackID={id}
						on:click={() => {
							pickTrack(id)
						}}
						picked={picked.includes(id)}
					/>
				{/each}
			</div>
		</div>
		<div class="footer" slot="footer">
			<BtnText label="Cancel" on:click={close} />
			<BtnText label="Add Tracks" on:click={submit} />
		</div>
	</PopupBox>
</div>

<style lang="scss">
	@use "/src/style/colors";
	@use "src/style/mixins";
	.content {
		display: flex;
		flex-direction: column;
		height: 70svh;
		gap: 20px;
		width: 350px;

		.results {
			display: flex;
			flex-direction: column;
			padding: 5px;
			background-color: colors.$gray-d;
			border: 1px solid colors.$border;
			border-radius: 5px;
			overflow-y: scroll;
		}
	}
</style>
