import { c as create_ssr_component, a as subscribe, o as onDestroy, e as escape, f as set_store_value } from "./index2.js";
import { b as buildPalette } from "./palette.js";
import { a as deckPalette, d as defaultColor } from "./colors.js";
/* empty css                                    */const css = {
  code: ".svelte-1uh8xaw::-webkit-scrollbar{appearance:none;width:5px}.svelte-1uh8xaw::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.deck.svelte-1uh8xaw{position:relative;display:flex;overflow-y:scroll;background-image:linear-gradient(to right, var(--main-light), var(--main-dark));flex-direction:column;flex-grow:1;transition:width 0.15s ease;padding-bottom:120px}",
  map: null
};
const Deck = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  onDestroy(() => {
    set_store_value(deckPalette, $deckPalette = buildPalette(defaultColor), $deckPalette);
  });
  $$result.css.add(css);
  $$unsubscribe_deckPalette();
  return `<div class="deck svelte-1uh8xaw" style="${"--main-light: " + escape($deckPalette.main.light, true) + "; --main-dark: " + escape($deckPalette.main.dark, true)}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Deck as D
};
