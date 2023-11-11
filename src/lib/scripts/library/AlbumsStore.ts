import { get, writable, type Writable } from "svelte/store"
import { sb } from "../database/supabase"
import { user } from "../stores/UserStore"
import { v4 } from "uuid"

type AlbumMap = Map<string, Album>

export interface AlbumForm {
        data: Album
        action: "INSERT" | "UPDATE" | "DELETE"
        file?: File
}

export function emptyAlbumForm(): AlbumForm {
        return {
                data: {
                        id: v4(),
                        title: "",
                        artists: "",
                        year: "",
                        palette: "0.0.0&0.0.0",
                        cover: "",
                        trackIDs: [],
                },
                action: "INSERT",
        }
}

function createAlbumsStore() {
        const { subscribe, set }: Writable<AlbumMap | null> = writable(null)

        async function fetchload() {
                const data = await fetch()
                load(data)
        }

        async function fetch() {
                const query = `
                        id,
                        title,
                        artists,
                        year,
                        palette,
                        tracks (
                                id
                        )
                `

                const { data, error } = await sb
                        .from('albums')
                        .select(query)

                if (error) console.error(error)

                return data
        }

        function load(loaded: any): AlbumMap {
                const _albums = new Map<string, Album>(
                        loaded.map(data => [
                                data.id,
                                {
                                        id: data.id,
                                        title: data.title,
                                        artists: data.artists,
                                        year: data.year,
                                        palette: data.palette,
                                        cover: getCoverPath(data.id),
                                        trackIDs: data.tracks.map(t => t.id)
                                }
                        ])
                ) satisfies AlbumMap

                set(_albums)

                return _albums
        }

        async function upsert(album: AlbumForm) {
                const query = {
                        id: album.data.id,
                        title: album.data.title,
                        artists: album.data.artists,
                        year: album.data.year,
                        palette: album.data.palette,
                }

                const { data, error } = await sb
                        .from('albums')
                        .upsert(query)
                        .select()

                uploadCover(album)

                await fetchload()
        }

        async function uploadCover(album: AlbumForm) {
                if (album.file) {
                        const { data, error } = await sb
                                .storage
                                .from('covers')
                                .upload(`${get(user).id}/${album.data.id}`, album.file, {
                                        cacheControl: '3600',
                                        upsert: true,
                                })
                }
        }

        function getCoverPath(albumID: string) {
                const { data } = sb
                        .storage
                        .from('covers')
                        .getPublicUrl(`${get(user).id}/${albumID}`)

                return data.publicUrl
        }

        return {
                subscribe,
                fetch,
                load,
                upsert,
                uploadCover,
                getCoverPath,
                fetchload,
        }
}

export const albums = createAlbumsStore()
export const selectedAlbumID = writable("")
