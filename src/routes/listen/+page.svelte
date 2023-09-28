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

<div class="wrapper">
	<Nav>
		<NavBtn tab={"PLAYLISTS"} label="playlists" iconPath="public/icons/regular-playlists.svg" />
		<NavBtn tab={"ALBUMS"} label="albums" iconPath="public/icons/regular-albums.svg" />
		<NavBtn tab={"ARTISTS"} label="artists" iconPath="public/icons/regular-artists.svg" />
	</Nav>
	{#if $mode === "ALBUMS"}
		<Albums />
	{/if}
</div>

<style lang="scss">
	@use "/src/style/sizes";

	.wrapper {
		display: flex;
		height: 100vh;
	}
</style>
