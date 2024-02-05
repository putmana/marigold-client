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
	import { bgPalette } from "$lib/scripts/stores/PaletteStore"
	import ButtonIcon from "$lib/ui/button/button-icon.svelte"

	onMount(async () => {
		await user.init()
	})
</script>

{#if $user}
	<div class="wrapper" style={$bgPalette.toCSS()}>
		<main>
			<Nav>
				<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/playlists.svg" />
				<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/albums.svg" />
				<svelte:fragment slot="end">
					<NavBtn tab={"SETTINGS"} label="settings" iconPath="public/icons/settings.svg" />
				</svelte:fragment>
			</Nav>

			{#await library.load()}
				<LoadingScreen />
			{:then _}
				{#if $mode === "ALBUMS"}
					<Albums />
				{:else if $mode === "PLAYLISTS"}
					<Playlists />
				{:else if $mode === "SETTINGS"}
					<Settings />
				{/if}
			{/await}
		</main>
		<Player />
	</div>
{:else}
	<Auth />
{/if}

<ModalManager />

<style lang="scss">
	@use "/src/lib/ui/vars";

	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100svh;
		box-sizing: border-box;
		background-image: linear-gradient(
			to right,
			var(--secondary-background),
			var(--primary-background)
		);

		main {
			display: flex;
			flex-grow: 1;
			padding: vars.$item_gap;
			gap: vars.$item_gap;
			overflow: hidden;
		}
	}
</style>
