import { sb } from "../database/supabase";
import type { APIResult } from "./types";

export class CoverAPI {
        constructor() { }

        static async upload(file: File, coverID: string, userID: string): Promise<void> {
                const { error } = await sb
                        .storage
                        .from('covers')
                        .upload(`${userID}/${coverID}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                        })

                if (error) throw new Error(error.message)
        }
}
