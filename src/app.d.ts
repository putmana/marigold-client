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
                description: string
                year: string
                artistID: string
                coverID: string
                orderedTracks: OrderedTrack[]
        }

        export type Artist = {
                id: string
                name: string
                albumIDs: string[]
        }

        export type Cover = {
                id: string
                palette: string
                fileLarge: string
                fileSmall: string
        }

        export type Playlist = {
                id: string
                title: string
                description: string
                coverID: string
                orderedTracks: OrderedTrack[]
        }

        export type Track = {
                id: string
                title: string
                duration: string
                file: string
                albumID: string
        }

        export type IndexedTrack = {
                id: string
                index: number
        }

        type Library = {
                albums: Map<string, Album>
                artists: Map<string, Artist>
                covers: Map<string, Cover>
                playlists: Map<string, Playlist>
                tracks: Map<string, Track>
        }
}
export { }
