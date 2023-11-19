import { sb } from "../database/supabase";
import type { APIForm, APIResult } from "./types";

type PlaylistAPIResult = APIResult<Map<string, Playlist>>

export class PlaylistAPI {

        constructor() { }

        static async fetch(userID: string): Promise<PlaylistAPIResult> {
                const query = `
                        id,
                        title,
                        description,
                        palette,
                        playlists_tracks (
                                track_id,
                                index
                        )
                `

                const { data, error } = await sb
                        .from('playlists')
                        .select(query)
                        .order('title')

                if (error) return {
                        result: new Map<string, Playlist>(),
                        success: false,
                        error: error.message
                }

                const playlists = new Map<string, Playlist>(
                        data.map(data => [
                                data.id,
                                {
                                        id: data.id,
                                        title: data.title,
                                        description: data.description,
                                        cover: getCoverURL(userID, data.id),
                                        palette: data.palette,
                                        tracklist: data.playlists_tracks
                                                .sort((a, b) => a.index - b.index)
                                                .map(t => {
                                                        return {
                                                                id: t.track_id,
                                                                index: t.index,
                                                        }
                                                })
                                }
                        ])
                ) satisfies Map<string, Playlist>

                return {
                        result: playlists,
                        success: true,
                }
        }

        static async upsert(form: APIForm<Playlist>): Promise<APIResult<null>> {
                // <---- UPSERT PLAYLIST INFORMATION ---->
                const q1 = {
                        id: form.data.id,
                        title: form.data.title,
                        description: form.data.description,
                        palette: form.data.palette,
                }

                const r1 = await sb
                        .from('playlists')
                        .upsert(q1)

                if (r1.error) return {
                        result: null,
                        success: false,
                        error: r1.error.message,
                }

                // <---- UPLOAD PLAYLIST COVER FILE ---->
                if (form.file) {
                        const r2 = await sb
                                .storage
                                .from('covers')
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

                return {
                        result: null,
                        success: true,
                }
        }

        static async upsertTracks(playlistID: string, forms: APIForm<PlaylistTrack>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                // <---- UPSERT TRACK ORDER ---->
                const q1 = forms.map(form => {
                        return {
                                playlist_id: playlistID,
                                track_id: form.data.id,
                                index: form.data.index,
                        }
                })

                const r1 = await sb
                        .from('playlists_tracks')
                        .upsert(q1)

                if (r1.error) return {
                        result: null,
                        success: false,
                        error: r1.error.message,
                }

                return {
                        result: null,
                        success: true,
                }
        }

        static async removeTracks(playlistID: string, forms: APIForm<PlaylistTrack>[]): Promise<APIResult<null>> {
                if (forms.length === 0) return {
                        result: null,
                        success: true,
                }

                // <---- REMOVE TRACKS FROM PLAYLIST ---->
                const r1 = await sb
                        .from('playlists_tracks')
                        .delete()
                        .eq('playlist_id', playlistID)
                        .in('track_id', forms.map(form => form.data.id))

                if (r1.error) return {
                        result: null,
                        success: false,
                        error: r1.error.message,
                }

                return {
                        result: null,
                        success: true,
                }
        }
}



function getCoverURL(userID: string, playlistID: string): Cover {
        function getSize(size: number): string {
                return sb
                        .storage
                        .from('covers')
                        .getPublicUrl(`${userID}/${playlistID}`, {
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
