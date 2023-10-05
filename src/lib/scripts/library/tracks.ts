import type { RecordModel } from "pocketbase"
import { getFileURL, pb } from "$lib/scripts/database/pocketbase"

type TrackMap = Map<string, Track>

export async function loadTracks(): Promise<TrackMap> {
        const trackRecords = await fetchTracks()
        const fileToken = await pb.files.getToken()
        return parseTracks(trackRecords, fileToken)
}

export async function fetchTracks(): Promise<RecordModel[]> {
        const FIELDS = [
                "id",
                "title",
                "duration",
                "file",
                "album",
        ]

        const records = await pb.collection('tracks').getFullList({
                fields: FIELDS.toString(),
        })

        return records
}

function parseTracks(records: RecordModel[], fileToken: string): TrackMap {
        return new Map<string, Track>(
                records.map((trackRecord: RecordModel) => {
                        const file = getFileURL("tracks", trackRecord.id, trackRecord.file, fileToken)
                        return [
                                trackRecord.id,
                                {
                                        id: trackRecord.id,
                                        title: trackRecord.title,
                                        duration: trackRecord.duration,
                                        file: file,
                                        albumID: trackRecord.album,
                                }
                        ]
                })
        )
}
