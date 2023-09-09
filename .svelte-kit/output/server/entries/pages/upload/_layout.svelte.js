import { c as create_ssr_component, a as subscribe, e as escape } from "../../../chunks/index2.js";
/* empty css                                                      */import { r as randomPalette } from "../../../chunks/palette.js";
import { t as token } from "../../../chunks/auth.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-o5h8zg::-webkit-scrollbar{appearance:none;width:5px}.svelte-o5h8zg::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.wrapper.svelte-o5h8zg{height:100%;width:100%;display:flex;background-image:linear-gradient(to right, var(--dim-light), var(--dim-dark))}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => value);
  let colors = randomPalette();
  $$result.css.add(css);
  $$unsubscribe_token();
  return `<div class="wrapper svelte-o5h8zg" style="${"--dim-light: " + escape(colors.dim.light, true) + "; --dim-dark: " + escape(colors.dim.dark, true)}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
