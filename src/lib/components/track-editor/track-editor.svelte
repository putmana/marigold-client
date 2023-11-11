<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 } from "uuid"

	import { albums } from "$lib/scripts/library/AlbumsStore"
	import { tracks, type TrackForm } from "$lib/scripts/library/TracksStore"

	import TrackField from "../field/track-field.svelte"
	import BtnText from "../button/btn-text.svelte"

	export let currentAlbumID: string

	let _tracks: TrackForm[] = []

	export const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	$: resetFields(currentAlbumID)

	function resetFields(currentAlbumID: string) {
		const _album = $albums.get(currentAlbumID)

		_tracks = _album.trackIDs.map((trackID) => {
			return {
				data: { ...$tracks.get(trackID) },
				action: "UPDATE"
			}
		})
	}

	function moveUp(index: number) {
		let moved = _tracks[index - 1]
		_tracks[index - 1] = _tracks[index]
		_tracks[index] = moved
	}

	function moveDown(index: number) {
		let moved = _tracks[index + 1]
		_tracks[index + 1] = _tracks[index]
		_tracks[index] = moved
	}

	function addTrack() {
		const newTrack = {
			data: {
				id: v4(),
				title: "",
				artists: "",
				duration: 0,
				index: _tracks.length,
				albumID: currentAlbumID,
				file: ""
			},
			action: "INSERT"
		} satisfies TrackForm

		_tracks = [..._tracks, newTrack]
	}

	function removeTrack(index: number) {
		if (_tracks[index].action === "INSERT") {
			_tracks = _tracks.toSpliced(index, 1)
		} else {
			_tracks[index].action = "DELETE"
			console.log("DELETED")
		}
		_tracks = _tracks
		console.log(_tracks[index].action)
	}

	function restoreTrack(index: number) {
		_tracks[index].action = "UPDATE"
	}

	export async function save() {
		tracks.upsert(_tracks)
	}
</script>

{#each _tracks as track, index (track.data.id)}
	<div
		in:receive={{ key: track.data.id }}
		out:send={{ key: track.data.id }}
		animate:flip={{ duration: 200 }}
	>
		<TrackField
			{index}
			bind:track
			atStart={index === 0}
			atEnd={index === _tracks.length - 1}
			on:moveup={() => {
				moveUp(index)
			}}
			on:movedown={() => {
				moveDown(index)
			}}
			on:remove={() => {
				removeTrack(index)
			}}
			on:restore={() => {
				restoreTrack(index)
			}}
		/>
	</div>
{/each}
<BtnText label="add" on:click={addTrack} />
