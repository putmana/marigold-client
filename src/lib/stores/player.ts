import { derived, writable, type Readable, type Writable } from "svelte/store";

export const position: Writable<number> = writable(0)

export const tracksPlayed: Writable<QueueTrack[]> = writable([])
export const tracksQueued: Writable<QueueTrack[]> = writable([])
export const tracksManual: Writable<QueueTrack[]> = writable([])
export const currentTrack: Writable<QueueTrack> = writable()

export const tracksAll: Readable<QueueTrack[]> = derived(
    [tracksPlayed, currentTrack, tracksManual, tracksQueued],
    ([$tracksPlayed, $currentTrack, $tracksManual, $tracksQueued]) => [...$tracksPlayed, $currentTrack, ...$tracksManual, ...$tracksQueued]
)

export const paused: Writable<boolean> = writable(true)
export const shuffle: Writable<boolean> = writable(false)
export const repeat: Writable<"OFF" | "ONE" | "ALL"> = writable("OFF")

export const queueStage: Writable<QueueStage> = writable({
    flag: "DIE",
    seen: false
});

export const queueBoxVisible: Writable<boolean> = writable(false)