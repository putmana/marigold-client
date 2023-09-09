import { c as create_ssr_component, e as escape } from "./index2.js";
const infoBanner_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-18wwho::-webkit-scrollbar{appearance:none;width:5px}.svelte-18wwho::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.wrapper.svelte-18wwho{border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;width:100%;min-height:35.5px;display:flex;align-items:center;margin-top:5px;padding:10px}.wrapper.info.svelte-18wwho{background-color:hsla(220, 50%, 35%, 0.8)}.wrapper.warning.svelte-18wwho{background-color:hsla(40, 50%, 35%, 0.8)}.wrapper.error.svelte-18wwho{background-color:hsla(0, 50%, 35%, 0.8)}.icon.svelte-18wwho{margin-right:10px}",
  map: null
};
const Info_banner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message } = $$props;
  let { style = "info" } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css);
  return `<div class="${"wrapper " + escape(style, true) + " svelte-18wwho"}"><div class="icon svelte-18wwho">${style === "info" ? `<i class="bi bi-info-circle svelte-18wwho"></i>` : `${style === "warning" ? `<i class="bi bi-exclamation-triangle svelte-18wwho"></i>` : `${style === "error" ? `<i class="bi bi-x-octagon svelte-18wwho"></i>` : ``}`}`}</div>
    <div class="text svelte-18wwho"></div>
    ${escape(message)}
</div>`;
});
export {
  Info_banner as I
};
