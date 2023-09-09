import { b as buildPalette } from "./palette.js";
import { w as writable } from "./index.js";
const defaultColor = "170.170.170&50.50.50";
const deckPalette = writable(buildPalette(defaultColor));
const playerPalette = writable(buildPalette(defaultColor));
export {
  deckPalette as a,
  defaultColor as d,
  playerPalette as p
};
