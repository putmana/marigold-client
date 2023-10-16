import { derived, get, writable, type Readable, type Writable } from "svelte/store";
import { shuffleArray } from "../library/utils";
import { v4 as uuid } from "uuid";

export type RepeatMode = "OFF" | "ONE" | "ALL"

type PlayerPrefs = {
        shuffleEnabled: boolean
        repeatMode: RepeatMode
}

type PlayerState = {
        initialized: boolean
        trackSessionKey: string

        paused: boolean
        repeat: RepeatMode
        shuffled: boolean

        currentTrack: string // The track that is currently being played

        sourceTracks: string[] // The unshuffled list of tracks
        nextTracks: string[]
        prevTracks: string[]
}

const EMPTY_PLAYER_STATE: PlayerState = {
        initialized: false,
        trackSessionKey: "",

        paused: true,

        repeat: "OFF",
        shuffled: false,

        currentTrack: "",

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
                const sourceTracks = trackIDs

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

                refreshQueue()
        }

        // Update the track session key, so the player knows to restart the song
        // This is important, because the user may want to queue the same song
        // multiple times / use the repeat single track feature. 
        //
        // If the player was reactive to the entire store, it would always restart the
        // song upon any change to the state, even if it wasn't desired.
        //
        // Make sure to call this function any time the currently playing song should
        // be reloaded or restarted
        function refreshQueue() {
                update((store) => ({
                        ...store,
                        trackSessionKey: uuid()
                }))
        }

        function addTracksToQueue(trackIDs: string[]) {

                // Start the queue if not already initialized
                if (get(initialized) === false) {
                        startQueue(trackIDs, 0)
                        return
                }

                // Map the array of new TrackIDs to an array of QueuedTrack objects
                const newTracks = trackIDs

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

        function toggleShuffle() {
                if (get(queueShuffleEnabled)) {
                        unshuffleTracks()
                        return
                }

                shuffleTracks()
        }

        function toggleRepeat() {
                let repeatMode: RepeatMode

                if (get(queueRepeatMode) === "OFF") repeatMode = "ALL"
                if (get(queueRepeatMode) === "ALL") repeatMode = "ONE"
                if (get(queueRepeatMode) === "ONE") repeatMode = "OFF"

                update((store) => ({
                        ...store,
                        repeat: repeatMode,
                }))

        }


        // The difference between skipNext() and autoSkipNext() is that the latter
        // checks if repeat one is enabled. This is for when the player automatically
        // skips to the next song, i.e., when the current song ends. Repeat one should
        // be ignored when the user manually skips around in the queue

        function skipNext() {

                // If repeat all is enabled, and the user is at the end of the queue,
                // skipping forward goes to the first song in the queue
                if (get(queueRepeatMode) === "ALL" && get(atQueueEnd)) {
                        skipToIndex(0)
                        return
                }

                // If repeat all is NOT enabled, and the user is at the end of the queue,
                // skipping forward clears the queue and ends the listening session
                if (get(atQueueEnd)) {
                        resetQueue()
                        return
                }

                skipToIndex(get(currentTrackIndex) + 1)
        }

        function autoSkipNext() {

                // If repeat one is enabled, refresh the queue to restart the currently
                // playing track
                if (get(queueRepeatMode) === "ONE") {
                        refreshQueue()
                        return
                }

                skipNext()
        }

        function skipPrev() {

                // If repeat all is enabled, and the user is at the start of the queue,
                // skipping back goes to the last song in the queue
                if (get(queueRepeatMode) === "ALL" && get(atQueueStart)) {
                        skipToIndex(get(allQueuedTracks).length - 1)
                        return
                }

                // If repeat all is disabled, and the user is at the start of the queue,
                // skipping back simply refreshes the queue (restarting the current song)
                if (get(atQueueStart)) {
                        refreshQueue()
                        return
                }

                skipToIndex(get(currentTrackIndex) - 1)
        }

        function skipToIndex(index: number) {

                // Guard clause to prevent skipping out of the queue
                // This should NEVER happen, as normal logic should prevent it from trying
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

                refreshQueue()
        }

        function resetQueue() {
                const prefs = get(queuePrefs)

                set(EMPTY_PLAYER_STATE)

                update((store) => ({
                        ...store,
                        shuffled: prefs.shuffleEnabled,
                        repeat: prefs.repeatMode,

                }))
        }

        return {
                subscribe,
                startQueue,
                refreshQueue,
                addTracksToQueue,
                shuffleTracks,
                unshuffleTracks,
                toggleShuffle,
                toggleRepeat,
                skipNext,
                autoSkipNext,
                skipPrev,
                skipToIndex,
                resetQueue,
        }
}

export const playerController = createPlayerControllerStore()

export const queueSessionKey = derived(
        (playerController),
        ($playerController) => $playerController.trackSessionKey
)

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

export const queuePrefs: Readable<PlayerPrefs> = derived(
        (playerController),
        ($playerController) => {
                return {
                        shuffleEnabled: $playerController.shuffled,
                        repeatMode: $playerController.repeat,
                }
        }
)

export const queueRepeatMode = derived(
        (queuePrefs),
        ($queuePrefs) => $queuePrefs.repeatMode
)

export const queueShuffleEnabled = derived(
        (queuePrefs),
        ($queuePrefs) => $queuePrefs.shuffleEnabled
)


