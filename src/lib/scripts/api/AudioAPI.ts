import { sb } from "../database/supabase";

export class AudioAPI {
        constructor() { }

        static async upload(file: File, audioID: string, userID: string): Promise<void> {
                const { error } = await sb
                        .storage
                        .from('audio')
                        .upload(`${userID}/${audioID}`, file, {
                                cacheControl: '3600',
                                upsert: true,
                        })

                if (error) throw new Error(error.message)
        }

        static async remove(audioID: string, userID: string) {
                const { error } = await sb
                        .storage
                        .from('audio')
                        .remove([`${userID}/${audioID}`])

                if (error) throw new Error(error.message)
        }
}
