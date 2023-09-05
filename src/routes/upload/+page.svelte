<script lang="ts">
	import AlbumChooser from "$lib/components/chooser/album-chooser.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
	import { getAllAlbums } from "$lib/scripts/api/api-albums"
	import { token } from "$lib/stores/auth"

	$: albums = getAllAlbums($token).catch((error) => {
		if (error.message === "BAD TOKEN") {
			$token = UNAUTHORIZED_TOKEN
		}
		throw new Error(error)
	})
</script>

<section class="step current">
	<div class="content-box">
		{#await albums}
			<p>loading...</p>
		{:then albums}
			<AlbumChooser {albums} />
		{:catch error}
			{error}
		{/await}
	</div>
</section>
<section class="step"></section>
<section class="step"></section>

<style lang="scss">
	@import "/static/vars.scss";

	.step {
		display: flex;
		width: calc(2 * $size);
		border-left: 1px solid $border-color;
		background-color: $gray-b;
		transition: width $hover-fade-time ease;
		justify-content: center;
		&.current {
			flex-grow: 1;
			background-color: $gray-c;
		}
	}
	.content-box {
		align-self: center;
		width: calc(100% - 2 * $size);
	}
</style>
