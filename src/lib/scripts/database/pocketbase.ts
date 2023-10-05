import PocketBase from 'pocketbase'
import { writable } from 'svelte/store'

const URL = "http://127.0.0.1:8090"

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

export function getThumbURL(
        collection: string,
        id: string,
        filename: string,
        token: string,
        thumbSize: number
): string {
        const baseURL = getFileURL(collection, id, filename, token)

        return `${baseURL}&thumb=${thumbSize}x${thumbSize}`
}

