import { get, writable, type Writable } from "svelte/store"
import { sb } from "../database/supabase"
import { user } from "../stores/UserStore"

export interface TrackForm {
        data: Track
        action: "INSERT" | "UPDATE" | "DELETE"
        file?: File
}

type TrackMap = Map<string, Track>
function createTracksStore() {
        const { subscribe, set }: Writable<TrackMap | null> = writable(null)

        async function fetch() {
                const query = `
                        id,
                        title,
                        artists,
                        duration,
                        index,
                        album_id
                `

                const { data, error } = await sb
                        .from('tracks')
                        .select(query)

                if (error) console.error(error)

                return data
        }

        function load(loaded: any): TrackMap {
                const _tracks = new Map<string, Track>(
                        loaded.map((data) => {
                                const file = getFilePath(data.id)
                                return [
                                        data.id,
                                        {
                                                id: data.id,
                                                title: data.title,
                                                artists: data.artists,
                                                duration: data.duration,
                                                index: data.index,
                                                file: file,
                                                albumID: data.album_id,
                                        }
                                ]
                        })
                ) satisfies TrackMap

                set(_tracks)

                return _tracks

        }

        async function upsert(tracks: TrackForm[]) {
                await deleteTracks(tracks)

                const query = tracks
                        .filter(track => track.action !== "DELETE")
                        .map(track => {
                                return {
                                        id: track.data.id,
                                        title: track.data.title,
                                        artists: track.data.artists,
                                        duration: track.data.duration,
                                        index: track.data.index,
                                        album_id: track.data.albumID,
                                }
                        })

                const { data, error } = await sb
                        .from('tracks')
                        .upsert(query)
                        .select()

                await uploadFiles(tracks)

                await fetchload()

        }

        async function deleteTracks(tracks: TrackForm[]) {
                const ids = tracks
                        .filter(track => track.action === "DELETE")
                        .map(track => track.data.id)

                if (ids.length === 0) return

                const { error } = await sb
                        .from('tracks')
                        .delete()
                        .in('id', ids)

                await deleteFiles(ids)
        }

        async function deleteFiles(trackIDs: string[]) {
                const files = trackIDs.map(trackID => `${get(user).id}/${trackID}`)

                const { error } = await sb
                        .storage
                        .from('audio')
                        .remove(files)
        }

        async function uploadFiles(tracks: TrackForm[]) {
                const newTracks = tracks.filter(t => t.action === "INSERT" && t.file != undefined)

                for (const track of newTracks) {
                        console.log(track.file)
                        const { data, error } = await sb
                                .storage
                                .from('audio')
                                .upload(`${get(user).id}/${track.data.id}`, track.file, {
                                        cacheControl: '3600',
                                        upsert: true,
                                })
                }
        }

        function getFilePath(trackID: string) {
                const { data } = sb
                        .storage
                        .from('audio')
                        .getPublicUrl(`${get(user).id}/${trackID}`)

                return data.publicUrl
        }

        async function fetchload() {
                const data = await fetch()
                load(data)
        }

        return {
                subscribe,
                fetch,
                load,
                upsert,
                uploadFiles,
                fetchload,
        }
}

export const tracks = createTracksStore()
