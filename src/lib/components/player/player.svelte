<script lang="ts">
	import { defaultColor } from "$lib/scripts/color-engine/color-engine"
	import { tracks, selectedTrackID, albums, covers } from "$lib/scripts/stores/LibraryStore"

	$: track = $tracks.get($selectedTrackID)
	$: album = $albums.get(track?.albumID)
	$: cover = $covers.get(album?.coverID)
	$: color = cover?.palette ?? defaultColor
</script>

<section
	class="wrapper"
	style={`--main-light: ${color.main.light}; --main-dark: ${color.main.dark}; --border-dark: ${color.border.dark};`}
>
	<div class="inner-wrapper">
		<audio src={track?.file} />
	</div>
</section>

<style lang="scss">
	@use "/src/style/sizes";
	@use "/src/style/mixins";
	@use "/src/style/colors";

	.wrapper {
		position: fixed;
		inset: auto 0px 0px 0px;
		height: 60px;
		background-image: linear-gradient(to left, var(--main-light), var(--main-dark));
		box-shadow: 0px 0px 20px colors.$shadow;

		// Hack to render border color properly
		.inner-wrapper {
			height: inherit;
			width: inherit;
			border-top: 1px solid var(--border-dark);
			box-sizing: border-box;
		}
	}
</style>
