import { d as derived, w as writable } from "./index.js";
import { d as defaultColor } from "./colors.js";
function clearQueue() {
  const FLAG = "DIE";
  return {
    flag: FLAG,
    seen: false,
    tracks: [],
    position: 0
  };
}
const defaultTrack = {
  id: "default",
  title: "",
  artists: [
    {
      id: "default",
      name: ""
    }
  ],
  duration: 0,
  cover: {
    path: "",
    color: defaultColor
  },
  path: ""
};
const defaultQueueTrack = {
  id: "default",
  source: "AUTO",
  track: defaultTrack
};
const queueReady = writable(false);
const tracksPlayed = writable([]);
const tracksQueued = writable([]);
const tracksManual = writable([]);
const currentTrack = writable();
const tracksAll = derived(
  [tracksPlayed, currentTrack, tracksManual, tracksQueued],
  ([$tracksPlayed, $currentTrack, $tracksManual, $tracksQueued]) => [...$tracksPlayed, $currentTrack, ...$tracksManual, ...$tracksQueued]
);
const shuffle = writable(false);
const repeat = writable("OFF");
const queueStage = writable(clearQueue());
const queueBoxVisible = writable(false);
export {
  queueReady as a,
  tracksPlayed as b,
  currentTrack as c,
  tracksQueued as d,
  queueStage as e,
  defaultQueueTrack as f,
  tracksAll as g,
  queueBoxVisible as q,
  repeat as r,
  shuffle as s,
  tracksManual as t
};
