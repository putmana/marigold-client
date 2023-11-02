<script lang="ts">
	import Auth from "$lib/modes/auth/auth.svelte"
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"
	import Albums from "$lib/modes/albums/albums.svelte"
	import Playlists from "$lib/modes/playlists/playlists.svelte"
	import Player from "$lib/components/player/player.svelte"

	import { pb, user } from "$lib/scripts/database/pocketbase"
	import { mode } from "$lib/scripts/stores/ModeStore"
	import { library } from "$lib/scripts/stores/LibraryStore"

	import AuthLogout from "$lib/modes/auth/auth-logout.svelte"
</script>

{#if $user}
	{#await library.load()}
		<h1>Loading...</h1>
	{:then}
		<div class="wrapper">
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
				<NavBtn tab={"ARTISTS"} label="artists" iconPath="public/icons/regular-artists.svg" />
				<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
			</Nav>
			{#if $mode === "ALBUMS"}
				<Albums />
			{:else if $mode === "PLAYLISTS"}
				<Playlists />
			{:else if $mode === "SETTINGS"}
				<AuthLogout />
			{/if}
			<Player />
		</div>
	{/await}
{:else}
	<Auth />
{/if}

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100vh;
	}
</style>
