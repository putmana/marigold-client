import { v4 as uuid } from "uuid";

export function startQueue(tracks: Track[], position: number ): QueueStage {
    const FLAG: "START" = "START"

    let queued: QueueTrack[] = []

    tracks.forEach((track: Track) => {
        queued.push({
            id: uuid(),
            source: "AUTO",
            track: track
        })
    })

    return {
        flag: FLAG,
        seen: false,
        tracks: queued,
        position: position
    }
}

export function addToQueue(tracks: Track[]): QueueStage {
    const FLAG: "ADD" = "ADD"

    let queued: QueueTrack[] = []

    tracks.forEach((track: Track) => {
        queued.push({
            id: uuid(),
            source: "MANUAL",
            track: track
        })
    })

    return {
        flag: FLAG,
        seen: false,
        tracks: queued
    }
}

export function reorderQueue(tracks: QueueTrack[], position: number): QueueStage {
    const FLAG: "REORDER" = "REORDER"

    return {
        flag: FLAG,
        seen: false,
        tracks: tracks,
        position: position
    }
}

export function reorderManualQueue(tracks: QueueTrack[]): QueueStage {
    const FLAG: "REORDER_MANUAL" = "REORDER_MANUAL"

    return {
        flag: FLAG,
        seen: false,
        tracks: tracks,
    }
}

export function clearManualQueue(): QueueStage {
    const FLAG: "REORDER_MANUAL" = "REORDER_MANUAL"

    return {
        flag: FLAG,
        seen: false,
        tracks: [],
    }
}

export function clearQueue(): QueueStage {
    const FLAG: "DIE" = "DIE"

    return {
        flag: FLAG,
        seen: false
    }
}

export function getQueueTrackPosition(tracks: QueueTrack[], id: string): number {
    let position = -1
    
    tracks.forEach((track: QueueTrack, index: number) => {
        if (track.id === id) {
            position = index;
        }
    })

    return position;
}