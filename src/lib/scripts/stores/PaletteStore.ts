import { writable, type Writable } from 'svelte/store'
import { Palette } from "$lib/scripts/color-engine/palette"

export const bgPalette: Writable<Palette> = writable(Palette.gray)
