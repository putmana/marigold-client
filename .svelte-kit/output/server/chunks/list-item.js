import { c as create_ssr_component, e as escape, a as subscribe, d as add_attribute } from "./index2.js";
import { p as page } from "./stores.js";
import { a as deckPalette } from "./colors.js";
const panel_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.svelte-ucp6ne::-webkit-scrollbar{appearance:none;width:5px}.svelte-ucp6ne::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.panel.svelte-ucp6ne{position:relative;display:flex;flex-direction:column;background-color:rgb(70, 70, 70);min-width:300px;transition:width 0.15s ease;border-top:1px solid rgba(255, 255, 255, 0.1)}.panel.svelte-ucp6ne::after{content:"";flex-grow:1;border:1px solid rgba(255, 255, 255, 0.1);border-top:none;border-bottom:none}',
  map: null
};
const Panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="panel svelte-ucp6ne">${slots.default ? slots.default({}) : ``}
</div>`;
});
const listHeader_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".svelte-1t6b6f9::-webkit-scrollbar{appearance:none;width:5px}.svelte-1t6b6f9::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.wrapper.svelte-1t6b6f9{height:60px;display:flex;align-items:center;border:1px solid rgba(255, 255, 255, 0.1);border-top:none;border-bottom:none}.label.svelte-1t6b6f9{font-weight:bold;text-transform:uppercase;margin-left:15px}",
  map: null
};
const List_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  $$result.css.add(css$1);
  return `<div class="wrapper svelte-1t6b6f9"><div class="label svelte-1t6b6f9">${escape(label)}</div>
</div>`;
});
const listItem_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-1dpvwjh.svelte-1dpvwjh::-webkit-scrollbar{appearance:none;width:5px}.svelte-1dpvwjh.svelte-1dpvwjh::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.list.svelte-1dpvwjh.svelte-1dpvwjh{display:flex;position:relative;flex-direction:row;min-height:80px;align-items:center;border:1px solid transparent;border-right-color:rgba(255, 255, 255, 0.1);border-left-color:rgba(255, 255, 255, 0.1);transition:border-radius 0.15s ease, margin 0.15s ease, background-color 0.15s ease}.list.svelte-1dpvwjh .art.svelte-1dpvwjh{margin-left:10px;height:60px;width:60px}.list.svelte-1dpvwjh .art .art-image.svelte-1dpvwjh{height:inherit;width:inherit;border-width:1px;border-style:solid;border-color:rgba(255, 255, 255, 0.1)}.list.svelte-1dpvwjh .text.svelte-1dpvwjh{display:flex;flex-direction:column;margin-left:20px}.list.svelte-1dpvwjh .text .text-artist.svelte-1dpvwjh{font-size:smaller;opacity:70%}.list.svelte-1dpvwjh.svelte-1dpvwjh:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1);z-index:2}.list.selected.svelte-1dpvwjh.svelte-1dpvwjh{background-color:var(--main-light);font-weight:bold;border-color:rgba(255, 255, 255, 0.1);border-right:none;z-index:2}a.svelte-1dpvwjh.svelte-1dpvwjh{color:white;text-decoration:none}",
  map: null
};
const List_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { route } = $$props;
  let { title } = $$props;
  let { artists } = $$props;
  let { cover } = $$props;
  if ($$props.route === void 0 && $$bindings.route && route !== void 0)
    $$bindings.route(route);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.artists === void 0 && $$bindings.artists && artists !== void 0)
    $$bindings.artists(artists);
  if ($$props.cover === void 0 && $$bindings.cover && cover !== void 0)
    $$bindings.cover(cover);
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_deckPalette();
  return `<a class="${["list svelte-1dpvwjh", $page.url.pathname.includes(route) ? "selected" : ""].join(" ").trim()}"${add_attribute("href", route, 0)} style="${"--main-light: " + escape($deckPalette.main.light, true) + "; --bright-light: " + escape($deckPalette.bright.light, true)}"><div class="art svelte-1dpvwjh"><img class="art-image svelte-1dpvwjh"${add_attribute("src", cover, 0)}></div>
    <div class="text svelte-1dpvwjh"><div class="text-title svelte-1dpvwjh">${escape(title)}</div>
        <div class="text-artist svelte-1dpvwjh">${escape(artists)}</div></div>
</a>`;
});
export {
  List_header as L,
  Panel as P,
  List_item as a
};
