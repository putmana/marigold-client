import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

const URL = "http://127.0.0.1:8090"
const THUMB_SIZE_LARGE = 500
const THUMB_SIZE_SMALL = 100

export const pb = new PocketBase(URL)

export const user = writable(pb.authStore.model)

pb.authStore.onChange(() => {
	user.set(pb.authStore.model)
})

export function getFileURL(
	collection: string, 
	id: string, 
	filename: string,
	token: string,
): string {
	token = `?token=${token}`
	return `${URL}/api/files/${collection}/${id}/${filename}${token}`
}

export function getCoverURLs(
	id: string,
	filename: string,
	token: string
): Cover {
	const baseURL = getFileURL("covers", id, filename, token)

	return {
		full: baseURL,
		large: `${baseURL}&thumb=${THUMB_SIZE_LARGE}x${THUMB_SIZE_LARGE}`,
		small: `${baseURL}&thumb=${THUMB_SIZE_SMALL}x${THUMB_SIZE_SMALL}`,
	}
}

