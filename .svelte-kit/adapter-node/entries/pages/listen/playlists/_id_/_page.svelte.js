import { c as create_ssr_component, a as subscribe, f as set_store_value, v as validate_component, i as is_promise, n as noop, g as each } from "../../../../../chunks/index2.js";
import { D as Deck } from "../../../../../chunks/deck.js";
import { T as Track_header, a as Track_item } from "../../../../../chunks/track-item.js";
import { V as Void } from "../../../../../chunks/void.js";
import { t as token, U as UNAUTHORIZED_TOKEN } from "../../../../../chunks/auth.js";
import { a as getPlaylistTracks } from "../../../../../chunks/api-playlists.js";
import { b as buildPalette } from "../../../../../chunks/palette.js";
import { s as sumDuration } from "../../../../../chunks/utils.js";
import { a as deckPalette } from "../../../../../chunks/colors.js";
import { e as queueStage } from "../../../../../chunks/player.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let playlist;
  let $$unsubscribe_queueStage;
  let $token, $$unsubscribe_token;
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_queueStage = subscribe(queueStage, (value) => value);
  $$unsubscribe_token = subscribe(token, (value) => $token = value);
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  playlist = getPlaylistTracks($token, data.id).then((playlist2) => {
    set_store_value(deckPalette, $deckPalette = buildPalette(playlist2.info.cover.color), $deckPalette);
    return playlist2;
  }).catch((error) => {
    if (error.message === "BAD TOKEN") {
      set_store_value(token, $token = UNAUTHORIZED_TOKEN, $token);
    }
    throw new Error(error);
  });
  $$unsubscribe_queueStage();
  $$unsubscribe_token();
  $$unsubscribe_deckPalette();
  return `${validate_component(Deck, "Deck").$$render($$result, {}, {}, {
    default: () => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return `
        ${validate_component(Void, "Void").$$render($$result, { text: "loading..." }, {}, {})}
    `;
        }
        return function(playlist2) {
          return `
        ${validate_component(Track_header, "TrackHeader").$$render(
            $$result,
            {
              id: playlist2.info.id,
              title: playlist2.info.title,
              artists: playlist2.info.username,
              category: "Playlist",
              count: playlist2.tracks.length,
              duration: sumDuration(playlist2.tracks),
              cover: playlist2.info.cover.path
            },
            {},
            {}
          )}
        ${each(playlist2.tracks, (track, index) => {
            return `${validate_component(Track_item, "TrackItem").$$render($$result, { track, position: index + 1 }, {}, {})}`;
          })}
    `;
        }(__value);
      }(playlist)}`;
    }
  })}`;
});
export {
  Page as default
};
