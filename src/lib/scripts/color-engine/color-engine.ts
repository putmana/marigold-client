import { clamp, randomInteger } from "../utils"
import { RGB_to_OKLCH, type LCH, OKLCH_to_RGB, type RGB } from "./oklab"
import { crushRGB, inflateRGB } from "./utils"

type Swatch = {
        name: string,
        lightness: number,
        opacity: number,
}

type Colorset = {
        primary: RGB,
        secondary: RGB,
}

const MAX_PRIMARY_CHROMA = 0.06
const MAX_SECONDARY_CHROMA = 0.05

const MIN_PRIMARY_LIGHTNESS = 0.50
const MIN_SECONDARY_LIGHTNESS = 0.40
const MAX_PRIMARY_LIGHTNESS = 0.50
const MAX_SECONDARY_LIGHTNESS = 0.50

const SWATCHES: Swatch[] = [
        { name: "verylight", lightness: 0.30, opacity: 1 },
        { name: "light", lightness: 0.15, opacity: 1 },
        { name: "medium", lightness: 0.00, opacity: 1 },
        { name: "dark", lightness: -0.10, opacity: 1 },
        { name: "verydark", lightness: -0.20, opacity: 1 },
        { name: "border", lightness: 0.15, opacity: 0.7 },
]

export function getRandomPalette() {
        const colors = {
                primary: {
                        R: randomInteger(0, 255),
                        G: randomInteger(0, 255),
                        B: randomInteger(0, 255),
                },
                secondary: {
                        R: randomInteger(0, 255),
                        G: randomInteger(0, 255),
                        B: randomInteger(0, 255),
                }
        }
        console.log(colors)

        return buildPalette(colors)
}

export function buildPalette(colors: Colorset) {
        let primary = RGB_to_OKLCH(colors.primary)
        let secondary = RGB_to_OKLCH(colors.secondary)

        primary = limitChroma(primary, MAX_PRIMARY_CHROMA)
        primary = clampLightness(primary, MIN_PRIMARY_LIGHTNESS, MAX_PRIMARY_LIGHTNESS)
        secondary = limitChroma(secondary, MAX_SECONDARY_CHROMA)
        secondary = clampLightness(secondary, MIN_SECONDARY_LIGHTNESS, MAX_SECONDARY_LIGHTNESS)

        const css = generateVars(primary, SWATCHES, "primary") + generateVars(secondary, SWATCHES, "secondary")
        return css
}

function limitChroma(c: LCH, max: number) {
        c.C = Math.min(c.C, max)
        return c
}

function clampLightness(c: LCH, min: number, max: number) {
        c.L = clamp(c.L, min, max)
        return c
}

export function parseDatabaseColors(dbColors: string) {
        const colors = dbColors.split("&")
        const p = colors[0].split(".").map(x => parseInt(x))
        const s = colors[1].split(".").map(x => parseInt(x))

        let primary = { R: p[0], G: p[1], B: p[2] }
        let secondary = { R: s[0], G: s[1], B: s[2] }

        return {
                primary: primary,
                secondary: secondary,
        }
}

function generateVars(color: LCH, swatches: Swatch[], prefix: string): string {
        const vars = swatches.map(swatch => {
                const lch: LCH = {
                        L: color.L + swatch.lightness,
                        C: color.C,
                        H: color.H,
                }
                const rgb = OKLCH_to_RGB(lch)

                const css_rgb = `rgb(${rgb.R}, ${rgb.G}, ${rgb.B}, ${swatch.opacity})`
                const css_oklch = `oklch(${color.L + swatch.lightness} ${color.C} ${color.H} / ${swatch.opacity})`

                return `--${prefix}-${swatch.name}: ${css_rgb};`

        })

        return vars.join('')
}

