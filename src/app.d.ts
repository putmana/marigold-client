declare global {

        namespace App {
                // stuff goes here maybe
        }

        export type Mode = "ALBUMS" | "ARTISTS" | "PLAYLISTS"

        export type Cover = {
                full: string
                large: string
                small: string
        }

        export type Color = {
                light: string
                dark: string
        }

        export type Palette = {
                bright: Color
                main: Color
                dark: Color
                border: Color
        }

        export type User = {
                id: string
                username: string
                email: string
        }

        export type Playlist = {
                id: string
                title: string
                description: string
                duration: number
                cover: Cover
                palette: Palette
                tracks: Track[]
        }

        export type Album = {
                id: string
                title: string
                artist: {
                        id: string
                        name: string
                }
                duration: number
                year: string
                cover: Cover
                palette: Palette
                tracks: Track[]
        }

        export type Track = {
                id: string
                title: string
                artist: {
                        id: string
                        name: string
                }
                duration: number
                cover: Cover
                palette: Palette
                file: string
                index: number
        }
}
export { }
