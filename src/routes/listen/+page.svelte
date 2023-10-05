<script lang="ts">
	import { onMount } from "svelte"

	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"

	import Albums from "$lib/modes/albums/albums.svelte"
	import Playlists from "$lib/modes/playlists/playlists.svelte"

	import Player from "$lib/components/player/player.svelte"

	import { user } from "$lib/scripts/database/pocketbase"
	import { mode } from "$lib/modes/mode"

	import { loginUser } from "$lib/modes/login/login"
	import { library } from "$lib/scripts/stores/LibraryStore"

	onMount(async () => {
		if (!$user) {
			await loginUser()
		}
	})
</script>

{#if user}
	{#await library.init()}
		<h1>Loading...</h1>
	{:then}
		<div class="wrapper">
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
				<NavBtn tab={"ARTISTS"} label="artists" iconPath="public/icons/regular-artists.svg" />
			</Nav>
			{#if $mode === "ALBUMS"}
				<Albums />
			{:else if $mode === "PLAYLISTS"}
				<Playlists />
			{/if}
			<Player />
		</div>
	{/await}
{:else}
	<h1>Logging in user...</h1>
{/if}

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100vh;
	}
</style>
