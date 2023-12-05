<script lang="ts">
	import Auth from "$lib/modes/auth/auth.svelte"
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"
	import LoadingScreen from "$lib/components/loading/loading-screen.svelte"
	import Albums from "$lib/modes/albums/albums.svelte"
	import Playlists from "$lib/modes/playlists/playlists.svelte"
	import Player from "$lib/components/player/player.svelte"

	import { user } from "$lib/scripts/stores/UserStore"
	import { mode } from "$lib/scripts/stores/ModeStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { onMount } from "svelte"

	import Settings from "$lib/modes/settings/settings.svelte"
	import ModalManager from "$lib/components/modal-manager/modal-manager.svelte"

	onMount(async () => {
		await user.init()
	})
</script>

{#if $user}
	<div class="wrapper">
		{#await library.load()}
			<LoadingScreen />
		{:then}
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/albums.svg" />
				<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
			</Nav>

			{#if $mode === "ALBUMS"}
				<Albums />
			{:else if $mode === "PLAYLISTS"}
				<Playlists />
			{:else if $mode === "SETTINGS"}
				<Settings />
			{/if}

			<Player />
		{/await}
	</div>
{:else}
	<Auth />
{/if}

<ModalManager />

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100svh;
	}
</style>
