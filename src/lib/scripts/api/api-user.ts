import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config"
import { verifyToken } from "./api-verify-token"

const USER_URL = BASE_API_URL + API_VERSION + "/user"

export async function getUser(token: string): Promise<string> {
	let user: string = await verifyToken(token).then((valid) => {
		if (!valid) {
			throw new Error("BAD TOKEN")
		} else {
			return fetch(USER_URL, {
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
						return data.data as string
					})
				}
			})
		}
	})

	return user
}
