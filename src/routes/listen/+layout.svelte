<script lang="ts">
	import Player from "$lib/components/player/player.svelte"
	import QueueBox from "$lib/components/queue-box/queue-box.svelte"
	import Sidebar from "$lib/components/sidebar/sidebar.svelte"
	import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
	import { verifyToken } from "$lib/scripts/api/api-verify-token"
	import { token } from "$lib/stores/auth"
	import { onMount } from "svelte"

	async function checkToken(token: string) {
		await verifyToken(token).then((valid) => {
			if (!valid) $token = UNAUTHORIZED_TOKEN
		})
	}

	onMount(() => {
		checkToken($token)
	})
</script>

<div class="app-container">
	<Sidebar />
	<slot />
	<QueueBox />
</div>

<Player />

<style lang="scss">
	@import "/static/vars.scss";
	.app-container {
		display: flex;
		flex-grow: 1;
		flex-direction: row;
		max-height: calc(100vh - $player-size - $margin-size);
	}
</style>
