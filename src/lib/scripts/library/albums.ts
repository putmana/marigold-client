import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { sortIndexedTracks } from "./utils"

type AlbumMap = Map<string, Album>

export async function loadAlbums(): Promise<AlbumMap> {
        const albumRecords = await fetchAlbums()
        return parseAlbums(albumRecords)
}

async function fetchAlbums(): Promise<RecordModel[]> {
        const EXPAND = [
                "tracks",
        ]

        const FIELDS = [
                "id",
                "title",
                "description",
                "year",
                "artist",
                "cover",
                "expand.tracks.id",
                "expand.tracks.index",
        ]

        const records = await pb.collection('albums').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString(),
        })

        return records
}

function parseAlbums(records: RecordModel[]): AlbumMap {
        return new Map<string, Album>(
                records.map((albumRecord: RecordModel) => {

                        const indexedTracks: IndexedTrack[] = albumRecord.expand?.tracks.map((trackRecord: RecordModel) => {
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
