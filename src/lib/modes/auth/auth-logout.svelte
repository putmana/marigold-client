<script lang="ts">
	import { onMount } from "svelte"
	import { pb } from "$lib/scripts/database/pocketbase"

	onMount(() => {
		pb.authStore.clear()
		location.reload()
	})
</script>
