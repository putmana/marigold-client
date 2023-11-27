import { derived, get, writable, type Writable } from "svelte/store"
import { PlaylistAPI } from "../api/PlaylistAPI"
import { user } from "./UserStore"
import { AlbumAPI } from "../api/AlbumAPI"
import { TrackAPI } from "../api/TrackAPI"
import type { APIResult } from "../api/types"

type Library = {
        playlists: Map<string, Playlist>
        albums: Map<string, Album>
        tracks: Map<string, Track>
}

const EMPTY_LIBRARY: Library = {
        playlists: new Map(),
        albums: new Map(),
        tracks: new Map(),
}

function createLibraryStore() {
        const { subscribe, set }: Writable<Library> = writable(EMPTY_LIBRARY)

        async function load(): Promise<APIResult> {

                // <---- Load Playlists ---->
                const playlistResponse = await PlaylistAPI.fetch(get(user).id)

                if (playlistResponse.error) {
                        console.error(playlistResponse.error)
                        return {
                                success: false,
                                error: playlistResponse.error,
                        }
                }

                const playlists = playlistResponse.data


                // <---- Load Albums ---->
                const albumResponse = await AlbumAPI.fetch(get(user).id)

                if (albumResponse.error) {
                        console.error(albumResponse.error)
                        return {
                                success: false,
                                error: albumResponse.error,
                        }
                }

                const albums = albumResponse.data


                // <---- Load Tracks ---->
                const trackResponse = await TrackAPI.fetch(get(user).id)

                if (trackResponse.error) {
                        console.error(trackResponse.error)
                        return {
                                success: false,
                                error: trackResponse.error,
                        }
                }

                const tracks = trackResponse.data


                // <---- Set the store if there are no errors ---->
                set({ playlists, albums, tracks, })

                return {
                        success: true
                }
        }

        return {
                subscribe,
                load,
        }
}

export const library = createLibraryStore()

export const playlists = derived((library), ($library) => $library.playlists)
export const albums = derived((library), ($library) => $library.albums)
export const tracks = derived((library), ($library) => $library.tracks)
