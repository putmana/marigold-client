function parseArtistData(data) {
  return {
    id: data.id,
    name: data.attributes.name
  };
}
function parseTrackData(data) {
  return {
    id: data.id,
    title: data.attributes.title,
    artists: data.relationships.artists.map((raw) => parseArtistData(raw)),
    duration: data.attributes.duration,
    cover: data.attributes.cover,
    path: data.attributes.path
  };
}
function parseAlbumData(data) {
  return {
    id: data.id,
    title: data.attributes.title,
    artists: data.relationships.artists.map((raw) => parseArtistData(raw)),
    category: data.attributes.category,
    year: data.attributes.year,
    cover: data.attributes.cover
  };
}
function parseAlbumTracksData(data) {
  return {
    info: parseAlbumData(data),
    tracks: data.relationships.tracks.map((raw) => parseTrackData(raw))
  };
}
function parsePlaylistData(data) {
  return {
    id: data.id,
    title: data.attributes.title,
    username: data.attributes.username,
    description: data.attributes.description,
    cover: data.attributes.cover
  };
}
function parsePlaylistTracksData(data) {
  return {
    info: parsePlaylistData(data),
    tracks: data.relationships.tracks.map((raw) => parseTrackData(raw))
  };
}
export {
  parsePlaylistTracksData as a,
  parseAlbumData as b,
  parseAlbumTracksData as c,
  parsePlaylistData as p
};
