import { writable, type Writable } from "svelte/store";

export let confVisible: Writable<boolean> = writable(false)
export let confTitle: Writable<string> = writable("")
export let confMessage: Writable<string> = writable("")
export let onConfirm: Writable<(approved: boolean) => void> = writable()

