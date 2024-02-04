<script lang="ts">
	export let index: number
	export let title: string
	export let artist: string
	export let artSrc: string

	export let showIndex = false
	export let showCover = false
</script>

<button class="seamless" on:dblclick {...$$restProps}>
	{#if showIndex}
		<div class="index">{index + 1}</div>
	{/if}

	{#if showCover}
		<div class="cover">
			<img src={artSrc} alt={`Cover art for ${title}`} />
		</div>
	{/if}

	<ul class="info">
		<li class="title">{title}</li>
		<li class="artist">{artist}</li>
	</ul>

	<div class="actions">
		<slot name="actions" />
	</div>
</button>

<style lang="scss">
	@use "/src/lib/ui/button/button";
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	button {
		@include button.base;

		justify-content: start;
		padding: vars.$item_gap;

		.index {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1rem;

			@include mixins.desktop-only {
				width: calc(4rem - vars.$item_gap);
			}

			@include mixins.mobile-only {
				width: calc(2rem - vars.$item_gap);
			}
		}

		.cover {
			padding: 0 calc(vars.$item_gap * 2) 0 0;
			img {
				display: block;
				width: 2.5rem;
			}
		}

		.info {
			margin: 0;
			padding: 0;
			list-style-type: none;

			.artist {
				color: colors.$text_b;
			}
		}
	}
</style>
