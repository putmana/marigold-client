import { Palette } from "../color-engine/palette";
import { sb } from "../database/supabase";
import type { APIResult } from "./types";

type PlaylistAPIResult = APIResult<Map<string, Playlist>>

export interface PlaylistForm {
        title: string,
        description: string,
        palette: Palette,
}

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
                                        palette: Palette.parse(data.palette),
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

        static async update(id: string, form: PlaylistForm): Promise<APIResult<null>> {
                const response = await sb
                        .from('playlists')
                        .update({
                                title: form.title,
                                description: form.description,
                                palette: form.palette.toString(),
                        })
                        .eq('id', id)

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
