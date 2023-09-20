<script lang="ts">
	import Albums from "$lib/modes/albums/albums.svelte"
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"

	import { mode } from "$lib/modes/mode"
	import { loginUser } from "$lib/modes/login/login"
	import { onMount } from "svelte"

	onMount(async () => {
		loginUser()
	})
</script>

<main class="wrapper">
	<section class="navigation">
		<Nav>
			<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
			<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
			<NavBtn tab={"ARTISTS"} label="artists" iconPath="public/icons/regular-artists.svg" />
		</Nav>
		{#if $mode === "ALBUMS"}
			<Albums />
		{/if}
	</section>

	<section class="library" />
</main>

<style lang="scss">
	@use "/src/style/sizes";

	@media (max-width: calc(sizes.$screen-lg - 1px)) {
		.wrapper {
			display: flex;
			height: 100vh;
			overflow-x: scroll;
			scroll-snap-type: x mandatory;
		}
		.navigation {
			display: flex;
			scroll-snap-align: start;
			min-width: 100vw;
		}
		.library {
			display: flex;
			scroll-snap-align: start;
			min-width: 100vw;
		}
	}
	@media (min-width: sizes.$screen-lg) {
		.wrapper {
			display: flex;
			height: 100vh;
		}
		.navigation {
			display: flex;
			min-width: sizes.$screen-sm;
		}
		.library {
			display: flex;
			flex-grow: 1;
		}
	}
</style>
