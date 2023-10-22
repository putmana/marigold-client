<script lang="ts">
	import { getRandomPalette } from "$lib/scripts/color-engine/color-engine"
	import AuthLogin from "./auth-login.svelte"
	import AuthRegister from "./auth-register.svelte"

	const palette = getRandomPalette()

	let registerMode = false

	function showRegister() {
		registerMode = true
	}

	function showLogin() {
		registerMode = false
	}
</script>

<main class="wrapper" style={palette}>
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
			width: 60px;
			height: 60px;
		}
	}
</style>
