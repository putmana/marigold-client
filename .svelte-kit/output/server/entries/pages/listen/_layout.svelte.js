import { c as create_ssr_component, a as subscribe, b as createEventDispatcher, d as add_attribute, e as escape, v as validate_component, f as set_store_value, o as onDestroy, g as each, i as is_promise, n as noop } from "../../../chunks/index2.js";
import { p as playerPalette, d as defaultColor } from "../../../chunks/colors.js";
import { b as buildPalette } from "../../../chunks/palette.js";
import { f as formatTime, a as formatArtists } from "../../../chunks/utils.js";
import { r as repeat, q as queueBoxVisible, s as shuffle, a as queueReady, t as tracksManual, c as currentTrack, b as tracksPlayed, d as tracksQueued, e as queueStage, f as defaultQueueTrack, g as tracksAll } from "../../../chunks/player.js";
import { c as crossfade, q as quintOut } from "../../../chunks/index3.js";
import { B as BASE_API_URL, A as API_VERSION, t as token } from "../../../chunks/auth.js";
import { v as verifyToken } from "../../../chunks/api-verify-token.js";
import { p as page } from "../../../chunks/stores.js";
const scrubBar_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".svelte-1yyt1qg.svelte-1yyt1qg::-webkit-scrollbar{appearance:none;width:5px}.svelte-1yyt1qg.svelte-1yyt1qg::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.scrub-wrapper.svelte-1yyt1qg.svelte-1yyt1qg{width:100%;position:relative;z-index:3}.scrub-wrapper.svelte-1yyt1qg .scrub-track.svelte-1yyt1qg{display:flex;align-items:center;background-color:rgba(20, 20, 20, 0.5);height:4px;transition:height 0.15s ease}.scrub-wrapper.svelte-1yyt1qg .scrub-progress.svelte-1yyt1qg{position:relative;display:flex;flex-direction:row-reverse;align-items:center;background-color:var(--highlight-light);min-width:10px;height:5px;transition:background-color 0.15s ease, height 0.15s ease}.scrub-wrapper.svelte-1yyt1qg .scrub-thumb.svelte-1yyt1qg{position:relative;z-index:20;left:2.5px;background-color:white;width:5px;height:5px;border-radius:5px;transition:height 0.15s ease, width 0.15s ease, left 0.15s ease}.scrub-wrapper.svelte-1yyt1qg:hover .scrub-progress.svelte-1yyt1qg{background-color:var(--highlight-light)}.scrub-wrapper.svelte-1yyt1qg:hover .scrub-thumb.svelte-1yyt1qg{position:relative;left:5px;width:10px;height:10px}.scrub-wrapper.expanded.svelte-1yyt1qg .scrub-progress.svelte-1yyt1qg{background-color:var(--highlight-light)}.scrub-wrapper.expanded.svelte-1yyt1qg .scrub-thumb.svelte-1yyt1qg{width:10px;height:10px}.scrub-wrapper.disabled.svelte-1yyt1qg.svelte-1yyt1qg{opacity:50%}",
  map: null
};
const Scrub_bar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $playerPalette, $$unsubscribe_playerPalette;
  $$unsubscribe_playerPalette = subscribe(playerPalette, (value) => $playerPalette = value);
  let { active = false } = $$props;
  let { currentTime = 0 } = $$props;
  let { duration = 0 } = $$props;
  let { disabled = false } = $$props;
  createEventDispatcher();
  let width = 0;
  let wrapper;
  let timeToPercent = (time, totalTime) => {
    return time / totalTime * 100;
  };
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0)
    $$bindings.currentTime(currentTime);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css$7);
  {
    if (!active)
      width = timeToPercent(currentTime, duration);
  }
  {
    if (disabled)
      width = 100;
  }
  $$unsubscribe_playerPalette();
  return `

<div class="${[
    "scrub-wrapper svelte-1yyt1qg",
    " " + (disabled ? "disabled" : "")
  ].join(" ").trim()}"${add_attribute("this", wrapper, 0)}><div class="scrub-track svelte-1yyt1qg">${!disabled ? `<div class="scrub-progress svelte-1yyt1qg" style="${"width: " + escape(width, true) + "%; --highlight-light: " + escape($playerPalette.bright.light, true)}"><div class="scrub-thumb svelte-1yyt1qg"></div></div>` : ``}</div>
</div>`;
});
const controller_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: '.svelte-1fm1j04.svelte-1fm1j04::-webkit-scrollbar{appearance:none;width:5px}.svelte-1fm1j04.svelte-1fm1j04::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.main.svelte-1fm1j04.svelte-1fm1j04{border-top:1px solid rgba(255, 255, 255, 0.1);display:flex;height:60px}.main.svelte-1fm1j04 .info.svelte-1fm1j04{display:flex;flex-direction:row;align-items:center;flex:2}.main.svelte-1fm1j04 .info .art.svelte-1fm1j04{display:flex;height:60px;width:60px}.main.svelte-1fm1j04 .info .art .art-image.svelte-1fm1j04{border-right:1px solid rgba(255, 255, 255, 0.1)}.main.svelte-1fm1j04 .info .text.svelte-1fm1j04{margin-left:15px;margin-right:15px}.main.svelte-1fm1j04 .info .text .text-title.svelte-1fm1j04{font-weight:bold}.main.svelte-1fm1j04 .info .text .text-artist.svelte-1fm1j04{opacity:70%;font-size:smaller}.main.svelte-1fm1j04 .controls.svelte-1fm1j04{display:flex;justify-content:center;align-items:center;flex:3}.main.svelte-1fm1j04 .controls .button-wrapper.svelte-1fm1j04{display:flex;align-items:center;justify-content:center}.main.svelte-1fm1j04 .controls .button-wrapper .btn.svelte-1fm1j04{margin-left:5px;display:flex;flex-direction:column-reverse;justify-content:center;align-items:center;color:white;background-color:transparent;width:45px;height:45px;border-width:1px;border-style:solid;border-color:transparent;border-radius:5px;transition:background-color 0.15s ease, opacity 0.15s ease}.main.svelte-1fm1j04 .controls .button-wrapper .btn.svelte-1fm1j04::before{content:"";background-color:border;height:0;width:0;border-radius:5px;transition:height 0.15s ease, width 0.15s ease}.main.svelte-1fm1j04 .controls .button-wrapper .btn.svelte-1fm1j04:hover:enabled{opacity:100%;background-color:rgba(255, 255, 255, 0.1);border-width:1px;border-style:solid;border-color:rgba(255, 255, 255, 0.1)}.main.svelte-1fm1j04 .controls .button-wrapper .btn.selected.svelte-1fm1j04:enabled{opacity:100%}.main.svelte-1fm1j04 .controls .button-wrapper .btn.selected.svelte-1fm1j04:enabled::before{content:"";background-color:var(--full-light);margin-top:5px;height:5px;width:12pt}.main.svelte-1fm1j04 .controls .button-wrapper .btn.selected.svelte-1fm1j04:enabled:hover:enabled{background-color:rgba(255, 255, 255, 0.1)}.main.svelte-1fm1j04 .controls .button-wrapper .btn.svelte-1fm1j04:disabled{opacity:50%}.main.svelte-1fm1j04 .controls .button-wrapper .btn.skip.svelte-1fm1j04{font-size:22.5px}.main.svelte-1fm1j04 .controls .button-wrapper .btn.playpause.svelte-1fm1j04{font-size:37.5px}.main.svelte-1fm1j04 .settings.svelte-1fm1j04{display:flex;flex-direction:row-reverse;align-items:center;flex:2;margin-right:15px}.main.svelte-1fm1j04 .settings .time.svelte-1fm1j04{font-size:smaller;margin-bottom:1px;margin-right:5px}.main.svelte-1fm1j04 .settings .time span.svelte-1fm1j04{margin-left:5px;margin-right:5px}.main.svelte-1fm1j04 .settings .btn.svelte-1fm1j04{margin-left:5px;display:flex;flex-direction:column-reverse;justify-content:center;align-items:center;color:white;background-color:transparent;width:45px;height:45px;border-width:1px;border-style:solid;border-color:transparent;border-radius:5px;transition:background-color 0.15s ease, opacity 0.15s ease}.main.svelte-1fm1j04 .settings .btn.svelte-1fm1j04::before{content:"";background-color:border;height:0;width:0;border-radius:5px;transition:height 0.15s ease, width 0.15s ease}.main.svelte-1fm1j04 .settings .btn.svelte-1fm1j04:hover:enabled{opacity:100%;background-color:rgba(255, 255, 255, 0.1);border-width:1px;border-style:solid;border-color:rgba(255, 255, 255, 0.1)}.main.svelte-1fm1j04 .settings .btn.selected.svelte-1fm1j04:enabled{opacity:100%}.main.svelte-1fm1j04 .settings .btn.selected.svelte-1fm1j04:enabled::before{content:"";background-color:var(--full-light);margin-top:5px;height:5px;width:12pt}.main.svelte-1fm1j04 .settings .btn.selected.svelte-1fm1j04:enabled:hover:enabled{background-color:rgba(255, 255, 255, 0.1)}.main.svelte-1fm1j04 .settings .btn.svelte-1fm1j04:disabled{opacity:50%}',
  map: null
};
const Controller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $repeat, $$unsubscribe_repeat;
  let $queueBoxVisible, $$unsubscribe_queueBoxVisible;
  let $shuffle, $$unsubscribe_shuffle;
  let $playerPalette, $$unsubscribe_playerPalette;
  let $queueReady, $$unsubscribe_queueReady;
  let $tracksManual, $$unsubscribe_tracksManual;
  let $currentTrack, $$unsubscribe_currentTrack;
  let $tracksPlayed, $$unsubscribe_tracksPlayed;
  let $tracksQueued, $$unsubscribe_tracksQueued;
  let $queueStage, $$unsubscribe_queueStage;
  $$unsubscribe_repeat = subscribe(repeat, (value) => $repeat = value);
  $$unsubscribe_queueBoxVisible = subscribe(queueBoxVisible, (value) => $queueBoxVisible = value);
  $$unsubscribe_shuffle = subscribe(shuffle, (value) => $shuffle = value);
  $$unsubscribe_playerPalette = subscribe(playerPalette, (value) => $playerPalette = value);
  $$unsubscribe_queueReady = subscribe(queueReady, (value) => $queueReady = value);
  $$unsubscribe_tracksManual = subscribe(tracksManual, (value) => $tracksManual = value);
  $$unsubscribe_currentTrack = subscribe(currentTrack, (value) => $currentTrack = value);
  $$unsubscribe_tracksPlayed = subscribe(tracksPlayed, (value) => $tracksPlayed = value);
  $$unsubscribe_tracksQueued = subscribe(tracksQueued, (value) => $tracksQueued = value);
  $$unsubscribe_queueStage = subscribe(queueStage, (value) => $queueStage = value);
  let ready = false;
  let player;
  let time = 0;
  let duration = 0;
  let paused = true;
  let title = "";
  let artists = "";
  let cover = "/public/img/mg/covers/default.png";
  let prevTracks = [];
  let playingTrack = defaultQueueTrack;
  let nextTracks = [];
  let manualTracks = [];
  function shuffleTracks() {
    let hat = [...prevTracks, ...nextTracks];
    let shuffled = [];
    for (let i = hat.length; i > 0; i--) {
      let r = Math.floor(Math.random() * i);
      shuffled.push(...hat.splice(r, 1));
    }
    nextTracks = shuffled;
    prevTracks = [];
  }
  function processStage() {
    ready = true;
    console.log($queueStage);
    if ($queueStage.flag === "START") {
      $queueStage.tracks;
      prevTracks = $queueStage.tracks.slice(0, $queueStage.position);
      nextTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length);
      playingTrack = $queueStage.tracks[$queueStage.position];
      if ($shuffle) {
        shuffleTracks();
      }
      paused = false;
      reload();
    } else if ($queueStage.flag === "ADD") {
      manualTracks.push(...$queueStage.tracks);
      store();
    } else if ($queueStage.flag === "REORDER") {
      prevTracks = $queueStage.tracks.slice(0, $queueStage.position).filter((track) => track.source === "AUTO");
      console.log(prevTracks);
      nextTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length).filter((track) => track.source === "AUTO");
      manualTracks = $queueStage.tracks.slice($queueStage.position + 1, $queueStage.tracks.length).filter((track) => track.source === "MANUAL");
      playingTrack = $queueStage.tracks[$queueStage.position];
      reload();
    } else if ($queueStage.flag === "REORDER_MANUAL") {
      manualTracks = $queueStage.tracks;
    } else if ($queueStage.flag === "DIE") {
      prevTracks = [];
      nextTracks = [];
      playingTrack = defaultQueueTrack;
      ready = false;
    }
    set_store_value(queueStage, $queueStage.seen = true, $queueStage);
    store();
  }
  function store() {
    set_store_value(tracksQueued, $tracksQueued = nextTracks, $tracksQueued);
    set_store_value(tracksPlayed, $tracksPlayed = prevTracks, $tracksPlayed);
    set_store_value(currentTrack, $currentTrack = playingTrack, $currentTrack);
    set_store_value(tracksManual, $tracksManual = manualTracks, $tracksManual);
    set_store_value(queueReady, $queueReady = ready, $queueReady);
  }
  function reload() {
    player.load();
    set_store_value(playerPalette, $playerPalette = buildPalette(playingTrack.track.cover.color), $playerPalette);
    store();
  }
  $$result.css.add(css$6);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (ready) {
        title = playingTrack.track.title;
        artists = formatArtists(playingTrack.track.artists);
        player.src = playingTrack.track.path;
        cover = playingTrack.track.cover.path;
      }
    }
    {
      paused ? player?.pause() : player.play();
    }
    {
      if (!$queueStage.seen) {
        processStage();
        store();
      }
    }
    $$rendered = `<div class="scrub svelte-1fm1j04">${validate_component(Scrub_bar, "ScrubBar").$$render(
      $$result,
      {
        disabled: !ready,
        currentTime: time,
        duration
      },
      {
        currentTime: ($$value) => {
          time = $$value;
          $$settled = false;
        },
        duration: ($$value) => {
          duration = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>
<div class="main svelte-1fm1j04"><div class="info svelte-1fm1j04"><div class="art svelte-1fm1j04"><img class="art-image svelte-1fm1j04"${add_attribute("src", cover, 0)}${add_attribute("alt", title + " art", 0)}></div>
        <div class="text svelte-1fm1j04"><div class="text-title svelte-1fm1j04">${escape(title)}</div>
            <div class="text-artist svelte-1fm1j04">${escape(artists)}</div></div></div>
    <div class="controls svelte-1fm1j04" style="${"--full-light: " + escape($playerPalette.bright.light, true)}"><div class="button-wrapper svelte-1fm1j04"><button class="${["btn selected svelte-1fm1j04", $shuffle ? "selected" : ""].join(" ").trim()}" ${!ready ? "disabled" : ""}><div class="btn-icon svelte-1fm1j04"><i class="bi bi-shuffle svelte-1fm1j04"></i></div></button>            
            <button class="btn skip svelte-1fm1j04" ${!ready ? "disabled" : ""}><i class="bi bi-skip-start-fill svelte-1fm1j04"></i></button>
            <button class="btn playpause svelte-1fm1j04" ${!ready ? "disabled" : ""}>${paused ? `<i class="bi bi-play-fill svelte-1fm1j04"></i>` : `<i class="bi bi-pause-fill svelte-1fm1j04"></i>`}</button>
            <button class="btn skip svelte-1fm1j04" ${!ready ? "disabled" : ""}><i class="bi bi-skip-end-fill svelte-1fm1j04"></i></button>
            <button class="${["btn selected svelte-1fm1j04", $repeat !== "OFF" ? "selected" : ""].join(" ").trim()}" ${!ready ? "disabled" : ""}>${$repeat === "ONE" ? `<div class="btn-icon svelte-1fm1j04"><i class="bi bi-repeat-1 svelte-1fm1j04"></i></div>` : `<div class="btn-icon svelte-1fm1j04"><i class="bi bi-repeat svelte-1fm1j04"></i></div>`}</button></div></div>
    <div class="settings svelte-1fm1j04" style="${"--full-light: " + escape($playerPalette.bright.light, true)}"><button class="${["btn selected svelte-1fm1j04", $queueBoxVisible ? "selected" : ""].join(" ").trim()}" ${!ready ? "disabled" : ""}><div class="btn-icon svelte-1fm1j04"><i class="bi bi-list-ol svelte-1fm1j04"></i></div></button>
        <div class="time svelte-1fm1j04"><span class="svelte-1fm1j04">${escape(formatTime(time))}</span>
            /
            <span class="svelte-1fm1j04">${escape(formatTime(duration))}</span></div></div></div>
    
    
<audio class="svelte-1fm1j04"${add_attribute("this", player, 0)}${add_attribute("currentTime", time, 0)}${add_attribute("paused", paused, 0)}></audio>`;
  } while (!$$settled);
  $$unsubscribe_repeat();
  $$unsubscribe_queueBoxVisible();
  $$unsubscribe_shuffle();
  $$unsubscribe_playerPalette();
  $$unsubscribe_queueReady();
  $$unsubscribe_tracksManual();
  $$unsubscribe_currentTrack();
  $$unsubscribe_tracksPlayed();
  $$unsubscribe_tracksQueued();
  $$unsubscribe_queueStage();
  return $$rendered;
});
const player_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".svelte-uimjye::-webkit-scrollbar{appearance:none;width:5px}.svelte-uimjye::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.player.svelte-uimjye{min-height:65px;z-index:2;background-image:linear-gradient(to left, var(--main-light), var(--main-dark))}",
  map: null
};
const Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $playerPalette, $$unsubscribe_playerPalette;
  $$unsubscribe_playerPalette = subscribe(playerPalette, (value) => $playerPalette = value);
  onDestroy(() => {
    set_store_value(playerPalette, $playerPalette = buildPalette(defaultColor), $playerPalette);
  });
  $$result.css.add(css$5);
  $$unsubscribe_playerPalette();
  return `<div class="player svelte-uimjye" style="${"--main-light: " + escape($playerPalette.main.light, true) + "; --main-dark: " + escape($playerPalette.main.dark, true)}">${validate_component(Controller, "Controller").$$render($$result, {}, {}, {})}
</div>`;
});
const queueItem_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: '.svelte-1r5egyl.svelte-1r5egyl::-webkit-scrollbar{appearance:none;width:5px}.svelte-1r5egyl.svelte-1r5egyl::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.track.svelte-1r5egyl.svelte-1r5egyl{display:flex;flex-grow:1;flex-direction:row;align-items:center;height:60px;margin-bottom:5px;margin-left:5px;margin-right:5px;border-radius:5px;border-width:1px;border-style:solid;border-color:transparent;transition:background-color 0.15s ease-in-out}.track.svelte-1r5egyl .text-artist.svelte-1r5egyl{font-size:smaller;opacity:70%}.track.svelte-1r5egyl .art.svelte-1r5egyl{margin-left:10px;margin-right:20px;min-height:45px}.track.svelte-1r5egyl .art .art-image.svelte-1r5egyl{margin:none;height:45px;width:45px;border-style:solid;border-color:rgba(255, 255, 255, 0.1);border-width:1px;vertical-align:middle}.track.svelte-1r5egyl .btn.svelte-1r5egyl{opacity:0%;font-family:inherit;float:inline-end;margin-left:auto;margin-right:5px;display:flex;justify-content:center;align-items:center;color:white;background-color:transparent;min-width:30px;min-height:30px;border-width:1px;border-style:solid;border-color:transparent;border-radius:5px;transition:background-color 0.15s ease, opacity 0.15s ease}.track.svelte-1r5egyl .btn.svelte-1r5egyl:hover:enabled{opacity:100%;background-color:rgba(255, 255, 255, 0.1);border-width:1px;border-style:solid;border-color:rgba(255, 255, 255, 0.1)}.track.svelte-1r5egyl .btn.svelte-1r5egyl:disabled{opacity:50%}.track.svelte-1r5egyl.svelte-1r5egyl::before{content:"";width:0;height:0;background-color:var(--full-light);border-radius:5px;margin-left:5px;transition:width 0.15s ease, height 0.15s ease}.track.svelte-1r5egyl.svelte-1r5egyl:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}.track.svelte-1r5egyl:hover .btn.svelte-1r5egyl{opacity:100%}.track.playing.svelte-1r5egyl.svelte-1r5egyl{font-weight:bold}.track.playing.svelte-1r5egyl.svelte-1r5egyl:hover{background-color:rgba(255, 255, 255, 0.1);border-color:rgba(255, 255, 255, 0.1)}.track.playing.svelte-1r5egyl.svelte-1r5egyl::before{content:"";width:5px;height:45px}',
  map: null
};
const Queue_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $playerPalette, $$unsubscribe_playerPalette;
  $$unsubscribe_playerPalette = subscribe(playerPalette, (value) => $playerPalette = value);
  let { track } = $$props;
  let { id } = $$props;
  let { position } = $$props;
  let { showArt = true } = $$props;
  let { mouseOverRemove = false } = $$props;
  createEventDispatcher();
  if ($$props.track === void 0 && $$bindings.track && track !== void 0)
    $$bindings.track(track);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.showArt === void 0 && $$bindings.showArt && showArt !== void 0)
    $$bindings.showArt(showArt);
  if ($$props.mouseOverRemove === void 0 && $$bindings.mouseOverRemove && mouseOverRemove !== void 0)
    $$bindings.mouseOverRemove(mouseOverRemove);
  $$result.css.add(css$4);
  $$unsubscribe_playerPalette();
  return `<div class="${["track svelte-1r5egyl", position === "PLAYING" ? "playing" : ""].join(" ").trim()}" style="${"--full-light: " + escape($playerPalette.bright.light, true) + ";"}">${showArt ? `<div class="art svelte-1r5egyl"><img class="art-image svelte-1r5egyl"${add_attribute("src", track.cover.path, 0)}></div>` : ``}
    <div class="text svelte-1r5egyl"><div class="text-title svelte-1r5egyl">${escape(track.title)}</div>
        <div class="text-artist svelte-1r5egyl">${escape(formatArtists(track.artists))}</div></div>
    ${position === "MANUAL" ? `<button class="btn svelte-1r5egyl"><i class="bi bi-trash3 svelte-1r5egyl"></i></button>` : ``}
</div>`;
});
const queueBox_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".svelte-1pei043.svelte-1pei043::-webkit-scrollbar{appearance:none;width:5px}.svelte-1pei043.svelte-1pei043::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.queue-box.svelte-1pei043.svelte-1pei043{position:relative;z-index:1;display:flex;flex-direction:column;min-width:0;width:0;background-image:linear-gradient(to left, var(--main-light), var(--main-dark));background-size:100vw;background-position:right;border-left:1px solid rgba(255, 255, 255, 0.1);border-bottom:1px solid rgba(255, 255, 255, 0.1);overflow-x:hidden;overflow-y:hidden;transition:width 0.15s ease, min-width 0.15s ease}.queue-box.svelte-1pei043 .body.svelte-1pei043{display:flex;flex-grow:1;flex-direction:column;width:295px;margin-top:5px;margin-bottom:5px;overflow-y:auto}.queue-box.svelte-1pei043 .body .list.svelte-1pei043{display:flex;flex-direction:column}.queue-box.svelte-1pei043 .body .label.svelte-1pei043{background-image:linear-gradient(to left, var(--main-light), var(--main-dark));background-size:100vw;background-position:right;z-index:1;position:sticky;top:0;display:flex;height:60px;align-items:center;font-weight:bold}.queue-box.svelte-1pei043 .body .label .text.svelte-1pei043{flex-grow:1;margin-left:20px}.queue-box.svelte-1pei043 .body .label .btn.svelte-1pei043{font-family:inherit;float:inline-end;margin-right:12px;display:flex;justify-content:center;align-items:center;color:white;background-color:transparent;min-width:30px;min-height:30px;border-width:1px;border-style:solid;border-color:transparent;border-radius:5px;transition:background-color 0.15s ease, opacity 0.15s ease}.queue-box.svelte-1pei043 .body .label .btn .tip.svelte-1pei043{font-weight:bold;font-size:smaller;margin-right:5px;opacity:0;transition:opacity 0.15s ease}.queue-box.svelte-1pei043 .body .label .btn.svelte-1pei043:hover:enabled{opacity:100%;background-color:rgba(255, 255, 255, 0.1);border-width:1px;border-style:solid;border-color:rgba(255, 255, 255, 0.1)}.queue-box.svelte-1pei043 .body .label .btn:hover:enabled .tip.svelte-1pei043{opacity:100%}.queue-box.svelte-1pei043 .body .label .btn.svelte-1pei043:disabled{opacity:50%}.queue-box.expanded.svelte-1pei043.svelte-1pei043{min-width:300px}",
  map: null
};
const Queue_box = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let manual;
  let next;
  let hasManual;
  let hasNext;
  let $tracksQueued, $$unsubscribe_tracksQueued;
  let $tracksPlayed, $$unsubscribe_tracksPlayed;
  let $repeat, $$unsubscribe_repeat;
  let $tracksManual, $$unsubscribe_tracksManual;
  let $$unsubscribe_queueStage;
  let $$unsubscribe_tracksAll;
  let $queueReady, $$unsubscribe_queueReady;
  let $playerPalette, $$unsubscribe_playerPalette;
  let $queueBoxVisible, $$unsubscribe_queueBoxVisible;
  let $currentTrack, $$unsubscribe_currentTrack;
  $$unsubscribe_tracksQueued = subscribe(tracksQueued, (value) => $tracksQueued = value);
  $$unsubscribe_tracksPlayed = subscribe(tracksPlayed, (value) => $tracksPlayed = value);
  $$unsubscribe_repeat = subscribe(repeat, (value) => $repeat = value);
  $$unsubscribe_tracksManual = subscribe(tracksManual, (value) => $tracksManual = value);
  $$unsubscribe_queueStage = subscribe(queueStage, (value) => value);
  $$unsubscribe_tracksAll = subscribe(tracksAll, (value) => value);
  $$unsubscribe_queueReady = subscribe(queueReady, (value) => $queueReady = value);
  $$unsubscribe_playerPalette = subscribe(playerPalette, (value) => $playerPalette = value);
  $$unsubscribe_queueBoxVisible = subscribe(queueBoxVisible, (value) => $queueBoxVisible = value);
  $$unsubscribe_currentTrack = subscribe(currentTrack, (value) => $currentTrack = value);
  crossfade({
    duration: (d) => Math.sqrt(d * 200),
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      return {
        duration: 200,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });
  $$result.css.add(css$3);
  manual = [...$tracksManual];
  next = $repeat === "ALL" ? [...$tracksQueued, ...$tracksPlayed] : [...$tracksQueued];
  hasManual = manual.length > 0;
  hasNext = next.length > 0;
  $$unsubscribe_tracksQueued();
  $$unsubscribe_tracksPlayed();
  $$unsubscribe_repeat();
  $$unsubscribe_tracksManual();
  $$unsubscribe_queueStage();
  $$unsubscribe_tracksAll();
  $$unsubscribe_queueReady();
  $$unsubscribe_playerPalette();
  $$unsubscribe_queueBoxVisible();
  $$unsubscribe_currentTrack();
  return `${$queueReady ? `<div class="${["queue-box svelte-1pei043", $queueBoxVisible ? "expanded" : ""].join(" ").trim()}" style="${"--main-light: " + escape($playerPalette.main.light, true) + "; --main-dark: " + escape($playerPalette.main.dark, true) + ";"}"><div class="body svelte-1pei043"><div class="list svelte-1pei043"><div class="label svelte-1pei043"><span class="text svelte-1pei043">NOW PLAYING
                        </span></div>
                    ${each([$currentTrack], (track) => {
    return `<div class="svelte-1pei043">${validate_component(Queue_item, "QueueItem").$$render(
      $$result,
      {
        track: track.track,
        id: track.id,
        position: "PLAYING"
      },
      {},
      {}
    )} 
                        </div>`;
  })}</div>

                ${hasManual ? `<div class="list svelte-1pei043"><div class="label svelte-1pei043"><span class="text svelte-1pei043">MANUALLY QUEUED
                            </span>
                            <button class="btn svelte-1pei043"><span class="tip svelte-1pei043">CLEAR QUEUE
                                </span>
                                <i class="bi bi-trash3 svelte-1pei043"></i></button></div>
                        ${each(manual, (track) => {
    return `<div class="svelte-1pei043">${validate_component(Queue_item, "QueueItem").$$render(
      $$result,
      {
        track: track.track,
        id: track.id,
        position: "MANUAL"
      },
      {},
      {}
    )}
                            </div>`;
  })}</div>` : ``}

                ${hasNext ? `<div class="list svelte-1pei043"><div class="label svelte-1pei043"><span class="text svelte-1pei043">UP NEXT
                            </span></div>
                        ${each(next, (track) => {
    return `<div class="svelte-1pei043">${validate_component(Queue_item, "QueueItem").$$render(
      $$result,
      {
        track: track.track,
        id: track.id,
        position: "NEXT"
      },
      {},
      {}
    )}
                            </div>`;
  })}</div>` : ``}</div></div>` : ``}`;
});
const USER_URL = BASE_API_URL + API_VERSION + "/user";
async function getUser(token2) {
  let user = await verifyToken(token2).then((valid) => {
    if (!valid) {
      throw new Error("BAD TOKEN");
    } else {
      return fetch(USER_URL, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token2
        }
      }).then((response) => {
        if (!response.ok) {
          console.error("BAD RESPONSE", response);
          throw new Error("BAD RESPONSE");
        } else {
          return response.json().then((data) => {
            return data.data;
          });
        }
      });
    }
  });
  return user;
}
const tab_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".svelte-10jiufq.svelte-10jiufq::-webkit-scrollbar{appearance:none;width:5px}.svelte-10jiufq.svelte-10jiufq::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.tab.svelte-10jiufq.svelte-10jiufq{position:relative;left:1px;z-index:1;display:flex;flex-direction:row;align-items:center;height:59px;transition:background-color 0.15s ease;border:1px solid transparent}.tab.svelte-10jiufq .tab-icon.svelte-10jiufq{display:flex;justify-content:center;align-items:center;width:60px}.tab.svelte-10jiufq .tab-icon .tab-icon-inner.svelte-10jiufq{text-align:center;width:60px}.tab.svelte-10jiufq .tab-label.svelte-10jiufq{opacity:0%;padding-left:10px}.tab.svelte-10jiufq .tab-label.expanded.svelte-10jiufq{opacity:100%}.tab.selected.svelte-10jiufq.svelte-10jiufq{background-color:rgb(70, 70, 70);border-color:rgba(255, 255, 255, 0.1);border-right:none;font-weight:bold}.tab.svelte-10jiufq.svelte-10jiufq:hover{border-color:rgba(255, 255, 255, 0.1);background-color:rgb(85, 85, 85)}a.svelte-10jiufq.svelte-10jiufq{color:white;text-decoration:none}",
  map: null
};
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { route } = $$props;
  let { label } = $$props;
  let { expanded } = $$props;
  if ($$props.route === void 0 && $$bindings.route && route !== void 0)
    $$bindings.route(route);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  $$result.css.add(css$2);
  $$unsubscribe_page();
  return `<a class="${["tab svelte-10jiufq", $page.url.pathname.includes(route) ? "selected" : ""].join(" ").trim()}"${add_attribute("href", route, 0)}><div class="tab-icon svelte-10jiufq"><div class="tab-icon-inner svelte-10jiufq">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${["tab-label svelte-10jiufq", expanded ? "expanded" : ""].join(" ").trim()}">${escape(label)}</div>
</a>`;
});
const sidebar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".svelte-16da7ai::-webkit-scrollbar{appearance:none;width:5px}.svelte-16da7ai::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.sidebar.svelte-16da7ai{position:relative;display:flex;background-color:rgb(50, 50, 50);flex-direction:column;width:60px;transition:width 0.2s ease}.sidebar.expanded.svelte-16da7ai{width:180px}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $token, $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => $token = value);
  let expanded = false;
  let username = getUser($token).catch((error) => {
    return "INVALID USER";
  });
  $$result.css.add(css$1);
  $$unsubscribe_token();
  return `<div class="${["sidebar svelte-16da7ai", ""].join(" ").trim()}">${validate_component(Tab, "Tab").$$render(
    $$result,
    {
      route: "/listen/playlists",
      label: "PLAYLISTS",
      expanded
    },
    {},
    {
      default: () => {
        return `<i class="bi bi-music-note-list svelte-16da7ai"></i>`;
      }
    }
  )}
    ${validate_component(Tab, "Tab").$$render(
    $$result,
    {
      route: "/listen/albums",
      label: "ALBUMS",
      expanded
    },
    {},
    {
      default: () => {
        return `<i class="bi bi-vinyl svelte-16da7ai"></i>`;
      }
    }
  )}
    ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
    `;
    }
    return function(username2) {
      return `
    ${validate_component(Tab, "Tab").$$render(
        $$result,
        {
          route: "/auth/login",
          label: "LOGOUT",
          expanded
        },
        {},
        {
          default: () => {
            return `<i class="bi bi-box-arrow-left svelte-16da7ai"></i>`;
          }
        }
      )}
    `;
    }();
  }(username)}
</div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-tx4w0q::-webkit-scrollbar{appearance:none;width:5px}.svelte-tx4w0q::-webkit-scrollbar-thumb{background-color:rgba(20, 20, 20, 0.5);border-radius:5px}.app-container.svelte-tx4w0q{display:flex;flex-grow:1;flex-direction:row;max-height:calc(100vh - 60px - 5px)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_token;
  $$unsubscribe_token = subscribe(token, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_token();
  return `<div class="app-container svelte-tx4w0q">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}
    ${slots.default ? slots.default({}) : ``}
    ${validate_component(Queue_box, "QueueBox").$$render($$result, {}, {}, {})}</div>

${validate_component(Player, "Player").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
