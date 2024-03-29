import { Palette } from "../color-engine/palette";
import { sb } from "../database/supabase";

export interface PlaylistForm {
        id: string,
        title: string,
        description: string,
        palette: Palette,
}

export interface PlaylistTrackForm {
        id: string,
        trackID: string,
        playlistID: string,
        index: number,
}

export class PlaylistAPI {
        constructor() { }

        static async fetch(userID: string): Promise<Map<string, Playlist>> {
                const query = `
                        id,
                        title,
                        description,
                        palette,
                        playlists_tracks (
                                id,
                                track_id,
                                index
                        )
                `

                const { data, error } = await sb
                        .from('playlists')
                        .select(query)
                        .order('title')

                if (error) throw new Error(error.message)

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
                                                .map(t => {
                                                        return {
                                                                id: t.track_id,
                                                                index: t.index,
                                                                refID: t.id,
                                                        }
                                                })
                                                .sort((a, b) => a.index - b.index)
                                }
                        ])
                ) satisfies Map<string, Playlist>

                return playlists
        }

        static async create(form: PlaylistForm): Promise<void> {
                const { error } = await sb
                        .from('playlists')
                        .insert({
                                id: form.id,
                                title: form.title,
                                description: form.description,
                                palette: form.palette.toString(),
                        })

                if (error) throw new Error(error.message)
        }

        static async update(form: PlaylistForm): Promise<void> {
                const { error } = await sb
                        .from('playlists')
                        .update({
                                title: form.title,
                                description: form.description,
                                palette: form.palette.toString(),
                        })
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
        }

        static async remove(form: PlaylistForm): Promise<void> {
                const { error } = await sb
                        .from('playlists')
                        .delete()
                        .eq('id', form.id)

                if (error) throw new Error(error.message)
        }

        static async addTrack(form: PlaylistTrackForm): Promise<void> {
                const { error } = await sb
                        .from('playlists_tracks')
                        .insert({
                                id: form.id,
                                track_id: form.trackID,
                                playlist_id: form.playlistID,
                                index: form.index,
                        })

                if (error) throw new Error(error.message)
        }

        static async removeTrack(refID: string): Promise<void> {
                const { error } = await sb
                        .from('playlists_tracks')
                        .delete()
                        .eq('id', refID)

                if (error) throw new Error(error.message)
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
