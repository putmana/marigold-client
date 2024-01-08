import { writable, type Writable } from "svelte/store";

export const editing: Writable<boolean> = writable(false)
