import type { RecordModel } from "pocketbase"
import { getFileURL, pb } from "$lib/scripts/database/pocketbase"

type TrackMap = Map<string, Track>

export interface ITrackData {
        action: "CREATE" | "UPDATE" | "DELETE"
        id: string
        title: string
        artists: string
        albumID: string
        duration: number
        index: number
        src: string
        file?: File
}

export async function loadTracks(): Promise<TrackMap> {
        const trackRecords = await fetchTracks()
        const fileToken = await pb.files.getToken()
        return parseTracks(trackRecords, fileToken)
}

export async function fetchTracks(): Promise<RecordModel[]> {
        const FIELDS = [
                "id",
                "title",
                "artists",
                "duration",
                "file",
                "album",
        ]

        const records = await pb.collection('tracks').getFullList({
                fields: FIELDS.toString(),
        })

        return records
}

// Creates a new track record, then returns the record ID
export async function createTrack(trackData: ITrackData) {
        const formData = new FormData()

        formData.append("title", trackData.title)
        formData.append("artists", trackData.artists)
        formData.append("album", trackData.albumID)
        formData.append("duration", trackData.duration.toString())
        formData.append("user", pb.authStore.model.id)
        formData.append("index", trackData.index.toString())
        formData.append("file", trackData.file)

        const record = await pb.collection('tracks').create(formData)

        return record.id
}


// Updates the specified track record, then returns the record ID
export async function updateTrack(trackData: ITrackData) {
        const record = await pb.collection('tracks').update(trackData.id, {
                "title": trackData.title,
                "artists": trackData.artists,
                "index": trackData.index,
        })

        return record.id
}

export async function deleteTrack(trackData: ITrackData) {
        await pb.collection('tracks').delete(trackData.id)
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
                                        artists: trackRecord.artists,
                                        duration: trackRecord.duration,
                                        file: file,
                                        albumID: trackRecord.album,
                                }
                        ]
                })
        )
}
