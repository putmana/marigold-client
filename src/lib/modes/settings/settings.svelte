<script lang="ts">
	import { onMount } from "svelte"
	import { logoutUser } from "../auth/logout"

	onMount(() => {
		logoutUser()
	})
</script>
