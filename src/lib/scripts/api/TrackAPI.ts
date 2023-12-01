import { sb } from "../database/supabase";

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

        static async fetch(userID: string): Promise<Map<string, Track>> {
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

                if (error) throw new Error(error.message)

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

                return tracks
        }

        static async create(form: TrackForm): Promise<void> {
                const { error } = await sb
                        .from('tracks')
                        .insert({
                                id: form.id,
                                title: form.title,
                                artists: form.artists,
                                duration: form.duration,
                                index: form.index,
                                album_id: form.albumID,
                        })

                if (error) throw new Error(error.message)
        }

        static async update(form: TrackForm): Promise<void> {
                const { error } = await sb
                        .from('tracks')
                        .update({
                                title: form.title,
                                artists: form.artists,
                        })
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
        }

        static async remove(form: TrackForm): Promise<void> {
                const { error } = await sb
                        .from('tracks')
                        .delete()
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
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

