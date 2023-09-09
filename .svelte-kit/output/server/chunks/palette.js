const BRIGHT_LIGHT = 0.8;
const BRIGHT_DARK = 0.8;
const MAIN_LIGHT = 0.5;
const MAIN_DARK = 0.3;
const DIM_LIGHT = 0.3;
const DIM_DARK = 0.2;
const SAT_LIMIT = 0.45;
function randomPalette() {
  function randColor() {
    return [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256)
    ];
  }
  return buildPalette(buildMgColor(randColor(), randColor()));
}
function buildPalette(mgColor) {
  const parsed = parseMgColor(mgColor);
  const l = parsed[0];
  const d = parsed[1];
  const lb = [l[0], Math.min(l[1], SAT_LIMIT), BRIGHT_LIGHT];
  const db = [d[0], Math.min(d[1], SAT_LIMIT), BRIGHT_DARK];
  const lm = [l[0], Math.min(l[1], SAT_LIMIT), MAIN_LIGHT];
  const dm = [d[0], Math.min(d[1], SAT_LIMIT), MAIN_DARK];
  const ld = [l[0], Math.min(l[1], SAT_LIMIT), DIM_LIGHT];
  const dd = [d[0], Math.min(d[1], SAT_LIMIT), DIM_DARK];
  console.log("HSV", lb, db, lm, dm, ld, dd);
  const pal = {
    bright: {
      light: buildCssColor(lb),
      dark: buildCssColor(db)
    },
    main: {
      light: buildCssColor(lm),
      dark: buildCssColor(dm)
    },
    dim: {
      light: buildCssColor(ld),
      dark: buildCssColor(dd)
    }
  };
  console.log(pal);
  return pal;
}
function parseMgColor(mgColor) {
  let colors = mgColor.split("&");
  let light = RGBtoHSV(colors[0].split(".").map((val) => parseInt(val)));
  let dark = RGBtoHSV(colors[1].split(".").map((val) => parseInt(val)));
  console.log("LIGHT PARSE", light);
  console.log("DARK PARSE", dark);
  return [light, dark];
}
function buildMgColor(light, dark) {
  return light[0] + "." + light[1] + "." + light[2] + "&" + dark[0] + "." + dark[1] + "." + dark[2];
}
function buildCssColor(color) {
  color = HSVtoRGB(color);
  return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
}
function RGBtoHSV(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const s = max === 0 ? 0 : (max - min) / max;
  let h = 0;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / (max - min) + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / (max - min) + 2;
        break;
      case b:
        h = (r - g) / (max - min) + 4;
        break;
    }
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100) / 100, Math.round(v * 100) / 100];
}
function HSVtoRGB(hsv) {
  const [h, s, v] = hsv;
  let [r, g, b] = [0, 0, 0];
  const M = 255 * v;
  const m = M * (1 - s);
  const z = (M - m) * (1 - Math.abs(h / 60 % 2 - 1));
  if (h >= 0 && h < 60) {
    r = M;
    g = z + m;
    b = m;
  } else if (h >= 60 && h < 120) {
    r = z + m;
    g = M;
    b = m;
  } else if (h >= 120 && h < 180) {
    r = m;
    g = M;
    b = z + m;
  } else if (h >= 180 && h < 240) {
    r = m;
    g = z + m;
    b = M;
  } else if (h >= 240 && h < 300) {
    r = z + m;
    g = m;
    b = M;
  } else if (h >= 300 && h < 360) {
    r = M;
    g = m;
    b = z + m;
  }
  return [r, g, b];
}
export {
  buildPalette as b,
  randomPalette as r
};
