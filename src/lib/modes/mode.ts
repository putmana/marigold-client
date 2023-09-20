import { writable, type Writable } from 'svelte/store'

export const mode: Writable<Mode> = writable("PLAYLISTS")
