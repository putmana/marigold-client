import { writable, type Writable } from 'svelte/store'

export const mode: Writable<"Playlists" | "Albums" | "Artists"> = writable("Playlists")
