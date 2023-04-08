import { writable, type Writable } from "svelte/store";
import ColorEngine from "../scripts/color_engine";
import { buildPalette } from "../scripts/palette";

export const defaultColor = "170.170.170&50.50.50"

export const deckColors: Writable<ColorEngine> = writable(new ColorEngine(defaultColor));
export const playerColors: Writable<ColorEngine> = writable(new ColorEngine(defaultColor));

export const deckPalette: Writable<Palette> = writable(buildPalette(defaultColor));
export const playerPalette: Writable<Palette> = writable(buildPalette(defaultColor))