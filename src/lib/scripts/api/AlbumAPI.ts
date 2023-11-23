import { Palette } from "../color-engine/palette"
import { sb } from "../database/supabase"
import type { APIResult } from "./types"

type AlbumAPIResult = APIResult<Map<string, Album>>

export interface AlbumForm {
        title: string,
        artists: string,
        year: string,
        palette: Palette,
}

export class AlbumAPI {

        constructor() { }

        static async fetch(userID: string): Promise<AlbumAPIResult> {
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

                if (error) return {
                        result: new Map<string, Album>(),
                        success: false,
                        error: error.message
                }

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

                console.log(albums)

                return {
                        result: albums,
                        success: true,
                }
        }

        static async update(id: string, form: AlbumForm): Promise<APIResult<null>> {
                const response = await sb
                        .from('albums')
                        .update({
                                title: form.title,
                                artists: form.artists,
                                year: form.year,
                                palette: form.palette.toString(),
                        })
                        .eq('id', id)

                if (response.error) return {
                        result: null,
                        success: false,
                        error: response.error.message,
                }

                return {
                        result: null,
                        success: true,
                }
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
                small: getSize(100),
        }
}
