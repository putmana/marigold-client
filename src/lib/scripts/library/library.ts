import { writable, type Writable } from "svelte/store";

export const albums: Writable<Album[]> = writable([])
export const playlists: Writable<Playlist[]> = writable([])
