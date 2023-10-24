import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { sortIndexedTracks } from "./utils"

type AlbumMap = Map<string, Album>
type AlbumData = {
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
                "tracks(album)"
        ]

        const FIELDS = [
                "id",
                "title",
                "description",
                "year",
                "artist",
                "cover",
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
async function updateAlbum(albumID: string, albumData: AlbumData): Promise<string> {
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

                        const indexedTracks: IndexedTrack[] = albumRecord.expand["tracks(album)"].map((trackRecord: RecordModel) => {
                                return {
                                        id: trackRecord.id,
                                        index: trackRecord.index
                                }
                        })

                        const orderedTracks = sortIndexedTracks(indexedTracks)

                        return [
                                albumRecord.id,
                                {
                                        id: albumRecord.id,
                                        title: albumRecord.title,
                                        description: albumRecord.description,
                                        year: albumRecord.description,
                                        artistID: albumRecord.artist,
                                        coverID: albumRecord.cover,
                                        orderedTracks: orderedTracks,
                                }
                        ]
                })
        )
}
