<script lang="ts">
	import { createEventDispatcher } from "svelte"

	import BtnIconSeamless from "../button/btn-icon-seamless.svelte"
	import Textbox from "../textbox/textbox.svelte"
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

	function restore() {
		dispatch("restore")
	}
</script>

<div class="wrapper">
	<div class="index">
		{#if !atStart}
			<BtnIconSeamless src="public/icons/caret-up.svg" on:click={moveUp} />
		{/if}
		{#if !atEnd}
			<BtnIconSeamless src="public/icons/caret-down.svg" on:click={moveDown} />
		{/if}
	</div>
	<div class="info">
		<Textbox id="{trackForm.title}_title" bind:value={trackForm.title} label="Title" />
		<Textbox id="{trackForm.title}_artists" bind:value={trackForm.artists} label="Artists" />
	</div>
	<div class="end">
		<BtnIconSeamless src="public/icons/play.svg" />
		<BtnIconSeamless src="public/icons/trash.svg" on:click={remove} />
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
		box-shadow: 0px 0px 5px colors.$shadow-faint;

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
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			.index {
				width: 60px;
			}
		}
	}
</style>
