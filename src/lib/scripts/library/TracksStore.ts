import { get, writable, type Writable } from "svelte/store"
import { user } from "../stores/UserStore"
import { TrackAPI } from "../api/TrackAPI"
import type { APIForm } from "../api/types"

type TrackMap = Map<string, Track>

function createTracksStore() {
        const { subscribe, set }: Writable<TrackMap> = writable(new Map())

        async function fetch() {
                const response = await TrackAPI.fetch(get(user).id)

                if (!response.success) {
                        console.log(response.error)
                        return
                }

                set(response.result)
        }

        async function upsert(trackForms: APIForm<Track>[]) {
                // Update the tracks in the database
                const toUpsert = trackForms.filter(form => form.action !== "DELETE")

                const upsertResponse = await TrackAPI.upsert(toUpsert)

                if (!upsertResponse.success) {
                        console.log(upsertResponse.error)
                        return
                }


                // Remove deleted tracks from the database
                const toDelete = trackForms.filter(track => track.action === "DELETE")

                const deleteResponse = await TrackAPI.delete(toDelete)

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

export const tracks = createTracksStore()
