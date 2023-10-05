<script lang="ts">
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"
	import { tracks, selectedTrackID } from "$lib/scripts/stores/LibraryStore"

	$: audio = $tracks.get($selectedTrackID)?.file

	$: color = defaultColor
</script>

<section
	class="wrapper"
	style={`--main-light: ${color.main.light}; --main-dark: ${color.main.dark};`}
>
	<audio src={audio} controls />
	<div class="inner-wrapper" />
</section>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		position: fixed;
		bottom: 10px;
		left: 10px;
		right: 10px;
		height: 60px;
		border-radius: 5px;
		background-image: linear-gradient(to right, var(--main-light), var(--main-dark));
		box-shadow: 0px 0px 15px colors.$shadow;

		// Hack to render border color properly
		.inner-wrapper {
			height: inherit;
			width: inherit;
			border: 1px solid colors.$border-hover;
			border-radius: 5px;
			box-sizing: border-box;
		}

		@media (min-width: sizes.$screen-lg) {
			bottom: 0px;
			left: 0px;
			right: 0px;
			border-radius: 0px;

			.inner-wrapper {
				border: unset;
				border-radius: 0px;
				border-top: 1px solid colors.$border-hover;
			}
		}
	}
</style>
