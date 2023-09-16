import { pb } from "$lib/scripts/database/pocketbase"
import { parseColor } from "$lib/scripts/color-engine/color-engine"

const FIELDS = [
	"id",
	"title",
	"year",
	"featuring",
	"expand.artist.id",
	"expand.artist.name",
	"expand.tracks.id",
	"expand.tracks.title",
	"expand.tracks.duration",
	"expand.tracks.featuring",
	"expand.tracks.file",
	"expand.cover.id",
	"expand.cover.color",
	"expand.cover.file",
]

const EXPAND = [
	"artist",
	"tracks",
	"cover",
]

export async function loadAlbums(): Promise<Album[]> {
	const results = await pb.collection('albums').getFullList({
		fields: FIELDS.toString(),
		expand: EXPAND.toString()
	})

	const albums: Album[] = results.map(album => {
		const tracks: Track[] = album.expand?.tracks.map(track => {
			return {
				id: track.id,
				title: track.title,
				artist: {
					id: album.expand?.artist.id,
					name: album.expand?.artist.name + track.featuring,
				},
				duration: parseInt(track.duration),
				cover: album.expand?.cover.file,
				color: parseColor(album.expand?.cover.color),
				file: track.file,
			}
		})

		const duration: number = tracks.reduce((sum, track) => sum + track.duration, 0)

		return {
			id: album.id,
			title: album.title,
			artist: {
				id: album.expand?.artist.id,
				name: album.expand?.artist.name + album.featuring,
			},
			duration: duration, 
			year: album.year,
			cover: album.expand?.cover.file,
			color: parseColor(album.expand?.cover.color),
			tracks: tracks
		}
	})
	
	return albums
}
