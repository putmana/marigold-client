import type { RecordModel } from "pocketbase"
import { getFileURL, pb } from "$lib/scripts/database/pocketbase"

type TrackMap = Map<string, Track>
type TrackData = {
        title: string,
        albumID: string,
        duration: string,
        userID: string,
        featuring: string,
        index: number,
        orderedArtists: OrderedArtist[],
}

export async function loadTracks(): Promise<TrackMap> {
        const trackRecords = await fetchTracks()
        const fileToken = await pb.files.getToken()
        return parseTracks(trackRecords, fileToken)
}

export async function fetchTracks(): Promise<RecordModel[]> {
        const EXPAND = [
                "artists_tracks(track)",
        ]

        const FIELDS = [
                "id",
                "title",
                "duration",
                "file",
                "album",
                "expand.artists_tracks(track).artist",
                "expand.artists_tracks(track).priority",
        ]

        const records = await pb.collection('tracks').getFullList({
                expand: EXPAND.toString(),
                fields: FIELDS.toString(),
        })

        return records
}

// Creates a new track record, then returns the record ID
async function createTrack(trackData: TrackData, file: File) {

        // Create a FormData object and append the necessary fields
        const formData = new FormData()
        formData.append("title", trackData.title)
        formData.append("album", trackData.albumID)
        formData.append("duration", trackData.duration)
        formData.append("user", pb.authStore.model.id)
        formData.append("featuring", trackData.featuring)
        formData.append("index", trackData.index.toString())
        formData.append("file", file)

        // Create the track object
        const newTrack = await pb.collection('tracks').create(formData)

        return newTrack.id
}


// Updates the specified track record, then returns the record ID
async function updateTrack(trackID: string, trackData: TrackData) {
        await pb.collection('tracks').update(trackID, {
                "title": trackData.title,
                "featuring": trackData.featuring,
                "index": trackData.index,
        })

        return trackID
}

function parseTracks(records: RecordModel[], fileToken: string): TrackMap {
        return new Map<string, Track>(
                records.map((trackRecord: RecordModel) => {

                        const orderedArtists: OrderedArtist[] = trackRecord.expand["artists_tracks(track)"].map((relationRecord: RecordModel) => {
                                return {
                                        id: relationRecord.artist,
                                        priority: relationRecord.priority,
                                }
                        })

                        const file = getFileURL("tracks", trackRecord.id, trackRecord.file, fileToken)

                        return [
                                trackRecord.id,
                                {
                                        id: trackRecord.id,
                                        title: trackRecord.title,
                                        duration: trackRecord.duration,
                                        file: file,
                                        albumID: trackRecord.album,
                                        orderedArtists: orderedArtists
                                }
                        ]
                })
        )
}
