import { c as create_ssr_component, e as escape } from "./index2.js";
const void_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-bhe730.svelte-bhe730::-webkit-scrollbar{appearance:none;width:5px}.svelte-bhe730.svelte-bhe730::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.void.svelte-bhe730.svelte-bhe730{position:relative;display:flex;background-image:linear-gradient(to right, rgb(20, 20, 20), rgb(50, 50, 50));flex-direction:column;flex-grow:1;max-height:calc(100vh - 60px);border-left-style:solid;border-left-width:1px;border-left-color:rgb(85, 85, 85);justify-content:center;align-items:center}.void.svelte-bhe730 .icon.svelte-bhe730{font-size:60px;opacity:20%}.void.svelte-bhe730 .text.svelte-bhe730{opacity:20%;font-weight:bold}",
  map: null
};
const Void = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  let { type = "PRIMARY" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  return `<div class="${"void " + escape(type, true) + " svelte-bhe730"}"><div class="icon svelte-bhe730"><i class="bi bi-flower1 svelte-bhe730"></i></div>
    <span class="text svelte-bhe730">${escape(text)}</span>
</div>`;
});
export {
  Void as V
};
