import { c as create_ssr_component, a as subscribe, e as escape } from "../../../chunks/index2.js";
import { c as crossfade, q as quintOut } from "../../../chunks/index3.js";
import { r as randomPalette } from "../../../chunks/palette.js";
import { t as token } from "../../../chunks/auth.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-qrrgqe::-webkit-scrollbar{appearance:none;width:5px}.svelte-qrrgqe::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.wrapper.svelte-qrrgqe{height:100%;width:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background-image:linear-gradient(to right, var(--dim-light), var(--dim-dark))}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => value);
  crossfade({
    duration: (d) => Math.sqrt(d * 600),
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}
                `
      };
    }
  });
  let colors = randomPalette();
  $$result.css.add(css);
  $$unsubscribe_token();
  return `<div class="wrapper svelte-qrrgqe" style="${"--dim-light: " + escape(colors.dim.light, true) + "; --dim-dark: " + escape(colors.dim.dark, true) + "; --main-light: " + escape(colors.main.light, true) + "; --bright-light: " + escape(colors.bright.light, true) + ";"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
