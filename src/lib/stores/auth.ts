import { browser } from "$app/environment"
import { UNAUTHORIZED_TOKEN } from "$lib/config/mg.config"
import { derived, writable, type Readable, type Writable } from "svelte/store"

const initialToken = browser
	? window.localStorage.getItem("api-token") ?? UNAUTHORIZED_TOKEN
	: UNAUTHORIZED_TOKEN

export const token: Writable<string> = writable(initialToken)

export const auth: Readable<boolean> = derived(token, ($token) =>
	$token === UNAUTHORIZED_TOKEN ? false : true
)
