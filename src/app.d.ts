import type { Colorset } from "$lib/scripts/color-engine/color-engine"

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
                palette: string
                trackIDs: string[]
        }

        export type Playlist = {
                id: string
                title: string
                description: string
                cover: Cover
                palette: string
                trackIDs: string[]
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
}
export { }
