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
                const query = tracks.map(track => {
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

                uploadFiles(tracks)

                const _tracks = load(data)

                set(_tracks)

        }

        async function uploadFiles(tracks: TrackForm[]) {
                tracks.forEach(async (track) => {
                        if (track.file) {
                                console.log(track.file)
                                const { data, error } = await sb
                                        .storage
                                        .from('audio')
                                        .upload(`${get(user).id}/${track.data.id}`, track.file, {
                                                cacheControl: '3600',
                                                upsert: true,
                                        })

                                console.log(data)
                                console.error(error)
                        }
                })
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
