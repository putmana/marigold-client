import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config"
import { verifyToken } from "./api-verify-token"
import { parseAlbumData, parseAlbumTracksData } from "./parse"

const ALBUM_URL = BASE_API_URL + API_VERSION + "/album"

export async function getAllAlbums(token: string): Promise<Album[]> {
	// CHECK TOKEN IS VALID BEFORE DOING ANYTHING ELSE
	let albums: Album[] = await verifyToken(token).then((valid) => {
		if (!valid) {
			throw new Error("BAD TOKEN")
		} else {
			return fetch(ALBUM_URL, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			}).then((response) => {
				if (!response.ok) {
					console.error("BAD RESPONSE", response)
					throw new Error("BAD RESPONSE")
				} else {
					return response.json().then((response) => {
						return response.data.map((resource) => parseAlbumData(resource))
					})
				}
			})
		}
	})

	return albums
}

export async function getAlbumTracks(token: string, id: string): Promise<AlbumTracks> {
	let album: AlbumTracks = await verifyToken(token).then((valid) => {
		let ALBUM_ID_URL = ALBUM_URL + "/" + id
		if (!valid) {
			throw new Error("BAD TOKEN")
		} else {
			return fetch(ALBUM_ID_URL, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			}).then((response) => {
				if (!response.ok) {
					console.error("BAD RESPONSE", response)
					throw new Error("BAD RESPONSE")
				} else {
					return response.json().then((response) => {
						return parseAlbumTracksData(response.data)
					})
				}
			})
		}
	})

	return album
}

export async function updateAlbum(
	token: string,
	info: Album,
	tracks: Track[],
	newTracks: NewTrack[]
): Promise<Boolean> {
	let res: boolean = await verifyToken(token).then((valid) => {
		let ALBUM_ID_URL = ALBUM_URL + "/" + info.id
		if (!valid) {
			throw new Error("BAD TOKEN")
		} else {
			return fetch(ALBUM_ID_URL, {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token
				},
				body: JSON.stringify({
					info: info,
					tracks: tracks,
					newTracks: newTracks
				})
			}).then((response) => {
				if (!response.ok) {
					console.error("BAD RESPONSE", response)
					return false
				} else {
					return true
				}
			})
		}
	})

	return res
}
