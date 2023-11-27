import { sb } from "../database/supabase";
import type { APIResult } from "./types";

type TrackAPIResult = APIResult<Map<string, Track>>

export interface TrackForm {
        id: string,
        title: string,
        artists: string,
        duration: number,
        index: number,
        albumID: string,
}

export class TrackAPI {
        constructor() { }

        static async fetch(userID: string): Promise<TrackAPIResult> {
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

                if (error) {
                        console.error(error.message)

                        return {
                                data: new Map<string, Track>(),
                                success: false,
                                error: error.message,
                        }
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
                        data: tracks,
                        success: true,
                }
        }

        static async create(form: TrackForm): Promise<APIResult> {
                const response = await sb
                        .from('tracks')
                        .insert({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                duration: form.duration,
                                index: form.index,
                                album_id: form.albumID,
                        })

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
                }
        }

        static async update(form: TrackForm): Promise<APIResult> {
                const response = await sb
                        .from('tracks')
                        .update({
                                title: form.title,
                                artists: form.artists,
                        })
                        .eq('id', form.id)

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
                }
        }

        static async remove(form: TrackForm): Promise<APIResult> {
                const response = await sb
                        .from('tracks')
                        .delete()
                        .eq('id', form.id)

                console.log("REMOVING TRACK")
                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message,
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

