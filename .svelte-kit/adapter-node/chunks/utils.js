function formatArtists(artists) {
  let formatted = "";
  artists.forEach((artist, index) => {
    if (index == artists.length - 1) {
      formatted += artist.name;
    } else {
      formatted += artist.name + ", ";
    }
  });
  return formatted;
}
function formatTime(secs, long = false, displaySecs = true) {
  let h = Math.floor(secs / 3600);
  let m = Math.floor(secs / 60);
  let s = Math.floor(secs % 60);
  let formatted = "";
  if (long) {
    if (h != 0)
      formatted += h.toString() + " " + pluralize("hour", h) + " ";
    if (m != 0)
      formatted += m.toString() + " " + pluralize("min", m) + " ";
    if (s != 0 && displaySecs)
      formatted += s.toString() + " " + pluralize("sec", s);
  } else {
    if (h != 0)
      formatted += h.toString() + ":";
    formatted += (m < 10 && h != 0 ? "0" + m.toString() : m.toString()) + (displaySecs ? ":" : "");
    if (displaySecs)
      formatted += s < 10 ? "0" + s.toString() : s.toString();
  }
  return formatted;
}
function pluralize(word, count, suffix = "s") {
  if (count == 1)
    return word;
  return word + suffix;
}
function sumDuration(tracks) {
  let dur = 0;
  tracks.forEach((track) => {
    dur += track.duration;
  });
  return dur;
}
export {
  formatArtists as a,
  formatTime as f,
  pluralize as p,
  sumDuration as s
};
