import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, a as subscribe, e as escape, f as set_store_value, i as is_promise, n as noop, v as validate_component, g as each } from "../../../../../../chunks/index2.js";
import { D as Deck } from "../../../../../../chunks/deck.js";
import { a as formatArtists, s as sumDuration } from "../../../../../../chunks/utils.js";
/* empty css                                                                 */import { a as deckPalette } from "../../../../../../chunks/colors.js";
import { V as Void } from "../../../../../../chunks/void.js";
import { t as token, U as UNAUTHORIZED_TOKEN } from "../../../../../../chunks/auth.js";
import { a as getAlbumTracks } from "../../../../../../chunks/api-albums.js";
import { b as buildPalette } from "../../../../../../chunks/palette.js";
import { e as queueStage } from "../../../../../../chunks/player.js";
const trackHeaderEditor_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: '.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar{appearance:none;width:5px}.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar{appearance:none;width:5px}.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.form-control.svelte-1inxk5o label.text.svelte-1inxk5o{font-size:10pt;text-transform:uppercase;margin-bottom:5px;padding-left:5px;opacity:70%;display:block}.form-control.svelte-1inxk5o label.image.svelte-1inxk5o{outline:1px solid rgba(255, 255, 255, 0.2);border-radius:5px}.form-control.svelte-1inxk5o label.image img.svelte-1inxk5o{border-radius:5px;position:absolute;width:inherit}.form-control.svelte-1inxk5o label.image .overlay.svelte-1inxk5o{font-weight:bold;text-transform:uppercase;display:flex;border-radius:5px;justify-content:center;align-items:center;background-color:rgba(0, 0, 0, 0.3);width:100%;height:100%;position:relative;opacity:0;backdrop-filter:blur(10px) saturate(50%);transition:all 0.15s ease}.form-control.svelte-1inxk5o label.image.svelte-1inxk5o:hover{outline:1px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-1inxk5o label.image:hover .overlay.svelte-1inxk5o{opacity:100%}.form-control.svelte-1inxk5o input[type=text].svelte-1inxk5o{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;width:100%;color:rgb(255, 255, 255);padding:10px;border:0px solid transparent;border-radius:5px;background-color:rgba(0, 0, 0, 0.2);outline:rgba(255, 255, 255, 0.2) solid 1px;transition:all 0.15s ease;box-sizing:border-box}.form-control.svelte-1inxk5o input[type=text].svelte-1inxk5o::placeholder{color:rgba(255, 255, 255, 0.2)}.form-control.svelte-1inxk5o input[type=text].svelte-1inxk5o:hover{background-color:rgba(0, 0, 0, 0.3);outline:1px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-1inxk5o input[type=text].svelte-1inxk5o:focus,.form-control.svelte-1inxk5o input[type=text].svelte-1inxk5o:focus-visible{background-color:rgba(0, 0, 0, 0.3);outline:3px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-1inxk5o input[type=file].svelte-1inxk5o{display:none}.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar{appearance:none;width:5px}.svelte-1inxk5o.svelte-1inxk5o::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.btn.svelte-1inxk5o.svelte-1inxk5o{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;text-decoration:none;color:rgba(255, 255, 255, 0.8);border-radius:5px;padding:10px;border:0px solid transparent;text-transform:uppercase;font-weight:bold;transition:all 0.15s ease;margin-right:5px;outline:rgba(255, 255, 255, 0.2) solid 1px;box-sizing:border-box}.btn.btn-primary.svelte-1inxk5o.svelte-1inxk5o{background-color:rgba(255, 255, 255, 0.1)}.btn.btn-primary.svelte-1inxk5o.svelte-1inxk5o:hover{background-color:rgba(255, 255, 255, 0.2)}.btn.btn-secondary.svelte-1inxk5o.svelte-1inxk5o{background-color:rgba(0, 0, 0, 0)}.btn.btn-secondary.svelte-1inxk5o.svelte-1inxk5o:hover{background-color:rgba(255, 255, 255, 0.1)}.btn.svelte-1inxk5o.svelte-1inxk5o:hover{outline:rgba(255, 255, 255, 0.3) solid 1px}.btn.svelte-1inxk5o.svelte-1inxk5o:focus{outline:rgba(255, 255, 255, 0.3) solid 3px}.track-header.svelte-1inxk5o.svelte-1inxk5o{display:flex;flex-direction:row;align-items:center;min-height:343px;padding-left:70px;padding-right:60px}.track-header.svelte-1inxk5o .text.svelte-1inxk5o{display:flex;flex-direction:column;flex-grow:1}.track-header.svelte-1inxk5o .text-input.svelte-1inxk5o{margin-bottom:10px}.track-header.svelte-1inxk5o .button-input.svelte-1inxk5o{margin-top:10px}.track-header.svelte-1inxk5o .art.svelte-1inxk5o{width:223px;height:223px;margin-left:60px}.separator.svelte-1inxk5o.svelte-1inxk5o{min-height:30px;align-self:center;border-bottom:1px solid rgba(255, 255, 255, 0.1);margin-bottom:10px;width:calc(100% - 20px);display:flex;align-items:center}.separator.svelte-1inxk5o .number.svelte-1inxk5o{opacity:70%;width:60px;text-align:center}.separator.svelte-1inxk5o .title.svelte-1inxk5o{opacity:70%}',
  map: null
};
const Track_header_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  $$result.css.add(css$3);
  return `<form class="track-header form-control svelte-1inxk5o"><div class="text svelte-1inxk5o"><div class="text-input svelte-1inxk5o"><label class="text svelte-1inxk5o" for="title">title</label>
                <input id="title" type="text" class="text-title svelte-1inxk5o" placeholder="title"${add_attribute("value", title, 0)}></div>
            <div class="text-input svelte-1inxk5o"><label class="text svelte-1inxk5o" for="artist">artists</label>
                <input id="artist" type="text" class="text-artist svelte-1inxk5o" placeholder="artists"${add_attribute("value", artists, 0)}></div>
            
            <div class="button-input svelte-1inxk5o"><button class="btn btn-primary svelte-1inxk5o">Save</button>
                <a class="btn btn-secondary svelte-1inxk5o" href="./">Cancel</a></div></div>

        <label class="art image svelte-1inxk5o" for="art"><img${add_attribute("src", cover, 0)} class="svelte-1inxk5o">
            <div class="overlay svelte-1inxk5o">replace
            </div></label>
        <input type="file" id="art" class="svelte-1inxk5o"></form>  
<div class="separator svelte-1inxk5o"><div class="number svelte-1inxk5o">#
	</div>
	<div class="title svelte-1inxk5o">TITLE
	</div>
</div>`;
});
const trackItemEditor_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.svelte-kcg0oo.svelte-kcg0oo::-webkit-scrollbar{appearance:none;width:5px}.svelte-kcg0oo.svelte-kcg0oo::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-kcg0oo.svelte-kcg0oo::-webkit-scrollbar{appearance:none;width:5px}.svelte-kcg0oo.svelte-kcg0oo::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.form-control.svelte-kcg0oo label.text.svelte-kcg0oo{font-size:10pt;text-transform:uppercase;margin-bottom:5px;padding-left:5px;opacity:70%;display:block}.form-control.svelte-kcg0oo input[type=text].svelte-kcg0oo{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;width:100%;color:rgb(255, 255, 255);padding:10px;border:0px solid transparent;border-radius:5px;background-color:rgba(0, 0, 0, 0.2);outline:rgba(255, 255, 255, 0.2) solid 1px;transition:all 0.15s ease;box-sizing:border-box}.form-control.svelte-kcg0oo input[type=text].svelte-kcg0oo::placeholder{color:rgba(255, 255, 255, 0.2)}.form-control.svelte-kcg0oo input[type=text].svelte-kcg0oo:hover{background-color:rgba(0, 0, 0, 0.3);outline:1px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-kcg0oo input[type=text].svelte-kcg0oo:focus,.form-control.svelte-kcg0oo input[type=text].svelte-kcg0oo:focus-visible{background-color:rgba(0, 0, 0, 0.3);outline:3px solid rgba(255, 255, 255, 0.3)}.track.svelte-kcg0oo.svelte-kcg0oo{display:flex;flex-direction:row;min-height:80px;align-items:center;border:1px solid transparent;border-radius:5px;margin-left:10px;margin-right:10px;transition:background-color 0.15s ease}.track.svelte-kcg0oo .number.svelte-kcg0oo{display:flex;align-items:center;height:60px;width:60px}.track.svelte-kcg0oo .number .number-text.svelte-kcg0oo{width:inherit;text-align:center;font-size:larger}.track.svelte-kcg0oo form.svelte-kcg0oo{display:flex;flex-direction:row}.track.svelte-kcg0oo .text-input.svelte-kcg0oo{display:flex;flex-direction:column;margin-right:10px;justify-content:center}.track.svelte-kcg0oo .art.svelte-kcg0oo{margin-right:20px;min-height:60px}.track.svelte-kcg0oo .art .art-image.svelte-kcg0oo{margin:none;height:60px;width:60px;border-style:solid;border-color:rgba(255, 255, 255, 0.1);border-width:1px;vertical-align:middle}.track.svelte-kcg0oo.svelte-kcg0oo:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}',
  map: null
};
const Track_item_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { track } = $$props;
  let { position } = $$props;
  let { showArt = true } = $$props;
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.showArt === void 0 && $$bindings.showArt && showArt !== void 0)
    $$bindings.showArt(showArt);
  $$result.css.add(css$2);
  $$unsubscribe_deckPalette();
  return `<div class="track svelte-kcg0oo" style="${"--hover-light: " + escape($deckPalette.bright.light, true) + "; --hover-dark: " + escape($deckPalette.bright.dark, true)}"><div class="number svelte-kcg0oo"><span class="number-text svelte-kcg0oo"><i class="bi bi-grip-horizontal svelte-kcg0oo"></i></span></div>
    ${showArt ? `<div class="art svelte-kcg0oo"><img class="art-image svelte-kcg0oo"${add_attribute("src", track.cover.path, 0)}></div>` : ``}
    <form class="form-control svelte-kcg0oo"><div class="text-input svelte-kcg0oo"><label class="text svelte-kcg0oo" for="track-title">title</label>
            <input id="track-title" type="text" class="text-title svelte-kcg0oo"${add_attribute("value", track.title, 0)}></div>
        <div class="text-input svelte-kcg0oo"><label class="text svelte-kcg0oo" for="track-artist">artist</label>
            <input id="track-artists" type="text" class="text-artist svelte-kcg0oo"${add_attribute("value", formatArtists(track.artists), 0)}></div></form>
</div>`;
});
const trackItemNew_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar{appearance:none;width:5px}.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar{appearance:none;width:5px}.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.form-control.svelte-1gi0chg label.text.svelte-1gi0chg{font-size:10pt;text-transform:uppercase;margin-bottom:5px;padding-left:5px;opacity:70%;display:block}.form-control.svelte-1gi0chg input[type=text].svelte-1gi0chg{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;width:100%;color:rgb(255, 255, 255);padding:10px;border:0px solid transparent;border-radius:5px;background-color:rgba(0, 0, 0, 0.2);outline:rgba(255, 255, 255, 0.2) solid 1px;transition:all 0.15s ease;box-sizing:border-box}.form-control.svelte-1gi0chg input[type=text].svelte-1gi0chg::placeholder{color:rgba(255, 255, 255, 0.2)}.form-control.svelte-1gi0chg input[type=text].svelte-1gi0chg:hover{background-color:rgba(0, 0, 0, 0.3);outline:1px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-1gi0chg input[type=text].svelte-1gi0chg:focus,.form-control.svelte-1gi0chg input[type=text].svelte-1gi0chg:focus-visible{background-color:rgba(0, 0, 0, 0.3);outline:3px solid rgba(255, 255, 255, 0.3)}.form-control.svelte-1gi0chg input[type=file].svelte-1gi0chg{display:none}.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar{appearance:none;width:5px}.svelte-1gi0chg.svelte-1gi0chg::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.btn.svelte-1gi0chg.svelte-1gi0chg{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;text-decoration:none;color:rgba(255, 255, 255, 0.8);border-radius:5px;padding:10px;border:0px solid transparent;text-transform:uppercase;font-weight:bold;transition:all 0.15s ease;margin-right:5px;outline:rgba(255, 255, 255, 0.2) solid 1px;box-sizing:border-box}.btn.btn-primary.svelte-1gi0chg.svelte-1gi0chg{background-color:rgba(255, 255, 255, 0.1)}.btn.btn-primary.svelte-1gi0chg.svelte-1gi0chg:hover{background-color:rgba(255, 255, 255, 0.2)}.btn.svelte-1gi0chg.svelte-1gi0chg:hover{outline:rgba(255, 255, 255, 0.3) solid 1px}.btn.svelte-1gi0chg.svelte-1gi0chg:focus{outline:rgba(255, 255, 255, 0.3) solid 3px}.track.svelte-1gi0chg.svelte-1gi0chg{display:flex;flex-direction:row;min-height:80px;align-items:center;border:1px solid transparent;border-radius:5px;margin-left:10px;margin-right:10px;transition:background-color 0.15s ease}.track.svelte-1gi0chg .number.svelte-1gi0chg{display:flex;align-items:center;height:60px;width:60px}.track.svelte-1gi0chg .number .number-text.svelte-1gi0chg{width:inherit;text-align:center;font-size:larger}.track.svelte-1gi0chg form.svelte-1gi0chg{display:flex;flex-direction:row}.track.svelte-1gi0chg .text-input.svelte-1gi0chg{display:flex;flex-direction:column;margin-right:10px;justify-content:center}.track.svelte-1gi0chg .file-input.svelte-1gi0chg{display:flex;flex-direction:column;margin-right:10px;justify-content:center}.track.svelte-1gi0chg .file-name.svelte-1gi0chg{display:flex;flex-direction:row;align-items:center}.track.svelte-1gi0chg .file-name span.svelte-1gi0chg{opacity:70%;margin-left:5px;font-size:smaller}.track.svelte-1gi0chg.svelte-1gi0chg:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}',
  map: null
};
const Track_item_new = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filesArray;
  let fileName;
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { track } = $$props;
  let { position } = $$props;
  let files;
  createEventDispatcher();
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  $$result.css.add(css$1);
  filesArray = [];
  fileName = filesArray.length > 0 ? filesArray[0].name : "";
  track.path = fileName;
  {
    console.log(files);
  }
  $$unsubscribe_deckPalette();
  return `<div class="track svelte-1gi0chg" style="${"--hover-light: " + escape($deckPalette.bright.light, true) + "; --hover-dark: " + escape($deckPalette.bright.dark, true)}"><div class="number svelte-1gi0chg"><span class="number-text svelte-1gi0chg"><i class="bi bi-grip-horizontal svelte-1gi0chg"></i></span></div>
    <form class="form-control svelte-1gi0chg"><div class="text-input svelte-1gi0chg"><label class="text svelte-1gi0chg" for="${escape(track.temp_id, true) + "-track-title"}">title</label>
            <input id="${escape(track.temp_id, true) + "-track-title"}" type="text" class="text-title svelte-1gi0chg"${add_attribute("value", track.title, 0)}></div>
        <div class="text-input svelte-1gi0chg"><label class="text svelte-1gi0chg" for="${escape(track.temp_id, true) + "-track-artist"}">artist</label>
            <input id="${escape(track.temp_id, true) + "-track-artists"}" type="text" class="text-artist svelte-1gi0chg"${add_attribute("value", track.artists, 0)}></div>
        <div class="file-input svelte-1gi0chg"><label class="text svelte-1gi0chg">audio file</label>
            <div class="file-name svelte-1gi0chg"><label class="btn btn-primary svelte-1gi0chg" for="${escape(track.temp_id, true) + "-track-file"}">Select File</label>
                <input id="${escape(track.temp_id, true) + "-track-file"}" type="file" class="svelte-1gi0chg">
                <span class="svelte-1gi0chg">${escape(fileName)}</span></div></div></form>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.svelte-n1h89f::-webkit-scrollbar{appearance:none;width:5px}.svelte-n1h89f::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.svelte-n1h89f::-webkit-scrollbar{appearance:none;width:5px}.svelte-n1h89f::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.btn.svelte-n1h89f{font-family:"jaf-bernina-sans-narrow", sans-serif;font-size:10pt;text-decoration:none;color:rgba(255, 255, 255, 0.8);border-radius:5px;padding:10px;border:0px solid transparent;text-transform:uppercase;font-weight:bold;transition:all 0.15s ease;margin-right:5px;outline:rgba(255, 255, 255, 0.2) solid 1px;box-sizing:border-box}.btn.btn-secondary.svelte-n1h89f{background-color:rgba(0, 0, 0, 0)}.btn.btn-secondary.svelte-n1h89f:hover{background-color:rgba(255, 255, 255, 0.1)}.btn.svelte-n1h89f:hover{outline:rgba(255, 255, 255, 0.3) solid 1px}.btn.svelte-n1h89f:focus{outline:rgba(255, 255, 255, 0.3) solid 3px}.add-track.svelte-n1h89f{min-height:75px;margin-left:10px;margin-right:10px;margin-top:10px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let album;
  let $token, $$unsubscribe_token;
  let $$unsubscribe_queueStage;
  let $deckPalette, $$unsubscribe_deckPalette;
  $$unsubscribe_token = subscribe(token, (value) => $token = value);
  $$unsubscribe_queueStage = subscribe(queueStage, (value) => value);
  $$unsubscribe_deckPalette = subscribe(deckPalette, (value) => $deckPalette = value);
  let { data } = $$props;
  let newTracks = [];
  let albumInfo;
  let albumTracks;
  function setAlbum(album2) {
    albumInfo = album2.info;
    albumTracks = album2.tracks;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    album = getAlbumTracks($token, data.id).then((album2) => {
      set_store_value(deckPalette, $deckPalette = buildPalette(album2.info.cover.color), $deckPalette);
      setAlbum(album2);
      return album2;
    }).catch((error) => {
      if (error.message === "BAD TOKEN") {
        set_store_value(token, $token = UNAUTHORIZED_TOKEN, $token);
      }
      throw new Error(error);
    });
    $$rendered = `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
    ${validate_component(Void, "Void").$$render($$result, { text: "loading..." }, {}, {})}
