<script lang="ts">
	import { covers } from "$lib/scripts/stores/LibraryStore"

	export let title: string
	export let description: string
	export let coverID: string

	$: cover = $covers.get(coverID)
</script>

<header class="wrapper" style={cover.palette}>
	<section class="info">
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
		<button class="play-btn">play</button>
	</section>
	<section class="cover">
		<div class="img-wrapper">
			<img src={cover.fileLarge} alt={`cover for ${title}`} />
		</div>
	</section>
</header>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		display: flex;
		flex-direction: column-reverse;
		box-sizing: border-box;
		padding: 20px;
		padding-top: 0px;
		gap: 20px;
		border-bottom: 1px solid colors.$border;
		margin-bottom: 10px;
	}

	.info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 8px;
		justify-content: center;

		.title {
			font-size: clamp(25pt, 4vw, 50pt);
			font-weight: 900;
			letter-spacing: -1px;
			margin: 0;
		}
		.description {
			opacity: 80%;
			margin: 0;
		}
		.play-btn {
			@include mixins.button;
			margin-top: 10px;
		}
	}

	.cover {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		.img-wrapper {
			border: 1px solid var(--secondary-border);
			max-width: 320px;
			max-height: 320px;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			justify-content: center;
			flex-direction: row;
			padding: 60px;
			gap: 60px;
			flex-wrap: wrap-reverse;
		}

		.cover {
			flex-grow: 0;
			.img-wrapper {
				max-width: 220px;
				max-height: 220px;
			}
		}
	}
</style>
