<script lang="ts">
	import Auth from "$lib/modes/auth/auth.svelte"
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"

	import Albums from "$lib/modes/albums/albums.svelte"
	// import Playlists from "$lib/modes/playlists/playlists.svelte"
	import Player from "$lib/components/player/player.svelte"

	import { user } from "$lib/scripts/stores/UserStore"
	import { mode } from "$lib/scripts/stores/ModeStore"
	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks } from "$lib/scripts/library/TracksStore"
	import { onMount } from "svelte"

	onMount(async () => {
		await user.init()
	})

	async function fetchload() {
		await albums.fetch()
		await tracks.fetch()
	}
</script>

{#if $user}
	<div class="wrapper">
		{#await fetchload()}
			<h1>Loading...</h1>
		{:then}
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
				<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
			</Nav>
			{#if $mode === "ALBUMS"}
				<Albums />
			{/if}
			<Player />
		{/await}
	</div>
{:else}
	<Auth />
{/if}

<!---
{#if $user}
	{#await library.load()}
		<h1>Loading...</h1>
	{:then}
		<div class="wrapper">
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
				<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
			</Nav>
			{#if $mode === "ALBUMS"}
				<Albums />
			{:else if $mode === "PLAYLISTS"}
				<Playlists />
			{:else if $mode === "SETTINGS"}
				<AuthLogout />
			{/if}
		</div>
	{/await}
{:else}
{/if}
--->

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100vh;
	}
</style>
