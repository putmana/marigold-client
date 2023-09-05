export function parseArtistData(data: any): Artist {
	return {
		id: data.id,
		name: data.attributes.name
	} as Artist
}

export function parseTrackData(data: any): Track {
	return {
		id: data.id,
		title: data.attributes.title,
		artists: data.relationships.artists.map((raw) => parseArtistData(raw)),
		duration: data.attributes.duration,
		cover: data.attributes.cover,
		path: data.attributes.path
	} as Track
}

export function parseAlbumData(data: any): Album {
	return {
		id: data.id,
		title: data.attributes.title,
		artists: data.relationships.artists.map((raw) => parseArtistData(raw)),
		category: data.attributes.category,
		year: data.attributes.year,
		cover: data.attributes.cover
	} as Album
}

export function parseAlbumTracksData(data: any): AlbumTracks {
	return {
		info: parseAlbumData(data),
		tracks: data.relationships.tracks.map((raw) => parseTrackData(raw))
	} as AlbumTracks
}

export function parsePlaylistData(data: any): Playlist {
	return {
		id: data.id,
		title: data.attributes.title,
		username: data.attributes.username,
		description: data.attributes.description,
		cover: data.attributes.cover
	} as Playlist
}

export function parsePlaylistTracksData(data: any): PlaylistTracks {
	return {
		info: parsePlaylistData(data),
		tracks: data.relationships.tracks.map((raw) => parseTrackData(raw))
	} as PlaylistTracks
}
