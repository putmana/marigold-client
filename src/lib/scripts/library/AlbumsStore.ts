import { get, writable, type Writable } from "svelte/store"
import { user } from "../stores/UserStore"
import { AlbumAPI } from "../api/AlbumAPI"
import type { APIForm } from "../api/types"

type AlbumMap = Map<string, Album>

function createAlbumsStore() {
        const { subscribe, set }: Writable<AlbumMap> = writable(new Map())

        async function fetch() {
                const response = await AlbumAPI.fetch(get(user).id)

                if (!response.success) {
                        console.log(response.error)
                        return
                }

                set(response.result)
        }

        async function update(albumForm: APIForm<Album>) {
                const response = await AlbumAPI.upsert(albumForm)

                if (!response.success) {
                        console.log(response.error)
                        return
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

export const albums = createAlbumsStore()
export const selectedAlbumID = writable("")
