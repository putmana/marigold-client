import { buildPalette } from "$lib/scripts/palette";
import { writable, type Writable } from "svelte/store";

export const defaultColor = "170.170.170&50.50.50"

export const deckPalette: Writable<Palette> = writable(buildPalette(defaultColor));
export const playerPalette: Writable<Palette> = writable(buildPalette(defaultColor))