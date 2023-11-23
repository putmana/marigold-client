import { sb } from "../database/supabase";
import type { APIResult } from "./types";

export class CoverAPI {
        constructor() { }

        static async upload(userID: string, coverID: string, file: File): Promise<APIResult<null>> {
                const response = await sb
                        .storage
                        .from('covers')
                        .upload(`${userID}/${coverID}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                        })

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
