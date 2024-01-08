import type { Colorset } from "$lib/scripts/color-engine/color-engine"
import type { Palette } from "$lib/scripts/color-engine/palette"

declare global {

        namespace app {
                // stuff goes here maybe
        }

        export type User = {
                id: string
                username: string
                email: string
        }

        export type Cover = {
                large: string
                small: string
        }

        export type Album = {
                id: string
                title: string
                artists: string
                year: string
                cover: Cover
                palette: Palette
                tracklist: IndexedTrack[]
        }

        export type Playlist = {
                id: string
                title: string
                description: string
                cover: Cover
                palette: Palette
                tracklist: PlaylistTrack[]
        }

        export type Track = {
                id: string
                title: string
                artists: string
                duration: number
                index: number
                file: string
                albumID: string
        }

        export type IndexedTrack = {
                id: string
                index: number
        }

        export type PlaylistTrack = {
                id: string
                index: number
                refID: string
        }
}

export { }
