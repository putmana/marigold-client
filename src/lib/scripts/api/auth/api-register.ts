import { API_VERSION, BASE_API_URL } from "$lib/config/mg.config"

const REGISTER_URL = BASE_API_URL + API_VERSION + "/register"

export type RegisterReciept = {
	success: boolean
	issues?: Issue[]
}

export async function register(
	username: string,
	email: string,
	password: string
): Promise<RegisterReciept> {
	return await fetch(REGISTER_URL, {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data"
		},
		body: JSON.stringify({
			name: username,
			email: email,
			password: password
		})
	}).then((response) => {
		if (!response.ok) {
			if (response.status === 422) {
				return response.json().then((data) => {
					let issues: Issue[] = []

					const faults = new Map<string, string[]>(Object.entries(data))

					faults.forEach((value, key) => {
						issues.push({
							category: key,
							message: value[0]
						})
					})

					return {
						success: false,
						issues: issues
					}
				})
			} else {
				console.log(response)
				throw new Error("SERVER ERROR: " + response.statusText)
			}
		} else {
			return {
				success: true
			}
		}
	})
}

// <---- AUDIT ---->
