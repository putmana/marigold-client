import type { Colorset } from "$lib/scripts/color-engine/color-engine"

declare global {

        namespace app {
                // stuff goes here maybe
        }

        export type mode = "albums" | "artists" | "playlists"

        export interface DatabaseAction<T> {
                result: T,
                success: boolean,
                message?: string,
        }

        export type User = {
                id: string
                username: string
                email: string
        }

        export type Album = {
                id: string
                title: string
                artists: string
                description: string
                year: string
                coverID: string
                trackIDs: string[]
        }

        export type AlbumData = {
                title: string
                description: string
                year: string
                orderedArtists: OrderedArtist[]
                orderedTracks: OrderedTrack[]
        }

        export type Cover = {
                id: string
                palette: Colorset
                fileLarge: string
                fileSmall: string
        }

        export type Playlist = {
                id: string
                title: string
                description: string
                coverID: string
                trackIDs: string[]
        }

        export type Track = {
                id: string
                title: string
                artists: string
                duration: number
                file: string
                albumID: string
        }

        export type OrderedTrack = {
                id: string
                index: number
        }

        export type OrderedArtist = {
                id: string
                priority: number
        }

        type Library = {
                albums: Map<string, Album>
                covers: Map<string, Cover>
                playlists: Map<string, Playlist>
                tracks: Map<string, Track>
        }
}
export { }
