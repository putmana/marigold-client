import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, e as escape, g as each, v as validate_component, a as subscribe, f as set_store_value, i as is_promise, n as noop } from "../../../chunks/index2.js";
import { a as formatArtists } from "../../../chunks/utils.js";
/* empty css                                                      */import { t as token, U as UNAUTHORIZED_TOKEN } from "../../../chunks/auth.js";
import { g as getAllAlbums } from "../../../chunks/api-albums.js";
const css$2 = {
  code: ".svelte-dl9cqa.svelte-dl9cqa::-webkit-scrollbar{appearance:none;width:5px}.svelte-dl9cqa.svelte-dl9cqa::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.item.svelte-dl9cqa.svelte-dl9cqa{display:flex;flex-grow:1;flex-direction:row;align-items:center;height:60px;margin-bottom:5px;margin-left:5px;margin-right:5px;border-radius:5px;border-width:1px;border-style:solid;border-color:transparent;transition:background-color 0.15s ease-in-out}.item.svelte-dl9cqa .text-sublabel.svelte-dl9cqa{font-size:smaller;opacity:70%}.item.svelte-dl9cqa .art.svelte-dl9cqa{margin-left:10px;margin-right:20px;min-height:45px}.item.svelte-dl9cqa .art .art-image.svelte-dl9cqa{margin:none;height:45px;width:45px;border-style:solid;border-color:rgba(255, 255, 255, 0.1);border-width:1px;vertical-align:middle}.item.svelte-dl9cqa.svelte-dl9cqa:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}",
  map: null
};
const Searcher_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let hasArt = false;
  let hasSublabel = false;
  createEventDispatcher();
  if (item.image !== void 0)
    hasArt = true;
  if (item.sublabel !== void 0)
    hasSublabel = true;
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$2);
  return `<div class="item svelte-dl9cqa">${hasArt ? `<div class="art svelte-dl9cqa"><img class="art-image svelte-dl9cqa"${add_attribute("src", item.image, 0)}></div>` : ``}
    <div class="text svelte-dl9cqa"><div class="text-label svelte-dl9cqa">${escape(item.label)}</div>
        ${hasSublabel ? `<div class="text-sublabel svelte-dl9cqa">${escape(item.sublabel)}</div>` : ``}</div>
</div>`;
});
const css$1 = {
  code: ".svelte-1g8zj0c::-webkit-scrollbar{appearance:none;width:5px}.svelte-1g8zj0c::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-1g8zj0c::-webkit-scrollbar{appearance:none;width:5px}.svelte-1g8zj0c::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}input[type=text].form-control.svelte-1g8zj0c{width:100%;color:white;padding:10px;box-sizing:border-box;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px;background-color:rgba(0, 0, 0, 0.2);transition:all 0.15s ease}input[type=text].form-control.svelte-1g8zj0c::placeholder{color:rgba(255, 255, 255, 0.2)}input[type=text].form-control.svelte-1g8zj0c:hover{background-color:rgba(0, 0, 0, 0.4);border:1px solid rgba(255, 255, 255, 0.2)}input[type=text].form-control.svelte-1g8zj0c:focus,input[type=text].form-control.svelte-1g8zj0c:focus-visible{appearance:none;outline:none;background-color:rgba(0, 0, 0, 0.4);border:1px solid var(--bright-light);outline:var(--bright-light) solid 2px}.wrapper.svelte-1g8zj0c{box-sizing:border-box;width:100%;background-color:rgba(255, 255, 255, 0.1);padding:10px;border:1px solid rgba(255, 255, 255, 0.1);border-radius:5px}.search.svelte-1g8zj0c{margin-bottom:10px}.result-box.svelte-1g8zj0c{padding:5px;max-height:100%;overflow-y:scroll}",
  map: null
};
const Searcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let newItem;
  let results;
  let { name } = $$props;
  let { items } = $$props;
  let { showImage = false } = $$props;
  let { showAdd = false } = $$props;
  createEventDispatcher();
  let query = "";
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.showImage === void 0 && $$bindings.showImage && showImage !== void 0)
    $$bindings.showImage(showImage);
  if ($$props.showAdd === void 0 && $$bindings.showAdd && showAdd !== void 0)
    $$bindings.showAdd(showAdd);
  $$result.css.add(css$1);
  newItem = {
    id: "new",
    label: "Create new " + name,
    image: "/public/img/mg/covers/default.png"
  };
  results = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return `<div class="wrapper svelte-1g8zj0c"><input class="form-control search svelte-1g8zj0c" type="text" placeholder="${"Search " + escape(name, true)}"${add_attribute("value", query, 0)}>

    <div class="result-box svelte-1g8zj0c">${each(results, (result) => {
    return `${validate_component(Searcher_item, "SearcherItem").$$render($$result, { item: result }, {}, {})}`;
  })}
        ${validate_component(Searcher_item, "SearcherItem").$$render($$result, { item: newItem }, {}, {})}</div>
    

</div>`;
});
const Album_chooser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { albums } = $$props;
  let itemizedAlbums = albums.map((album) => {
    return {
      id: album.id,
      label: album.title,
      sublabel: formatArtists(album.artists),
      image: album.cover.path
    };
  });
  if ($$props.albums === void 0 && $$bindings.albums && albums !== void 0)
    $$bindings.albums(albums);
  return `${validate_component(Searcher, "Searcher").$$render($$result, { name: "album", items: itemizedAlbums }, {}, {})}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-bqzb91::-webkit-scrollbar{appearance:none;width:5px}.svelte-bqzb91::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.step.svelte-bqzb91{display:flex;width:60px;border-left:1px solid rgba(255, 255, 255, 0.1);background-color:rgb(50, 50, 50);transition:width 0.15s ease;justify-content:center}.step.current.svelte-bqzb91{flex-grow:1;background-color:rgb(70, 70, 70)}.content-box.svelte-bqzb91{align-self:center;width:calc(100% - 60px)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let albums;
  let $token, $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => $token = value);
  $$result.css.add(css);
  albums = getAllAlbums($token).catch((error) => {
    if (error.message === "BAD TOKEN") {
      set_store_value(token, $token = UNAUTHORIZED_TOKEN, $token);
    }
    throw new Error(error);
  });
  $$unsubscribe_token();
  return `<section class="step current svelte-bqzb91"><div class="content-box svelte-bqzb91">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
            <p class="svelte-bqzb91">loading...</p>
        `;
    }
    return function(albums2) {
      return `
            ${validate_component(Album_chooser, "AlbumChooser").$$render($$result, { albums: albums2 }, {}, {})}
        `;
    }(__value);
  }(albums)}</div></section>
<section class="step svelte-bqzb91"></section>
<section class="step svelte-bqzb91"></section>`;
});
export {
  Page as default
};
