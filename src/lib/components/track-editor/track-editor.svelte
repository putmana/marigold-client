<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { flip } from "svelte/animate"

	import { v4 } from "uuid"

	import {
		createTrack,
		updateTrack,
		deleteTrack,
		type ITrackData
	} from "$lib/scripts/library/tracks"

	import { albums, tracks } from "$lib/scripts/stores/LibraryStore"

	import TrackField from "../field/track-field.svelte"
	import BtnText from "../button/btn-text.svelte"

	export let currentAlbumID: string

	let _tracks: ITrackData[] = []

	export const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	})

	$: resetFields(currentAlbumID)

	function resetFields(currentAlbumID: string) {
		const _album = $albums.get(currentAlbumID)

		_tracks = _album.trackIDs.map((trackID, index) => {
			const _track = $tracks.get(trackID)

			return {
				action: "UPDATE",
				id: _track.id,
				title: _track.title,
				artists: _track.artists,
				albumID: currentAlbumID,
				duration: _track.duration,
				index: index,
				src: _track.file
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
			action: "CREATE",
			id: v4(),
			title: "",
			artists: "",
			albumID: currentAlbumID,
			duration: 1,
			index: _tracks.length,
			src: ""
		} satisfies ITrackData

		_tracks = [..._tracks, newTrack]
	}

	function removeTrack(index: number) {
		if (_tracks[index].action === "CREATE") {
			_tracks = _tracks.toSpliced(index, 1)
		} else {
			_tracks[index].action = "DELETE"
			_tracks = _tracks
		}
	}

	function restoreTrack(index: number) {
		_tracks[index].action = "UPDATE"
		_tracks = _tracks
	}

	export async function save() {
		_tracks.forEach(async (trackData) => {
			switch (trackData.action) {
				case "CREATE":
					return createTrack(trackData)
				case "UPDATE":
					return updateTrack(trackData)
				case "DELETE":
					return deleteTrack(trackData)
			}
		})
	}
</script>

{#each _tracks as trackData, index (trackData.id)}
	<div
		in:receive={{ key: trackData.id }}
		out:send={{ key: trackData.id }}
		animate:flip={{ duration: 200 }}
	>
		<TrackField
			{index}
			bind:trackData
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
