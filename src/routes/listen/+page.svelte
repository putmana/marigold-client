<script lang="ts">
	import Auth from "$lib/modes/auth/auth.svelte"
	import NavBtn from "$lib/components/nav/nav-btn/nav-btn.svelte"
	import Nav from "$lib/components/nav/nav.svelte"

	import LoadingScreen from "$lib/components/loading/loading-screen.svelte"
	import Albums from "$lib/modes/albums/albums.svelte"
	import Playlists from "$lib/modes/playlists/playlists.svelte"
	import Player from "$lib/components/player/player.svelte"
	import ConfirmationModal from "$lib/components/confirmation-modal/confirmation-modal.svelte"

	import { user } from "$lib/scripts/stores/UserStore"
	import { mode } from "$lib/scripts/stores/ModeStore"
	import { library } from "$lib/scripts/stores/LibraryStore"
	import { onMount } from "svelte"

	onMount(async () => {
		await user.init()
	})

	$: if ($mode === "SETTINGS") {
		user.logout()
	}
</script>

{#if $user}
	<div class="wrapper">
		{#await library.load()}
			<LoadingScreen />
		{:then}
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
				<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
			</Nav>

			{#if $mode === "ALBUMS"}
				<Albums />
			{:else if $mode === "PLAYLISTS"}
				<Playlists />
			{/if}

			<Player />
		{/await}
	</div>
{:else}
	<Auth />
{/if}

<ConfirmationModal />

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100vh;
	}
</style>
