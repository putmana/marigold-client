import { B as BASE_API_URL, A as API_VERSION } from "./auth.js";
import { v as verifyToken } from "./api-verify-token.js";
import { b as parseAlbumData, c as parseAlbumTracksData } from "./parse.js";
const ALBUM_URL = BASE_API_URL + API_VERSION + "/album";
async function getAllAlbums(token) {
  let albums = await verifyToken(token).then((valid) => {
    if (!valid) {
      throw new Error("BAD TOKEN");
    } else {
      return fetch(ALBUM_URL, {
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
            return response2.data.map((resource) => parseAlbumData(resource));
          });
        }
      });
    }
  });
  return albums;
}
async function getAlbumTracks(token, id) {
  let album = await verifyToken(token).then((valid) => {
    let ALBUM_ID_URL = ALBUM_URL + "/" + id;
    if (!valid) {
      throw new Error("BAD TOKEN");
    } else {
      return fetch(ALBUM_ID_URL, {
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
            return parseAlbumTracksData(response2.data);
          });
        }
      });
    }
  });
  return album;
}
export {
  getAlbumTracks as a,
  getAllAlbums as g
};
