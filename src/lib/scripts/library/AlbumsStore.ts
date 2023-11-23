import { get, writable, type Writable } from "svelte/store"
import { user } from "../stores/UserStore"
import { AlbumAPI, type AlbumForm } from "../api/AlbumAPI"
import { CoverAPI } from "../api/CoverAPI"

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

        async function update(id: string, form: AlbumForm, file?: File) {
                // Update the album in the database
                const r1 = await AlbumAPI.update(id, form)

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

export const albums = createAlbumsStore()
export const selectedAlbumID = writable("")
