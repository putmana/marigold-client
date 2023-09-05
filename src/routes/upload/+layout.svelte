<script lang="ts">
	import Uploader from "$lib/components/chooser/album-chooser.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
	import { verifyToken } from "$lib/scripts/api/api-verify-token"
	import { randomPalette } from "$lib/scripts/palette"
	import { token } from "$lib/stores/auth"
	import { onMount } from "svelte"

	async function checkToken(token: string) {
		await verifyToken(token).then((valid) => {
			if (!valid) $token = UNAUTHORIZED_TOKEN
		})
	}

	let colors: Palette = randomPalette()

	onMount(() => {
		checkToken($token)
	})
</script>

<div class="wrapper" style="--dim-light: {colors.dim.light}; --dim-dark: {colors.dim.dark}">
	<slot />
</div>

<style lang="scss">
	@import "/static/vars.scss";

	.wrapper {
		height: 100%;
		width: 100%;
		display: flex;
		background-image: linear-gradient(to right, var(--dim-light), var(--dim-dark));
	}
</style>
