import type { RecordModel } from "pocketbase"
import { pb, getCoverURLs, getFileURL } from "$lib/scripts/database/pocketbase"
import { buildPalette } from "$lib/scripts/color-engine/color-engine"

import { writable, type Writable } from "svelte/store"

export const albums: Writable<Album[]> = writable([])
export const selectedAlbumID: Writable<string> = writable("none")

export async function fetchAlbums(): Promise<{
        token: string,
        records: RecordModel[]
}> {
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
                "expand.tracks.index",
                "expand.cover.id",
                "expand.cover.color",
                "expand.cover.file",
        ]

        // Generate a file access token for the user
        const token = await pb.files.getToken()

        // Fetch the records from the database
        const records = await pb.collection('albums').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString()
        })

        return {
                token: token,
                records: records
        }

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
                                index: track.index
                        }

                }) satisfies Track[]

                // Sort the tracks by their album index
                tracks.sort(compareTracks)

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

        // Sort the albums in alphabetical order
        albums.sort(compareAlbums)

        return albums
}

function compareTracks(a: Track, b: Track) {
        return a.index - b.index
}

function compareAlbums(a: Album, b: Album) {
        const titleA = a.title.toUpperCase()
        const titleB = b.title.toUpperCase()

        if (titleA < titleB) return -1
        if (titleA > titleB) return 1
        return 0
}
