<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import Textbox from "../textbox/textbox.svelte"
	import type { TrackForm } from "$lib/scripts/library/TracksStore"

	const dispatch = createEventDispatcher()

	export let track: TrackForm
	export let index: number
	export let atStart: boolean
	export let atEnd: boolean

	function loadFile(e: Event) {
		const reader = new FileReader()
		const input = e.target as HTMLInputElement

		const file = input.files[0]

		if (file) {
			reader.readAsDataURL(file)
			reader.onload = (e) => {
				track.data.file = e.target.result.toString()
				track.file = input.files[0]
			}
		}
	}

	$: track.data.index = index

	function moveUp() {
		dispatch("moveup")
	}

	function moveDown() {
		dispatch("movedown")
	}

	function remove() {
		dispatch("remove")
	}

	function restore() {
		dispatch("restore")
	}
</script>

<div class="wrapper" class:deleted={track.action === "DELETE"}>
	<div class="index">
		{#if !atStart}
			<BtnIconSeamless src="public/icons/caret-up.svg" on:click={moveUp} />
		{/if}
		{#if !atEnd}
			<BtnIconSeamless src="public/icons/caret-down.svg" on:click={moveDown} />
		{/if}
	</div>
	<div class="info">
		<Textbox id="{track.data.id}_title" bind:value={track.data.title} label="Title" />
		<Textbox id="{track.data.id}_artists" bind:value={track.data.artists} label="Artists" />
		{#if track.action === "INSERT"}
			<input type="file" accept="audio/mp3, audio/flac" on:change={loadFile} />
		{/if}
	</div>
	<div class="end">
		<BtnIconSeamless src="public/icons/play.svg" />
		{#if track.action === "DELETE"}
			<BtnIconSeamless src="public/icons/add.svg" on:click={restore} />
		{:else}
			<BtnIconSeamless src="public/icons/trash.svg" on:click={remove} />
		{/if}
	</div>
</div>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		padding-top: 10px;
		padding-bottom: 10px;
		border-radius: 5px;
		align-items: center;
		background-color: colors.$item;
		border: 1px solid colors.$border;

		.index {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 5px;
			height: 20px;
			width: 60px;
		}

		.info {
			display: flex;
			flex-wrap: wrap;
			flex-grow: 1;
			gap: 10px;
		}

		.end {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0px 15px;
			gap: 5px;
		}

		&.deleted {
			opacity: 50%;
		}
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				width: 60px;
			}
		}
	}
</style>
