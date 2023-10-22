import { writable, type Writable } from 'svelte/store'

export type Mode = "PLAYLISTS" | "ALBUMS" | "ARTISTS" | "SETTINGS"
export const mode: Writable<Mode> = writable("ALBUMS")
