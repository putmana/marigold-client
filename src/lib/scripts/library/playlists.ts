import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { sortIndexedTracks } from "./utils"

type PlaylistMap = Map<string, Playlist>

export async function loadPlaylists(): Promise<PlaylistMap> {
        return fetchPlaylists().then(records => {
                return parsePlaylists(records)
        })
}

async function fetchPlaylists(): Promise<RecordModel[]> {
        const EXPAND = [
                "ordered_tracks"
        ]

        const FIELDS = [
                "id",
                "title",
                "description",
                "cover",
                "expand.ordered_tracks.track",
                "expand.ordered_tracks.index",
        ]

        const records = await pb.collection('playlists').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString(),
        })

        console.log(records)

        return records
}

function parsePlaylists(records: RecordModel[]): PlaylistMap {
        return new Map<string, Playlist>(
                records.map((playlistRecord: RecordModel) => {

                        const indexedTracks: IndexedTrack[] = playlistRecord.expand?.ordered_tracks.map((trackRecord: RecordModel) => {
                                return {
                                        id: trackRecord.track,
                                        index: trackRecord.index,
                                }
                        })

                        const orderedTracks = sortIndexedTracks(indexedTracks)

                        return [
                                playlistRecord.id,
                                {
                                        id: playlistRecord.id,
                                        title: playlistRecord.title,
                                        description: playlistRecord.description,
                                        coverID: playlistRecord.cover,
                                        orderedTracks: orderedTracks,
                                }
                        ]
                })
        )
}
