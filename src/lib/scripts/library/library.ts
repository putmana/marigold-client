import { writable, type Writable } from "svelte/store";

const NONE = "none"

export const albums: Writable<Album[]> = writable([])
export const selectedAlbumID: Writable<string> = writable(NONE)

export const playlists: Writable<Playlist[]> = writable([])
export const selectedPlaylistID: Writable<string> = writable(NONE)
