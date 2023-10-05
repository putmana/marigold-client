import { writable, derived, type Writable } from "svelte/store"
import { loadLibrary } from "$lib/scripts/library/library"

const EMPTY_LIBRARY: Library = {
        albums: new Map(),
        artists: new Map(),
        covers: new Map(),
        playlists: new Map(),
        tracks: new Map(),
}

export function createLibrary() {
        const { subscribe, set }: Writable<Library> = writable(EMPTY_LIBRARY)

        return {
                subscribe,

                init: async () => {
                        await loadLibrary().then(library => {
                                set(library)
                        })
                }
        }
}

export const library = createLibrary()

export const albums = derived(
        library,
        ($library) => $library.albums
)
export const artists = derived(
        library,
        ($library) => $library.artists
)
export const covers = derived(
        library,
        ($library) => $library.covers
)
export const playlists = derived(
        library,
        ($library) => $library.playlists
)
export const tracks = derived(
        library,
        ($library) => $library.tracks
)

export const selectedAlbumID = writable("")
export const selectedArtistID = writable("")
export const selectedPlaylistID = writable("")
export const selectedTrackID = writable("")
