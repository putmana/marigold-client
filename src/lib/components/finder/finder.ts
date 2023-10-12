import { writable, type Writable } from "svelte/store"

export const current: Writable<string> = writable("")
