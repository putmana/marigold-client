import { loadAlbums } from "./albums"
import { loadArtists } from "./artists"
import { loadCovers } from "./covers"
import { loadPlaylists } from "./playlists"
import { loadTracks } from "./tracks"

export async function loadLibrary(): Promise<Library> {
        const library: Library = {
                albums: await loadAlbums(),
                artists: await loadArtists(),
                covers: await loadCovers(),
                playlists: await loadPlaylists(),
                tracks: await loadTracks(),
        }

        return library
}
