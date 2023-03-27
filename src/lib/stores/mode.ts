import { writable, type Writable } from "svelte/store";

export let mode: Writable<DeckContent> = writable({
    content_type: "PLAYLIST",
    content_id: "1"
})