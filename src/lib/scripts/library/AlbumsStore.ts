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

        async function upsert(albumForms: APIForm<Album>[]) {
                // Update the albums in the database
                const toUpsert = albumForms.filter(form => form.action !== "DELETE")

                const upsertResponse = await AlbumAPI.upsert(toUpsert)

                if (!upsertResponse.success) {
                        console.log(upsertResponse.error)
                        return
                }


                // Remove deleted albums from the database
                const toDelete = albumForms.filter(form => form.action === "DELETE")

                const deleteResponse = await AlbumAPI.delete(toDelete)

                if (!deleteResponse.success) {
                        console.log(deleteResponse.error)
                        return
                }


                // Update the store
                await fetch()
        }

        return {
                subscribe,
                fetch,
                upsert,
        }
}

export const albums = createAlbumsStore()
export const selectedAlbumID = writable("")
