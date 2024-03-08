<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import ButtonIcon from "$lib/ui/button/button-icon.svelte"
	import Textbox from "$lib/ui/textbox/textbox.svelte"

	import type { TrackForm } from "$lib/scripts/api/TrackAPI"

	const dispatch = createEventDispatcher()

	export let trackForm: TrackForm
	export let index: number
	export let atStart: boolean
	export let atEnd: boolean

	$: trackForm.index = index

	function moveUp() {
		dispatch("moveup")
	}

	function moveDown() {
		dispatch("movedown")
	}

	function remove() {
		dispatch("remove")
	}
</script>

<div class="wrapper">
	<div class="index">
		{#if !atStart}
			<ButtonIcon
				seamless
				nopadding
				src="public/icons/caret-up.svg"
				alt="Up arrow"
				tooltip="Move track up"
				on:click={moveUp}
			/>
		{/if}
		{#if !atEnd}
			<ButtonIcon
				seamless
				nopadding
				src="public/icons/caret-down.svg"
				alt="Down arrow"
				tooltip="Move track down"
				on:click={moveDown}
			/>
		{/if}
	</div>
	<div class="info">
		<Textbox id="{trackForm.title}_title" bind:value={trackForm.title} label="Title" grow />
		<Textbox id="{trackForm.title}_artists" bind:value={trackForm.artists} label="Artists" grow />
	</div>
	<div class="end">
		<ButtonIcon
			seamless
			nopadding
			src="public/icons/close.svg"
			alt="Trash icon"
			tooltip="Remove track"
			on:click={remove}
		/>
	</div>
</div>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		@include mixins.item;
		display: flex;
		padding: vars.$item_gap;
		gap: vars.$item_gap;
		align-items: center;

		.index {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.info {
			display: flex;
			flex-wrap: wrap;
			flex-grow: 1;
			gap: vars.$item_gap;
		}

		.end {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
