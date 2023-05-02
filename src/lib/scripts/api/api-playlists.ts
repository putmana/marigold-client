import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config";
import { verifyToken } from "./api-verify-token";
import { parsePlaylistData, parsePlaylistTracksData } from "./parse";

const PLAYLIST_URL = BASE_API_URL + API_VERSION + "/playlist"

export async function getAllPlaylists(token: string): Promise<Playlist[]> {
    // CHECK TOKEN IS VALID BEFORE DOING ANYTHING ELSE
    let playlists: Playlist[] = await verifyToken(token).then(valid => {
        if (!valid) {
            throw new Error("BAD TOKEN")
        } else {
            return fetch(PLAYLIST_URL, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                if (!response.ok) {
                    console.error("BAD RESPONSE", response)
                    throw new Error("BAD RESPONSE")
                } else {
                    return response.json().then(response => {
                        return response.data.map(resource => parsePlaylistData(resource))
                    })
                }
            })
        }
    })

    return playlists
}

export async function getPlaylistTracks(token: string, id: string): Promise<PlaylistTracks> {
    let playlist: PlaylistTracks = await verifyToken(token).then(valid => {
        let PLAYLIST_ID_URL = PLAYLIST_URL + "/" + id
        if (!valid) {
            throw new Error("BAD TOKEN")
        } else {
            return fetch(PLAYLIST_ID_URL, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                if (!response.ok) {
                    console.error("BAD RESPONSE", response)
                    throw new Error("BAD RESPONSE")
                } else {
                    return response.json().then(response => {
                        return parsePlaylistTracksData(response.data);
                    })
                }
            })
        }
    })
    
    return playlist;
}