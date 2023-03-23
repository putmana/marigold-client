import { writable, derived, type Writable, type Readable, readable } from "svelte/store";

export const queue: Writable<Queue> = writable({
    position: 0,
    tracks: []
})

export const shuffledQueue: Writable<Queue> = writable({
    position: 0,
    tracks: []
})

export const unique: Writable<Symbol> = writable(Symbol())

export const emptyQueue: Readable<Queue> = readable({
    position: 0,
    tracks: []
})

export const queueLoaded: Readable<boolean> = derived(
    queue,
    $queue => ($queue.tracks.length > 0) ? true : false
)

// <---- SETTINGS ---->
export const repeat: Writable<string> = writable("OFF");
export const shuffle: Writable<boolean> = writable(false);