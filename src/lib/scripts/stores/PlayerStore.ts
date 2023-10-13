import { derived, get, writable, type Writable } from "svelte/store";
import { shuffleArray } from "../library/utils";
import { v4 as uuid } from "uuid";

export type QueuedTrack = {
        key: string
        trackID: string
}

type PlayerState = {
        initialized: boolean

        paused: boolean
        repeat: "OFF" | "ONE" | "ALL"
        shuffled: boolean

        currentTrack: QueuedTrack // The track that is currently being played

        sourceTracks: QueuedTrack[] // The unshuffled list of tracks
        nextTracks: QueuedTrack[]
        prevTracks: QueuedTrack[]
}

const EMPTY_PLAYER_STATE: PlayerState = {
        initialized: false,

        paused: true,

        repeat: "OFF",
        shuffled: false,

        currentTrack: {
                key: "",
                trackID: "",
        },

        sourceTracks: [],
        nextTracks: [],
        prevTracks: [],
}

export function createPlayerControllerStore() {
        const { subscribe, update, set }: Writable<PlayerState> = writable(EMPTY_PLAYER_STATE)

        function startQueue(trackIDs: string[], currentTrackPosition: number) {

                // Reset the queue to prevent any weird errors from happening
                resetQueue()

                // Map the array of TrackIds to an array of QueuedTrack objects
                const sourceTracks = trackIDs.map(trackID => {
                        return { key: uuid(), trackID: trackID }
                })

                // Grab the tracks before the position of the selected track and add them to an array of previous tracks 
                const prevTracks = sourceTracks.slice(0, currentTrackPosition)

                // Grab the tracks after the position of the selected track and add them to an array of next tracks
                const nextTracks = sourceTracks.slice(currentTrackPosition + 1)

                // Grab the current track
                const currentTrack = sourceTracks[currentTrackPosition]
                update((store) => ({
                        ...store,
                        initialized: true,

                        currentTrack: currentTrack,
                        sourceTracks: sourceTracks,

                        prevTracks: prevTracks,
                        nextTracks: nextTracks,
                }))

                // Shuffle the tracks if shuffle is enabled
                if (get(playerController).shuffled) shuffleTracks()
        }

        function addTracksToQueue(trackIDs: string[]) {
                // Start the queue if not already initialized
                if (get(initialized) === false) {
                        startQueue(trackIDs, 0)
                        return
                }

                // Map the array of new TrackIDs to an array of QueuedTrack objects
                const newTracks = trackIDs.map(trackID => {
                        return { key: uuid(), trackID: trackID }
                })

                const sourceTracks = get(playerController).sourceTracks
                const nextTracks = get(playerController).nextTracks
                const currentTrack = get(playerController).currentTrack
                const currentTrackIndex = sourceTracks.indexOf(currentTrack)

                // Splice the new tracks to the beginning of the nextTracks array
                const updatedNextTracks = [...newTracks, ...nextTracks]

                // Splice the new tracks to the correct position in the sourceTracks array

                const updatedSourceTracks = sourceTracks.slice()
                updatedSourceTracks.splice(currentTrackIndex + 1, 0, ...newTracks)

                update((store) => ({
                        ...store,
                        sourceTracks: updatedSourceTracks,
                        nextTracks: updatedNextTracks,
                }))
        }

        function shuffleTracks() {

                // Take all of the previously played and upcoming tracks,
                // and put them all into the nextTracks array
                const prevTracks = get(playerController).prevTracks
                const nextTracks = get(playerController).nextTracks

                const shuffledTracks = shuffleArray([
                        ...prevTracks,
                        ...nextTracks
                ])

                update((store) => ({
                        ...store,
                        shuffled: true,
                        prevTracks: [],
                        nextTracks: shuffledTracks,
                }))
        }

        function unshuffleTracks() {
                const sourceTracks = get(playerController).sourceTracks

                const prevTracks = sourceTracks.slice(0, get(currentTrackSourceIndex))
                const nextTracks = sourceTracks.slice(get(currentTrackSourceIndex) + 1, sourceTracks.length)


                update((store) => ({
                        ...store,
                        shuffled: false,
                        prevTracks: prevTracks,
                        nextTracks: nextTracks,

                }))
        }

        function skipNext() {
                skipToIndex(get(currentTrackIndex) + 1)
        }

        function skipPrev() {
                skipToIndex(get(currentTrackIndex) - 1)
        }

        function skipToIndex(index: number) {
                // Guard clause to prevent skipping out of the queue
                if (index < 0 || index >= get(allQueuedTracks).length) {
                        console.error(`Attempted to skip out of queue to index ${index}.`)
                        return
                }

                const updatedPrevTracks = get(allQueuedTracks).slice(0, index)
                const updatedNextTracks = get(allQueuedTracks).slice(index + 1)
                const updatedCurrentTrack = get(allQueuedTracks)[index]

                update((store) => ({
                        ...store,
                        prevTracks: updatedPrevTracks,
                        nextTracks: updatedNextTracks,
                        currentTrack: updatedCurrentTrack,
                }))
        }

        function resetQueue() {
                set(EMPTY_PLAYER_STATE)
        }

        return {
                subscribe,
                startQueue,
                addTracksToQueue,
                shuffleTracks,
                unshuffleTracks,
                skipNext,
                skipPrev,
                skipToIndex,
                resetQueue,
        }
}

export const playerController = createPlayerControllerStore()

export const allQueuedTracks = derived(
        (playerController),
        ($playerController) => [...$playerController.prevTracks, $playerController.currentTrack, ...$playerController.nextTracks]
)

export const nextTracks = derived(
        (playerController),
        ($playerController) => $playerController.nextTracks
)
export const prevTracks = derived(
        (playerController),
        ($playerController) => $playerController.prevTracks
)

export const currentTrack = derived(
        (playerController),
        ($playerController) => $playerController.currentTrack
)

export const currentTrackIndex = derived(
        ([currentTrack, allQueuedTracks]),
        ([$currentTrack, $allQueuedTracks]) => $allQueuedTracks.indexOf($currentTrack)
)
export const currentTrackSourceIndex = derived(
        (playerController),
        ($playerController) => $playerController.sourceTracks.indexOf($playerController.currentTrack)
)

export const initialized = derived(
        (playerController),
        ($playerController) => $playerController.initialized
)

export const atQueueEnd = derived(
        (playerController),
        ($playerController) => $playerController.nextTracks.length == 0 ? true : false
)

export const atQueueStart = derived(
        (playerController),
        ($playerController) => $playerController.prevTracks.length == 0 ? true : false
)

export const repeatQueue = derived(
        (playerController),
        ($playerController) => $playerController.repeat
)

export const shuffleQueue = derived(
        (playerController),
        ($playerController) => $playerController.shuffled
)
