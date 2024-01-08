import { Palette } from "../color-engine/palette"
import { sb } from "../database/supabase"

export interface AlbumForm {
        id: string,
        title: string,
        artists: string,
        year: string,
        palette: Palette,
}

export class AlbumAPI {
        constructor() { }

        static async fetch(userID: string): Promise<Map<string, Album>> {
                const query = `
                        id,
                        title,
                        artists,
                        year,
                        palette,
                        tracks (
                                id,
                                index
                        )
                `

                const { data, error } = await sb
                        .from('albums')
                        .select(query)
                        .order('title', { ascending: true })

                if (error) throw new Error(error.message)

                const albums = new Map<string, Album>(
                        data.map(data => [
                                data.id,
                                {
                                        id: data.id,
                                        title: data.title,
                                        artists: data.artists,
                                        year: data.year,
                                        cover: getCoverURL(userID, data.id),
                                        palette: Palette.parse(data.palette),
                                        tracklist: data.tracks
                                                .sort((a, b) => a.index - b.index)
                                                .map(t => {
                                                        return {
                                                                id: t.id,
                                                                index: t.index,
                                                        }
                                                })
                                }
                        ])
                ) satisfies Map<string, Album>

                return albums
        }

        static async create(form: AlbumForm): Promise<void> {
                const { error } = await sb
                        .from('albums')
                        .insert({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                year: form.year,
                                palette: form.palette.toString(),
                        })

                if (error) throw new Error(error.message)
        }

        static async update(form: AlbumForm): Promise<void> {
                const { error } = await sb
                        .from('albums')
                        .update({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                year: form.year,
                                palette: form.palette.toString(),
                        })
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
        }

        static async remove(form: AlbumForm): Promise<void> {
                const { error } = await sb
                        .from('albums')
                        .delete()
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
        }
}

function getCoverURL(userID: string, albumID: string): Cover {
        function getSize(size: number): string {
                return sb
                        .storage
                        .from('covers')
                        .getPublicUrl(`${userID}/${albumID}`, {
                                transform: {
                                        resize: 'contain',
                                        width: size,
                                        height: size,
                                }
                        })
                        .data
                        .publicUrl

        }

        return {
                large: getSize(500),
                small: getSize(500),
        }
}
