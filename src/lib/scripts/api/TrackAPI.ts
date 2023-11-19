import { sb } from "../database/supabase";
import type { APIForm, APIResult } from "./types";

type APITrackResult = APIResult<Map<string, Track>>

export class TrackAPI {
        constructor() { }

        static async fetch(userID: string): Promise<APITrackResult> {
                const query = `
                        id,
                        title,
                        artists,
                        duration,
                        index,
                        album_id
                `

                const { data, error } = await sb
                        .from('tracks')
                        .select(query)

                if (error) return {
                        result: new Map<string, Track>(),
                        success: false,
                        error: error.message,
                }

                const tracks = new Map<string, Track>(
                        data.map(data => [
                                data.id,
                                {
                                        id: data.id,
                                        title: data.title,
                                        artists: data.artists,
                                        duration: data.duration,
                                        index: data.index,
                                        file: getAudioURL(userID, data.id),
                                        albumID: data.album_id,
                                }
                        ])
                ) satisfies Map<string, Track>

                return {
                        result: tracks,
                        success: true,
                }
        }

        static async upsert(forms: APIForm<Track>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                // <---- UPSERT TRACK INFORMATION ---->
                const q1 = forms.map(form => {
                        return {
                                id: form.data.id,
                                title: form.data.title,
                                artists: form.data.artists,
                                duration: form.data.duration,
                                index: form.data.index,
                                album_id: form.data.albumID,
                        }
                })

                const r1 = await sb
                        .from('tracks')
                        .upsert(q1)

                if (r1) return {
                        result: null,
                        success: false,
                        error: r1.error.message,
                }

                // <---- UPLOAD TRACK AUDIO FILE ---->
                for (const form of forms) {
                        if (form.file) {
                                const r2 = await sb
                                        .storage
                                        .from('audio')
                                        .upload(`${form.userID}/${form.data.id}`, form.file, {
                                                cacheControl: '3600',
                                                upsert: true,
                                        })

                                if (r2.error) return {
                                        result: null,
                                        success: false,
                                        error: r2.error.message,
                                }
                        }
                }

                return {
                        result: null,
                        success: true,
                }
        }

        static async delete(forms: APIForm<Track>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                // <---- DELETE TRACK ROW IN DATABASE ---->
                const ids = forms.map(form => form.data.id)

                const res1 = await sb
                        .from('tracks')
                        .delete()
                        .in('id', ids)

                if (res1.error) return {
                        result: null,
                        success: false,
                        error: res1.error.message,
                }

                // <---- DELETE TRACK AUDIO FILE ---->
                const res2 = await sb
                        .storage
                        .from('audio')
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

function getAudioURL(userID: string, trackID: string): string {
        return sb
                .storage
                .from('audio')
                .getPublicUrl(`${userID}/${trackID}`)
                .data
                .publicUrl
}
