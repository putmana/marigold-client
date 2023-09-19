import type { RecordModel } from "pocketbase"
import { pb, getCoverURLs, getFileURL } from "$lib/scripts/database/pocketbase"
import { buildPalette } from "$lib/scripts/color-engine/color-engine"

export async function fetchAlbums(): Promise<RecordModel[]> {
        // Set up the options for the record request
        const EXPAND = [
                "artist",
                "tracks",
                "cover",
        ]

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

        // Fetch the records from the database
        const records = await pb.collection('albums').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString()
        })

        return records
}

export async function getUserToken(): Promise<string> {
        return await pb.files.getToken()
}

// Parse album information and return a list of Album objects
export function parseAlbums(records: RecordModel[], fileToken: string): Album[] {
        const albums: Album[] = records.map((album: RecordModel) => {

                // Generate URLs for cover file
                const cover = getCoverURLs(album.expand?.cover.id, album.expand?.cover.file, fileToken)

                // Parse track information and return a list of Track objects
                const tracks: Track[] = album.expand?.tracks.map((track: RecordModel) => {
                        // Generate URL for track file 
                        const file = getFileURL("tracks", track.id, track.file, fileToken)

                        // Map the database record to a Track object
                        return {
                                id: track.id,
                                title: track.title,
                                artist: {
                                        id: album.expand?.artist.id,
                                        name: album.expand?.artist.name + track.featuring,
                                },
                                duration: parseInt(track.duration),
                                cover: cover,
                                palette: buildPalette(album.expand?.cover.color),
                                file: file,
                        }

                }) satisfies Track[]

                // Add the duration of all of the tracks to get the total duration of the album
                const duration: number = tracks.reduce((sum, track) => sum + track.duration, 0)

                // Map the database record to an Album object
                return {
                        id: album.id,
                        title: album.title,
                        artist: {
                                id: album.expand?.artist.id,
                                name: album.expand?.artist.name + album.featuring,
                        },
                        duration: duration,
                        year: album.year,
                        cover: cover,
                        palette: buildPalette(album.expand?.cover.color),
                        tracks: tracks
                }

        }) satisfies Album[]

        return albums
}
