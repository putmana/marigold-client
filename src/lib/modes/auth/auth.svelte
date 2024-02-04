<script lang="ts">
	import { Palette } from "$lib/scripts/color-engine/palette"
	import AuthLogin from "./auth-login.svelte"
	import AuthRegister from "./auth-register.svelte"

	const palette = Palette.random()

	let registerMode = false

	function showRegister() {
		registerMode = true
	}

	function showLogin() {
		registerMode = false
	}
</script>

<main class="wrapper" style={palette.toCSS()}>
	<img class="logo" src="public/images/logo.png" alt="Marigold logo" />
	{#if registerMode}
		<AuthRegister on:showlogin={showLogin} />
	{:else}
		<AuthLogin on:showregister={showRegister} />
	{/if}
</main>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right, var(--primary-dark), var(--secondary-dark));

		.logo {
			width: 4em;
			height: 4em;
		}
	}
</style>
