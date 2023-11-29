import { sb } from "../database/supabase";
import type { APIResult } from "./types";

export class AudioAPI {
        constructor() { }

        static async upload(file: File, audioID: string, userID: string): Promise<APIResult<null>> {
                const response = await sb
                        .storage
                        .from('audio')
                        .upload(`${userID}/${audioID}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                        })

                if (response.error) console.error(response.error.message)

                return {
                        success: response.error ? false : true,
                        error: response.error?.message
                }

        }

        static async remove(audioID: string, userID: string) {
                const response = await sb
                        .storage
                        .from('audio')
                        .remove([`${userID}/${audioID}`])

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
