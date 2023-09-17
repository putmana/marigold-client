<script lang="ts">
	import Albums from "$lib/modes/albums/albums.svelte";
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"
	
	import { loginUser } from "$lib/modes/login/login"
	import { onMount } from "svelte"

	onMount(async() => {
		loginUser()
	})
</script>

<main class="wrapper">
	<section class="navigation">
		<Nav>
			<NavBtn label="playlists" icon_path="public/icons/regular-playlists.svg"/>
			<NavBtn label="albums" icon_path="public/icons/regular-albums.svg"/>
			<NavBtn label="artists" icon_path="public/icons/regular-artists.svg"/>
		</Nav>
		<Albums></Albums>
	</section>

	<section class="library">
	</section>


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
