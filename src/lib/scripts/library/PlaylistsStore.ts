import { get, writable, type Writable } from "svelte/store"
import { user } from "../stores/UserStore"
import { PlaylistAPI, type PlaylistForm } from "../api/PlaylistAPI"
import { CoverAPI } from "../api/CoverAPI"

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

        async function update(id: string, form: PlaylistForm, file?: File) {
                // Update the playlist in the database
                const r1 = await PlaylistAPI.update(id, form)

                if (!r1.success) {
                        console.log(r1.error)
                        return
                }

                // Upload a new cover file, if one is present
                if (file) {
                        const r2 = await CoverAPI.upload(get(user).id, id, file)

                        if (!r2.success) {
                                console.log(r2.error)
                                return
                        }
                }

                // Update the store
                await fetch()
        }

        return {
                subscribe,
                fetch,
                update,
        }
}

export const playlists = createPlaylistsStore()

export const selectedPlaylistID = writable("")
