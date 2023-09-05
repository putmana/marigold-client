<script lang="ts">
	import { createEventDispatcher } from "svelte"

	export let item: SearchItem

	let hasArt = false
	let hasSublabel = false

	const dispatch = createEventDispatcher()

	function select() {
		dispatch("select", {
			id: item.id
		})
		console.log("SELECTED", item.id)
	}

	if (item.image !== undefined) hasArt = true
	if (item.sublabel !== undefined) hasSublabel = true
</script>

<div class="item" on:click={select}>
	{#if hasArt}
		<div class="art">
			<img class="art-image" src={item.image} />
		</div>
	{/if}
	<div class="text">
		<div class="text-label">
			{item.label}
		</div>
		{#if hasSublabel}
			<div class="text-sublabel">
				{item.sublabel}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "/static/vars.scss";
	.item {
		display: flex;
		flex-grow: 1;
		flex-direction: row;
		align-items: center;
		height: $searcher-item-size;
		margin-bottom: $margin-size;
		margin-left: $margin-size;
		margin-right: $margin-size;
		border-radius: $margin-size;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
		transition: background-color $hover-fade-time ease-in-out;
		.text-sublabel {
			font-size: smaller;
			opacity: 70%;
		}
		.art {
			margin-left: calc(2 * $margin-size);
			margin-right: calc(4 * $margin-size);
			min-height: calc($searcher-item-art-size);
			.art-image {
				margin: none;
				height: calc($searcher-item-art-size);
				width: calc($searcher-item-art-size);
				border-style: solid;
				border-color: $border-color;
				border-width: 1px;
				vertical-align: middle;
			}
		}
		&:hover {
			background-color: $hover-color;
			border-color: $border-color;
		}
	}
</style>
