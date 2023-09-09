import { c as create_ssr_component, b as createEventDispatcher, e as escape, d as add_attribute, a as subscribe } from "./index2.js";
import { p as pluralize, f as formatTime, a as formatArtists } from "./utils.js";
/* empty css                                          */import { a as deckPalette } from "./colors.js";
const css$1 = {
  code: '.svelte-1c5f6ev.svelte-1c5f6ev::-webkit-scrollbar{appearance:none;width:5px}.svelte-1c5f6ev.svelte-1c5f6ev::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-1c5f6ev.svelte-1c5f6ev::-webkit-scrollbar{appearance:none;width:5px}.svelte-1c5f6ev.svelte-1c5f6ev::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.btn.svelte-1c5f6ev.svelte-1c5f6ev{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;text-decoration:none;color:rgba(255, 255, 255, 0.8);border-radius:5px;padding:10px;border:0px solid transparent;text-transform:uppercase;font-weight:bold;transition:all 0.15s ease;margin-right:5px;outline:rgba(255, 255, 255, 0.2) solid 1px;box-sizing:border-box}.btn.btn-primary.svelte-1c5f6ev.svelte-1c5f6ev{background-color:rgba(255, 255, 255, 0.1)}.btn.btn-primary.svelte-1c5f6ev.svelte-1c5f6ev:hover{background-color:rgba(255, 255, 255, 0.2)}.btn.svelte-1c5f6ev.svelte-1c5f6ev:hover{outline:rgba(255, 255, 255, 0.3) solid 1px}.btn.svelte-1c5f6ev.svelte-1c5f6ev:focus,.btn.svelte-1c5f6ev .svelte-1c5f6ev:focus-visible{outline:rgba(255, 255, 255, 0.3) solid 3px}.track-header.svelte-1c5f6ev.svelte-1c5f6ev{display:flex;flex-direction:row;align-items:center;min-height:343px;padding-left:70px;padding-right:60px}.track-header.svelte-1c5f6ev .text.svelte-1c5f6ev{display:flex;flex-direction:column;flex-grow:1}.track-header.svelte-1c5f6ev .text .text-title.svelte-1c5f6ev{font-size:60px;font-weight:bold}.track-header.svelte-1c5f6ev .text .text-artist.svelte-1c5f6ev{font-size:12pt;font-size:bold}.track-header.svelte-1c5f6ev .text .text-info.svelte-1c5f6ev{margin-top:5px;opacity:70%}.track-header.svelte-1c5f6ev .text .buttons.svelte-1c5f6ev{margin-top:20px}.track-header.svelte-1c5f6ev .art.svelte-1c5f6ev{width:223px;height:223px;margin-left:60px}.track-header.svelte-1c5f6ev .art .art-image.svelte-1c5f6ev{width:inherit;height:inherit;border-style:solid;border-color:rgba(255, 255, 255, 0.1);border-width:1px}.separator.svelte-1c5f6ev.svelte-1c5f6ev{min-height:30px;align-self:center;border-bottom:1px solid rgba(255, 255, 255, 0.1);margin-bottom:10px;width:calc(100% - 20px);display:flex;align-items:center}.separator.svelte-1c5f6ev .number.svelte-1c5f6ev{opacity:70%;width:60px;text-align:center}.separator.svelte-1c5f6ev .title.svelte-1c5f6ev{opacity:70%}',
  map: null
};
const Track_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { title } = $$props;
  let { artists } = $$props;
  let { category } = $$props;
  let { count } = $$props;
  let { duration } = $$props;
  let { cover } = $$props;
  createEventDispatcher();
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.artists === void 0 && $$bindings.artists && artists !== void 0)
    $$bindings.artists(artists);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.cover === void 0 && $$bindings.cover && cover !== void 0)
    $$bindings.cover(cover);
  $$result.css.add(css$1);
  return `<div class="track-header svelte-1c5f6ev"><div class="text svelte-1c5f6ev"><div class="text-title svelte-1c5f6ev">${escape(title)}</div>
        
        <div class="text-info svelte-1c5f6ev"><span class="text-artist svelte-1c5f6ev">${escape(artists)}</span>
			<b class="svelte-1c5f6ev">•</b>
            <span class="text-subcategory svelte-1c5f6ev">${escape(category)}</span>
            <b class="svelte-1c5f6ev">•</b>
            <span class="text-count svelte-1c5f6ev">${escape(count)} ${escape(pluralize("track", count))}</span>
            <b class="svelte-1c5f6ev">•</b>
            <span class="text-duration svelte-1c5f6ev">${escape(formatTime(duration, true, false))}</span></div>
		<div class="buttons svelte-1c5f6ev"><button class="btn btn-primary svelte-1c5f6ev"><i class="bi bi-play-fill svelte-1c5f6ev"></i> PLAY</button>
			<a class="btn btn-primary svelte-1c5f6ev" href="${"./" + escape(id, true) + "/edit"}"><i class="bi bi-pencil-fill svelte-1c5f6ev"></i></a></div></div>
    <div class="art svelte-1c5f6ev"><img class="art-image svelte-1c5f6ev"${add_attribute("src", cover, 0)}></div></div>
<div class="separator svelte-1c5f6ev"><div class="number svelte-1c5f6ev">#
	</div>
	<div class="title svelte-1c5f6ev">TITLE
	</div>
</div>`;
});
const css = {
  code: ".svelte-19mj76s.svelte-19mj76s::-webkit-scrollbar{appearance:none;width:5px}.svelte-19mj76s.svelte-19mj76s::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.track.svelte-19mj76s.svelte-19mj76s{display:flex;flex-direction:row;min-height:80px;align-items:center;border:1px solid transparent;border-radius:5px;margin-left:10px;margin-right:10px;transition:background-color 0.15s ease}.track.svelte-19mj76s .number.svelte-19mj76s{display:flex;align-items:center;height:60px;width:60px}.track.svelte-19mj76s .number .number-text.svelte-19mj76s{width:inherit;text-align:center;font-size:larger}.track.svelte-19mj76s .text-artist.svelte-19mj76s{font-size:smaller;opacity:70%}.track.svelte-19mj76s .art.svelte-19mj76s{margin-right:20px;min-height:60px}.track.svelte-19mj76s .art .art-image.svelte-19mj76s{margin:none;height:60px;width:60px;border-style:solid;border-color:rgba(255, 255, 255, 0.1);border-width:1px;vertical-align:middle}.track.svelte-19mj76s.svelte-19mj76s:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}",
  map: null
};
const Track_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { track } = $$props;
  let { position } = $$props;
  let { showArt = true } = $$props;
  createEventDispatcher();
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.showArt === void 0 && $$bindings.showArt && showArt !== void 0)
    $$bindings.showArt(showArt);
  $$result.css.add(css);
  $$unsubscribe_deckPalette();
  return `

<div class="track svelte-19mj76s" style="${"--hover-light: " + escape($deckPalette.bright.light, true) + "; --hover-dark: " + escape($deckPalette.bright.dark, true)}"><div class="number svelte-19mj76s"><span class="number-text svelte-19mj76s">${escape(position)}</span></div>
    ${showArt ? `<div class="art svelte-19mj76s"><img class="art-image svelte-19mj76s"${add_attribute("src", track.cover.path, 0)}></div>` : ``}
    <div class="text svelte-19mj76s"><div class="text-title svelte-19mj76s">${escape(track.title)}</div>
        <div class="text-artist svelte-19mj76s">${escape(formatArtists(track.artists))}</div></div>
</div>`;
});
export {
  Track_header as T,
  Track_item as a
};
