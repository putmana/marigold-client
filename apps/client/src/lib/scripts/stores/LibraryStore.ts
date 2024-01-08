import { derived, get, writable, type Writable } from "svelte/store"
import { PlaylistAPI } from "../api/PlaylistAPI"
import { user } from "./UserStore"
import { AlbumAPI } from "../api/AlbumAPI"
import { TrackAPI } from "../api/TrackAPI"

type Library = {
        playlists: Map<string, Playlist>
        albums: Map<string, Album>
        tracks: Map<string, Track>
}

const EMPTY_LIBRARY: Library = {
        playlists: new Map(),
        albums: new Map(),
        tracks: new Map(),
}

function createLibraryStore() {
        const { subscribe, set }: Writable<Library> = writable(EMPTY_LIBRARY)

        async function load(): Promise<void> {
                const playlists = await PlaylistAPI.fetch(get(user).id)
                const albums = await AlbumAPI.fetch(get(user).id)
                const tracks = await TrackAPI.fetch(get(user).id)

                // <---- Set the store if there are no errors ---->
                set({ playlists, albums, tracks })
        }

        return {
                subscribe,
                load,
        }
}

export const library = createLibraryStore()

export const playlists = derived((library), ($library) => $library.playlists)
export const albums = derived((library), ($library) => $library.albums)
export const tracks = derived((library), ($library) => $library.tracks)
