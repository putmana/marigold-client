import { get, writable, type Writable } from "svelte/store"
import { user } from "../stores/UserStore"
import { PlaylistAPI } from "../api/PlaylistAPI"
import type { APIForm } from "../api/types"

type PlaylistMap = Map<string, Playlist>

function createPlaylistsStore() {
        const { subscribe, set }: Writable<PlaylistMap> = writable(new Map())

        async function fetch() {
                const response = await PlaylistAPI.fetch(get(user).id)

                if (!response.success) {
                        console.log(response.error)
                        return
                }

                set(response.result)
        }

        async function update(playlistForm: APIForm<Playlist>) {
                const response = await PlaylistAPI.upsert(playlistForm)

                if (!response.success) {
                        console.log(response.error)
                        return
                }

                // Update the store
                await fetch()
        }

        async function upsertTracks(playlistID: string, indexedTrackIDForms: APIForm<PlaylistTrack>[]) {
                // Update track order in playlist
                const toUpsert = indexedTrackIDForms.filter(form => form.action !== "DELETE")

                const r1 = await PlaylistAPI.upsertTracks(playlistID, toUpsert)

                if (!r1.success) {
                        console.log(r1.error)
                }

                // Remove tracks from playlist
                const toDelete = indexedTrackIDForms.filter(form => form.action === "DELETE")

                const r2 = await PlaylistAPI.removeTracks(playlistID, toDelete)

                if (!r2.success) {
                        console.log(r2.error)
                }

                // Update the store
                await fetch()
        }

        return {
                subscribe,
                fetch,
                update,
                upsertTracks,
        }
}

export const playlists = createPlaylistsStore()
export const selectedPlaylistID = writable("")
