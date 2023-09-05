import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config"
import { verifyToken } from "./api-verify-token"

const ARTIST_URL = BASE_API_URL + API_VERSION + "/artist"

export async function getAllArtists(token: string): Promise<Artist[]> {
	//
	let artists: Artist[] = await verifyToken(token).then((valid) => {
		if (!valid) {
			throw new Error("BAD TOKEN")
		} else {
			return fetch(ARTIST_URL, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + token
				}
			}).then((response) => {
				if (!response.ok) {
					console.error("BAD RESPONSE", response)
					throw new Error("BAD RESPONSE")
				} else {
					return response.json().then((data) => {
						return data.data as Artist[]
					})
				}
			})
		}
	})

	return artists
}
