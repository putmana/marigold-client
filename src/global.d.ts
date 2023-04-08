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
    
    type QueueStage = {
        // START: Stop the currently playing tracks and start a fresh queue with the provided tracks 
        // ADD: Manually add a track or list of tracks to the queue
        // REORDER: Reorder the tracks in the queue to match the order of the provided tracks
        // DIE: Clear the current queue and do not play anything
        flag: "START" | "ADD" | "REORDER" | "REORDER_MANUAL" | "DIE" 
        // Marked true once the Stage has been processed by the controller
        seen: boolean;
        // The list of tracks to be played
        tracks?: QueueTrack[];
        // The position to start playing from
        position?: number;
    }

    type QueueTrack = {
        id: string;
        source: "AUTO" | "MANUAL";
        track: Track;
    }

    type Palette = {
        bright: {
            light: string;
            dark: string;
        }
        main: {
            light: string;
            dark: string;
        }
        dim: {
            light: string;
            dark: string;
        }
    }
}

export {};
