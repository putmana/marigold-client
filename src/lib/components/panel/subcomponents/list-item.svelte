<script lang="ts">
	import { page } from "$app/stores"
	import { deckPalette } from "$lib/stores/colors"

	export let route: string
	export let title: string
	export let artists: string
	export let cover: string
</script>

<a
	class="list"
	href={route}
	class:selected={$page.url.pathname.includes(route)}
	style="--main-light: {$deckPalette.main.light}; --bright-light: {$deckPalette.bright.light}"
>
	<div class="art">
		<img class="art-image" src={cover} />
	</div>
	<div class="text">
		<div class="text-title">
			{title}
		</div>
		<div class="text-artist">
			{artists}
		</div>
	</div>
</a>

<style lang="scss">
	@import "/static/vars.scss";
	.list {
		display: flex;
		position: relative;

		flex-direction: row;
		min-height: calc($list-item-size + $margin-size * 4);
		align-items: center;
		border: 1px solid transparent;
		border-right-color: $border-color;
		border-left-color: $border-color;
		transition:
			border-radius $hover-fade-time ease,
			margin $hover-fade-time ease,
			background-color $hover-fade-time ease;
		.art {
			margin-left: calc(2 * $margin-size);
			height: $list-item-art-size;
			width: $list-item-art-size;
			.art-image {
				height: inherit;
				width: inherit;
				border-width: 1px;
				border-style: solid;
				border-color: $border-color;
			}
		}
		.text {
			display: flex;
			flex-direction: column;
			margin-left: calc(4 * $margin-size);
			.text-artist {
				font-size: smaller;
				opacity: 70%;
			}
		}
		&:hover {
			background-color: $hover-color;
			border-color: $border-color;
			z-index: 2;
		}
		&.selected {
			background-color: var(--main-light);
			font-weight: bold;
			border-color: $border-color;
			border-right: none;
			z-index: 2;
		}
	}

	a {
		color: $text-color;
		text-decoration: none;
	}
</style>
