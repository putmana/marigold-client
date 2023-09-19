<script lang="ts">
	import { current } from "./finder"

	export let id: string
	export let title: string
	export let author: string
	export let cover: Cover
	export let palette: Palette

	function selectItem() {
		if ($current != id) $current = id
	}

	$: selected = $current == id ? true : false
</script>

<button
	class="wrapper"
	class:selected
	on:click={selectItem}
	style="--main-light: {palette.main.light}; --border-light: {palette.border
		.light}; --border-dark: {palette.border.dark}"
>
	<span class="cover">
		<img src={cover.full} alt={`Cover for ${title}`} />
	</span>
	<span class="info">
		<h2>{title}</h2>
		<h3>{author}</h3>
	</span>
</button>

<style lang="scss">
	@use "/src/style/colors";
	@use "/src/style/mixins";
	@use "/src/style/sizes";

	.wrapper {
		@include mixins.clickable;

		height: 70px;
		margin: 5px;
		border-radius: 5px;
		padding-left: 10px;
		display: flex;
		align-items: center;
		box-sizing: content-box;

		.cover {
			height: 60px;
			width: 60px;
			box-sizing: content-box;
			border: 1px solid var(--border-dark);
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
			background-color: var(--main-light);
			border: 1px solid var(--border-light);
			border-right-width: 0px;

			.info {
				h2,
				h3 {
					opacity: 100%;
				}
			}
		}
	}
</style>
