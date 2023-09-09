import { c as create_ssr_component, a as subscribe, f as set_store_value, v as validate_component, i as is_promise, n as noop, g as each } from "../../../../chunks/index2.js";
import { P as Panel, L as List_header, a as List_item } from "../../../../chunks/list-item.js";
import { t as token, U as UNAUTHORIZED_TOKEN } from "../../../../chunks/auth.js";
import { g as getAllPlaylists } from "../../../../chunks/api-playlists.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let playlists;
  let $token, $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => $token = value);
  playlists = getAllPlaylists($token).catch((error) => {
    if (error.message === "BAD TOKEN") {
      set_store_value(token, $token = UNAUTHORIZED_TOKEN, $token);
    }
    throw new Error(error);
  });
  $$unsubscribe_token();
  return `${validate_component(Panel, "Panel").$$render($$result, {}, {}, {
    default: () => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return `
    `;
        }
        return function(playlists2) {
          return `
        ${validate_component(List_header, "ListHeader").$$render($$result, { label: "Playlists" }, {}, {})}
        ${each(playlists2, (playlist) => {
            return `${validate_component(List_item, "ListItem").$$render(
              $$result,
              {
                route: "/listen/playlists/" + playlist.id,
                title: playlist.title,
                artists: playlist.username,
                cover: playlist.cover.path
              },
              {},
              {}
            )}`;
          })}
    `;
        }(__value);
      }(playlists)}`;
    }
  })}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
