import { API_VERSION, BASE_API_URL, UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"

const VERIFY_URL = BASE_API_URL + API_VERSION + "/verify"

export async function verifyToken(token: string): Promise<boolean> {
	if (token === UNAUTHORIZED_TOKEN) return false

	let valid: boolean = await fetch(VERIFY_URL, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token
		}
	})
		.then((response) => {
			if (!response.ok) {
				console.error("2:", response)
				return false
			} else {
				return response
					.json()
					.then((data) => {
						if (data.message === "VALID") {
							console.log("TOKEN VALID")
							return true
						} else {
							console.log("INVALID TOKEN")
							return false
						}
					})
					.catch((error) => {
						console.error("3:", error)
						return false
					})
			}
		})
		.catch((error) => {
			console.error("4:", error)
			return false
		})

	return valid
}
