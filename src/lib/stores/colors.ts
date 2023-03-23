import { writable, type Writable } from "svelte/store";
import ColorEngine from "../scripts/color_engine";

const defaultColor = "170.170.170&50.50.50"

export const deckColors: Writable<ColorEngine> = writable(new ColorEngine(defaultColor));
export const playerColors: Writable<ColorEngine> = writable(new ColorEngine(defaultColor));