`;
      }
      return function(album2) {
        return `
    ${validate_component(Deck, "Deck").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Track_header_editor, "TrackHeaderEditor").$$render(
              $$result,
              {
                id: albumInfo.id,
                artists: formatArtists(albumInfo.artists),
                count: albumTracks.length,
                duration: sumDuration(albumTracks),
                cover: albumInfo.cover.path,
                title: albumInfo.title,
                category: albumInfo.category
              },
              {
                title: ($$value) => {
                  albumInfo.title = $$value;
                  $$settled = false;
                },
                category: ($$value) => {
                  albumInfo.category = $$value;
                  $$settled = false;
                }
              },
              {}
            )}
        ${each(albumTracks, (track, index) => {
              return `${validate_component(Track_item_editor, "TrackItemEditor").$$render(
                $$result,
                {
                  track,
                  position: index + 1,
                  showArt: false
                },
                {},
                {}
              )}`;
            })}
        ${each(newTracks, (newTrack, index) => {
              return `${validate_component(Track_item_new, "TrackItemNew").$$render(
                $$result,
                {
                  track: newTrack,
                  position: albumTracks.length + index
                },
                {},
                {}
              )}`;
            })}
        <button class="add-track btn btn-secondary svelte-n1h89f">+ new track</button>`;
          }
        })}
`;
      }();
    }(album)}`;
  } while (!$$settled);
  $$unsubscribe_token();
  $$unsubscribe_queueStage();
  $$unsubscribe_deckPalette();
  return $$rendered;
});
export {
  Page as default
};
