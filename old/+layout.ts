import type { LayoutLoad } from "./$types";

export const load = (async({ params, fetch }) => {
    const result = await fetch("http://localhost:80/api/playlist")
    const playlists = (await result.json()).data as Playlist[]
    const current = params.id;

    return { playlists, current };
}) satisfies LayoutLoad;