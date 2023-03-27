declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

    type ContentType = "PLAYLIST" | "ALBUM" | "ARTIST"

    type DeckContent = {
        content_type: ContentType,
        content_id: string | false // the ID of the artist/album/playlist currently being displayed
    }

    type Artist = {
        id: string;
        name: string;
    }

    type Track = {
        id: string;
        title: string;
        artists: Artist[];
        duration: number;
        cover: {
            path: string;
            color: string;
        }
        path: string;
    }

	type Playlist = {
		id: string;
		title: string;
		username: string;
		description: string;
		cover: {
			path: string;
			color: string;
		}
	}

    type PlaylistTracks = {
        info: Playlist;
        tracks: Track[];
    }

    type Album = {
		id: string;
		title: string;
		artists: Artist[];
		category: string;
        year: string;
		cover: {
			path: string;
			color: string;
		}
	}

    type AlbumTracks = {
        info: Album;
        tracks: Track[];
    }

    type Artist = {
        id: string;
        name: string;
    }
    
    type QueuedTrack = {
        id: symbol,
        track: Track
    }
}

export {};
