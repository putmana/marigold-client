import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config"

const LOGIN_URL = BASE_API_URL + API_VERSION + "/login"
const LOGOUT_URL = BASE_API_URL + API_VERSION + "/logout"

export async function loginUser(email: string, password: string): Promise<string> {
	let token: string = await fetch(LOGIN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data"
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	}).then((response) => {
		if (!response.ok) {
			if (response.status === 401) {
				throw new Error("BAD CREDENTIALS")
			} else {
				console.error("BAD RESPONSE", response)
				throw new Error(response.statusText)
			}
		} else {
			return response.json().then((data) => {
				if (data.message === "SUCCESS") {
					return data.token
				} else if (data.message === "BAD CREDENTIALS") {
					throw new Error("BAD CREDENTIALS")
				} else {
					throw new Error(data.message)
				}
			})
		}
	})

	return token
}

export async function logoutUser(token: string) {
	await fetch(LOGOUT_URL, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token
		}
	})
}
