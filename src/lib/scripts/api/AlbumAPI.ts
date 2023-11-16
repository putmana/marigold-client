import { sb } from "../database/supabase"
import type { APIForm, APIResult } from "./types"

type AlbumAPIResult = APIResult<Map<string, Album>>

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
                                id
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
                                        palette: data.palette,
                                        trackIDs: data.tracks.map(t => t.id),
                                }
                        ])
                ) satisfies Map<string, Album>

                return {
                        result: albums,
                        success: true,
                }
        }

        static async upsert(forms: APIForm<Album>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                const query = forms.map(form => {
                        return {
                                id: form.data.id,
                                title: form.data.title,
                                artists: form.data.artists,
                                year: form.data.year,
                                palette: form.data.palette,
                        }
                })

                const { error } = await sb
                        .from('albums')
                        .upsert(query)

                if (error) return {
                        result: null,
                        success: false,
                        error: error.message,
                }

                // Upload new album art files to the database
                for (const form of forms) {
                        if (form.file) {
                                const { error } = await sb
                                        .storage
                                        .from('covers')
                                        .upload(`${form.userID}/${form.data.id}`, form.file, {
                                                cacheControl: '3600',
                                                upsert: true,
                                        })

                                if (error) return {
                                        result: null,
                                        success: false,
                                        error: error.message,
                                }
                        }
                }

                return {
                        result: null,
                        success: true,
                }
        }

        static async delete(forms: APIForm<Album>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                const ids = forms.map(form => form.data.id)

                const res1 = await sb
                        .from('albums')
                        .delete()
                        .in('id', ids)

                if (res1.error) return {
                        result: null,
                        success: false,
                        error: res1.error.message,
                }

                const res2 = await sb
                        .storage
                        .from('covers')
                        .remove(ids)

                if (res2.error) return {
                        result: null,
                        success: false,
                        error: res2.error.message,
                }

                return {
                        result: null,
                        success: true,
                }

        }
}

function getCoverURL(userID: string, albumID: string, size?: number): Cover {
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
