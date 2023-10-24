import type { RecordModel } from "pocketbase"
import { pb } from "$lib/scripts/database/pocketbase"
import { sortIndexedTracks } from "./utils"

type PlaylistMap = Map<string, Playlist>
type PlaylistData = {
        title: string,
        description: string,
        coverID: string,
}

export async function loadPlaylists(): Promise<PlaylistMap> {
        return fetchPlaylists().then(records => {
                return parsePlaylists(records)
        })
}

async function fetchPlaylists(): Promise<RecordModel[]> {
        const EXPAND = [
                "playlists_tracks(playlist)"
        ]

        const FIELDS = [
                "id",
                "title",
                "description",
                "cover",
                "expand.playlists_tracks(playlist).track",
                "expand.playlists_tracks(playlist).index",
        ]

        const records = await pb.collection('playlists').getFullList({
                fields: FIELDS.toString(),
                expand: EXPAND.toString(),
        })

        return records
}

// Creates a new playlist record, then returns the record ID
async function createPlaylist(playlistData: PlaylistData): Promise<string> {
        const newPlaylist = await pb.collection('playlists').create({
                "title": playlistData.title,
                "description": playlistData.description,
                "user": pb.authStore.model.id,
                "cover": playlistData.coverID,
        })

        return newPlaylist.id
}

// Updates the specified playlist record, then returns the record ID
async function updatePlaylist(playlistID: string, playlistData: PlaylistData): Promise<string> {
        await pb.collection('playlists').update(playlistID, {
                "title": playlistData.title,
                "description": playlistData.description,
                "cover": playlistData.coverID,
        })

        return playlistID
}

// Adds a list of tracks to the specified playlist, then returns the playlist ID
async function addTracksToPlaylist(playlistID: string, tracks: IndexedTrack[]) {
        await Promise.all(tracks.map(async track => {
                pb.collection('playlists_tracks').create({
                        "playlist": playlistID,
                        "track": track.id,
                }, { $autoCancel: false }
                )
        }))

        return playlistID
}

function parsePlaylists(records: RecordModel[]): PlaylistMap {
        return new Map<string, Playlist>(
                records.map((playlistRecord: RecordModel) => {

                        const indexedTracks: IndexedTrack[] = playlistRecord.expand["playlists_tracks(playlist)"].map((trackRecord: RecordModel) => {
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
