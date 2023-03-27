import { derived, writable, type Writable } from "svelte/store";

export const previous: Writable<Map<symbol, Track[]>> = writable()

export const playing: Writable<Track> = writable();

export const nextFromUser: Writable<Track[]> = writable([])

export const nextFromList: Writable<Track[]> = writable([])

export const ready = derived(
    [nextFromUser, nextFromList],
    ([$nextFromUser, $nextFromList]) => {
        if ($nextFromList.length > 0 || $nextFromUser.length > 0) {
            return true
        }
        return false
    }
)