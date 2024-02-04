<script lang="ts">
	import { bgPalette } from "$lib/scripts/stores/PaletteStore"

	export let title: string
	export let details: string[]
	export let artSrc: string
	export let artAlt: string
</script>

<div class="wrapper" style={$bgPalette.toCSS()}>
	<header>
		<section class="info">
			<ul class="details">
				<li class="title">{title}</li>
				{#each details as detail}
					<li>{detail}</li>
				{/each}
			</ul>
			<div class="actions">
				<slot name="actions" />
			</div>
		</section>
		<section class="art">
			<img src={artSrc} alt={artAlt} />
		</section>
	</header>
	<main>
		<slot name="tracks" />
	</main>
</div>

<style lang="scss">
	@use "/src/lib/ui/vars";
	@use "/src/lib/ui/colors";
	@use "/src/lib/ui/mixins";

	.wrapper {
		@include mixins.item;
		background-color: var(--primary-medium);
		background-image: linear-gradient(to right, var(--primary-medium), var(--primary-dark));
		overflow-y: scroll;

		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: vars.$item_gap;

		padding: vars.$item_gap;

		header {
			display: flex;
			border-bottom: vars.$item_border;

			@include mixins.desktop-only {
				justify-content: space-between;
				padding: 4rem;
				gap: 4rem;
			}

			@include mixins.mobile-only {
				flex-direction: column-reverse;
				padding: 2rem;
				gap: 2rem;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: vars.$item_gap;

				.details {
					margin: 0;
					padding: 0;
					list-style-type: none;

					.title {
						margin: 0;
						font-size: 3rem;
						font-weight: bold;
					}
				}

				.actions {
					display: flex;
					gap: vars.$item_gap;
				}
			}

			.art {
				img {
					display: block;
					width: 15rem;
					max-width: 100%;
					box-shadow: vars.$item_shadow;
				}
			}
		}

		main {
			display: flex;
			flex-direction: column;
			gap: vars.$item_gap;
		}
	}
</style>
