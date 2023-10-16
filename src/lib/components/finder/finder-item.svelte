<script lang="ts">
	import { artists, covers } from "$lib/scripts/stores/LibraryStore"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let id: string
	export let title: string
	export let artistID: string | null = null
	export let coverID: string
	export let selected: boolean

	$: cover = $covers.get(coverID)
	$: artistName = artistID ? $artists.get(artistID).name : null

	function selectItem() {
		dispatch("select", {
			id: id
		})
	}
</script>

<button class="wrapper" class:selected on:click={selectItem} style={cover.palette}>
	<span class="cover">
		<img src={cover.fileSmall} alt={`Cover for ${title}`} />
	</span>
	<span class="info">
		<h2>{title}</h2>
		{#if artistName}
			<h3>{artistName}</h3>
		{/if}
	</span>
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		@include mixins.clickable;

		position: relative;
		height: 70px;
		margin: 5px;
		border-radius: 5px;
		padding-left: 10px;
		display: flex;
		align-items: center;
		box-sizing: border-box;

		.cover {
			height: 60px;
			width: 60px;
			box-sizing: content-box;
			border: 1px solid colors.$border-hover;
			img {
				height: inherit;
			}
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			margin-left: 20px;
			h2,
			h3 {
				margin-top: 2px;
				margin-bottom: 2px;
				font-weight: normal;
				font-size: inherit;
				opacity: 80%;
			}
			h3 {
				font-size: small;
			}
		}

		&.selected {
			margin-left: 0px;
			margin-right: 0px;
			border-radius: 0px;
			height: 90px;
			padding-left: 15px;
			background-color: var(--primary-medium);
			border: 1px solid var(--primary-border);
			margin: 0;

			.cover {
				border: 1px solid var(--primary-border);
			}
			.info {
				h2,
				h3 {
					opacity: 100%;
				}
			}

			@media (min-width: sizes.$screen-lg) {
				border-right-width: 0px;

				&::after {
					content: "";
					box-sizing: border-box;
					border-top: 1px solid var(--primary-border);
					border-bottom: 1px solid var(--primary-border);
					background-color: var(--primary-medium);
					position: absolute;
					height: inherit;
					width: 2px;
					right: -1px;
				}
			}
		}
	}
</style>
