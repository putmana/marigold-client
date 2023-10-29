import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { sortIndexedTracks } from "./utils"

type AlbumMap = Map<string, Album>
export type AlbumData = {
        title: string
        description: string
        year: string
        artistID: string
        coverID: string
}

export async function loadAlbums(): Promise<AlbumMap> {
        const albumRecords = await fetchAlbums()
        return parseAlbums(albumRecords)
}

async function fetchAlbums(): Promise<RecordModel[]> {
        const EXPAND = [
                "tracks(album)",
                "albums_artists(album)",
        ]

        const FIELDS = [
                "id",
                "title",
                "description",
                "year",
                "cover",
                "expand.albums_artists(album).artist",
                "expand.albums_artists(album).priority",
                "expand.tracks(album).id",
                "expand.tracks(album).index",
        ]

        const records = await pb.collection('albums').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString(),
        })

        return records
}

// Creates a new album record, then returns the record ID
async function createAlbum(albumData: AlbumData): Promise<string> {
        const newAlbum = await pb.collection('albums').create({
                "title": albumData.title,
                "artist": albumData.artistID,
                "year": albumData.year,
                "description": albumData.description,
                "user": pb.authStore.model.id,
                "cover": albumData.coverID,
        })

        return newAlbum.id
}

// Updates the specified album record, then returns the record ID
export async function updateAlbum(albumID: string, albumData: AlbumData): Promise<string> {
        await pb.collection('albums').update(albumID, {
                "title": albumData.title,
                "artist": albumData.artistID,
                "year": albumData.year,
                "description": albumData.description,
                "cover": albumData.coverID,
        })

        return albumID
}

function parseAlbums(records: RecordModel[]): AlbumMap {
        return new Map<string, Album>(
                records.map((albumRecord: RecordModel) => {

                        const orderedTracks: OrderedTrack[] = albumRecord.expand["tracks(album)"].map((trackRecord: RecordModel) => {
                                return {
                                        id: trackRecord.id,
                                        index: trackRecord.index
                                }
                        })

                        const orderedArtists: OrderedArtist[] = albumRecord.expand["albums_artists(album)"].map((relationRecord: RecordModel) => {
                                return {
                                        id: relationRecord.artist,
                                        priority: relationRecord.priority,
                                }
                        })

                        orderedArtists.sort((a, b) => a.priority - b.priority)
                        orderedTracks.sort((a, b) => a.index - b.index)

                        return [
                                albumRecord.id,
                                {
                                        id: albumRecord.id,
                                        title: albumRecord.title,
                                        description: albumRecord.description,
                                        year: albumRecord.year,
                                        coverID: albumRecord.cover,
                                        orderedArtists: orderedArtists,
                                        orderedTracks: orderedTracks,
                                }
                        ]
                })
        )
}
