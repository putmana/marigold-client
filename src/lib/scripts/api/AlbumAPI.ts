import { Palette } from "../color-engine/palette"
import { sb } from "../database/supabase"
import type { APIResult } from "./types"

type AlbumAPIResult = APIResult<Map<string, Album>>

export interface AlbumForm {
        id: string,
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

                if (error) {
                        console.error(error.message)

                        return {
                                data: new Map<string, Album>(),
                                success: false,
                                error: error.message
                        }
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
                        data: albums,
                        success: true,
                }
        }

        static async create(form: AlbumForm): Promise<APIResult> {
                const response = await sb
                        .from('albums')
                        .insert({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                year: form.year,
                                palette: form.palette.toString(),
                        })

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
                }
        }

        static async update(form: AlbumForm): Promise<APIResult<null>> {
                const response = await sb
                        .from('albums')
                        .update({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                year: form.year,
                                palette: form.palette.toString(),
                        })
                        .eq('id', form.id)

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
                }
        }

        static async remove(form: AlbumForm): Promise<APIResult> {
                const response = await sb
                        .from('albums')
                        .delete()
                        .eq('id', form.id)

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
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
                small: getSize(500),
        }
}
