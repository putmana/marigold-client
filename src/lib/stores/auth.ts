import { type Writable, writable } from "svelte/store";

export let auth: Writable<boolean> = writable(true);