import { B as BASE_API_URL, A as API_VERSION } from "./auth.js";
import { v as verifyToken } from "./api-verify-token.js";
import { p as parsePlaylistData, a as parsePlaylistTracksData } from "./parse.js";
const PLAYLIST_URL = BASE_API_URL + API_VERSION + "/playlist";
async function getAllPlaylists(token) {
  let playlists = await verifyToken(token).then((valid) => {
    if (!valid) {
      throw new Error("BAD TOKEN");
    } else {
      return fetch(PLAYLIST_URL, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((response) => {
        if (!response.ok) {
          console.error("BAD RESPONSE", response);
          throw new Error("BAD RESPONSE");
        } else {
          return response.json().then((response2) => {
            return response2.data.map((resource) => parsePlaylistData(resource));
          });
        }
      });
    }
  });
  return playlists;
}
async function getPlaylistTracks(token, id) {
  let playlist = await verifyToken(token).then((valid) => {
    let PLAYLIST_ID_URL = PLAYLIST_URL + "/" + id;
    if (!valid) {
      throw new Error("BAD TOKEN");
    } else {
      return fetch(PLAYLIST_ID_URL, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then((response) => {
        if (!response.ok) {
          console.error("BAD RESPONSE", response);
          throw new Error("BAD RESPONSE");
        } else {
          return response.json().then((response2) => {
            return parsePlaylistTracksData(response2.data);
          });
        }
      });
    }
  });
  return playlist;
}
export {
  getPlaylistTracks as a,
  getAllPlaylists as g
};
