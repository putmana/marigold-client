import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index2.js";
import { D as Deck } from "../../../../chunks/deck.js";
import { V as Void } from "../../../../chunks/void.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Deck, "Deck").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Void, "Void").$$render($$result, { text: "under construction" }, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
