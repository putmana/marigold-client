import { derived, writable, type Readable, type Writable } from "svelte/store";
import { defaultColor } from "./colors";
import { clearQueue } from "$lib/scripts/queue";

export const defaultTrack: Track = {
    id: "default",
    title: "",
    artists: [
        {
            id: "default",
            name: ""
        }
    ],
    duration: 0,
    cover: {
        path: "",
        color: defaultColor
    },
    path: ""
}

export const defaultQueueTrack: QueueTrack = {
    id: "default",
    source: "AUTO",
    track: defaultTrack
}

export const position: Writable<number> = writable(0)
export const queueReady: Writable<boolean> = writable(false)
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

export const queueStage: Writable<QueueStage> = writable(clearQueue());

export const queueBoxVisible: Writable<boolean> = writable(false)