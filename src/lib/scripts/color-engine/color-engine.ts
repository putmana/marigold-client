import { RGB_to_OKLCH, type LCH } from "./oklab"
import { crushRGB } from "./utils"

type Swatch = {
        name: string,
        lightness: number,
        opacity: number,
}

const MAX_PRIMARY_CHROMA = 0.06
const MAX_SECONDARY_CHROMA = 0.04

const SWATCHES: Swatch[] = [
        { name: "verylight", lightness: 0.80, opacity: 1 },
        { name: "light", lightness: 0.65, opacity: 1 },
        { name: "medium", lightness: 0.50, opacity: 1 },
        { name: "dark", lightness: 0.35, opacity: 1 },
        { name: "verydark", lightness: 0.20, opacity: 1 },
        { name: "border", lightness: 0.65, opacity: 0.7 },
]

export function buildPalette(dbColors: string) {
        const parsed = parseDatabaseColors(dbColors)

        let primary = RGB_to_OKLCH(parsed.primary)
        let secondary = RGB_to_OKLCH(parsed.secondary)

        primary = limitChroma(primary, MAX_PRIMARY_CHROMA)
        secondary = limitChroma(secondary, MAX_SECONDARY_CHROMA)

        const css = generateVars(primary, SWATCHES, "primary") + generateVars(secondary, SWATCHES, "secondary")

        console.log(css)
        return css
}

function limitChroma(c: LCH, max: number) {
        c.C = max
        return c
}

function parseDatabaseColors(dbColors: string) {
        const colors = dbColors.split("&")
        const p = colors[0].split(".").map(x => parseInt(x))
        const s = colors[1].split(".").map(x => parseInt(x))

        let primary = { R: p[0], G: p[1], B: p[2] }
        let secondary = { R: s[0], G: s[1], B: s[2] }

        primary = crushRGB(primary)
        secondary = crushRGB(secondary)

        return {
                primary: primary,
                secondary: secondary,
        }
}

function generateVars(color: LCH, swatches: Swatch[], prefix: string): string {
        const vars = swatches.map(swatch => {
                return `--${prefix}-${swatch.name}: oklch(${swatch.lightness} ${color.C} ${color.H} / ${swatch.opacity});`
        })

        return vars.join('')
}

