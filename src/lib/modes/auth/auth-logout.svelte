<script lang="ts">
	import { onMount } from "svelte"
	import { initialized, playerController } from "$lib/scripts/stores/PlayerStore"
	import {
		library,
		selectedAlbumID,
		selectedPlaylistID,
		selectedTrackID
	} from "$lib/scripts/stores/LibraryStore"
	import { mode } from "$lib/scripts/stores/ModeStore"
	import { pb } from "$lib/scripts/database/pocketbase"

	$: if (!$initialized) {
		library.clear()

		$selectedAlbumID = ""
		$selectedTrackID = ""
		$selectedPlaylistID = ""

		$mode = "PLAYLISTS"
		pb.authStore.clear()
	}

	onMount(() => {
		playerController.resetQueue()
	})
</script>
