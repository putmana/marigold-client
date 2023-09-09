import { c as create_ssr_component, a as subscribe } from "../../chunks/index2.js";
import { t as token } from "../../chunks/auth.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: '.svelte-odnjy5::-webkit-scrollbar{appearance:none;width:5px}.svelte-odnjy5::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}body{background-color:rgb(85, 85, 85);color:white;font-family:"jaf-bernina-sans-narrow", sans-serif;font-weight:400;font-style:normal;font-size:12pt}.app-wrapper.svelte-odnjy5{position:fixed;display:flex;flex-direction:column;bottom:0;left:0;width:100%;height:100vh}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_token();
  return `<div class="app-wrapper svelte-odnjy5">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
