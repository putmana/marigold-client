import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { library } from "../stores/LibraryStore"

type AlbumMap = Map<string, Album>
export type AlbumData = {
        title: string
        artists: string
        description: string
        year: string
        coverID: string
}

export async function loadAlbums(): Promise<AlbumMap> {
        const albumRecords = await fetchAlbums()
        return parseAlbums(albumRecords)
}

async function fetchAlbums(): Promise<RecordModel[]> {
        const EXPAND = [
                "tracks(album)",
        ]

        const FIELDS = [
                "id",
                "title",
                "artists",
                "description",
                "year",
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
                "artists": albumData.artists,
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
                "artists": albumData.artists,
                "year": albumData.year,
                "description": albumData.description,
                "cover": albumData.coverID,
        })

        return albumID
}

function parseAlbums(records: RecordModel[]): AlbumMap {
        return new Map<string, Album>(
                records.map((albumRecord: RecordModel) => {

                        let trackRecords: RecordModel[] = []

                        if (albumRecord.expand) {
                                trackRecords = albumRecord.expand["tracks(album)"]
                        }

                        trackRecords.sort((a, b) => a.index - b.index)


                        const tracks = trackRecords.map((trackRecord: RecordModel) => trackRecord.id)

                        return [
                                albumRecord.id,
                                {
                                        id: albumRecord.id,
                                        title: albumRecord.title,
                                        artists: albumRecord.artists,
                                        description: albumRecord.description,
                                        year: albumRecord.year,
                                        coverID: albumRecord.cover,
                                        trackIDs: tracks,
                                }
                        ]
                })
        )
}
