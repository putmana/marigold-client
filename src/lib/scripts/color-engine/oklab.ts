import type { RGB, LAB, LCH } from "./color-engine"
import { crushRGB, inflateRGB } from "./utils"

const BLACK: RGB = { R: 0, G: 0, B: 0 }

export function RGB_to_OKLCH(c: RGB): LCH {
        return OKLAB_to_OKLCH(RGB_to_OKLAB(c))
}

export function OKLCH_to_RGB(c: LCH): RGB {
        return OKLAB_to_RGB(OKLCH_to_OKLAB(c))
}

export function HEX_to_OKLCH(c: string): LCH {
        return RGB_to_OKLCH(HEX_to_RGB(c))
}

export function OKLCH_to_HEX(c: LCH): string {
        return RGB_to_HEX(OKLCH_to_RGB(c))
}

export function RGB_to_OKLAB(c: RGB): LAB {
        const lc = linearizeRGB(crushRGB(c))

        const l = 0.4122214708 * lc.R + 0.5363325363 * lc.G + 0.0514459929 * lc.B
        const m = 0.2119034982 * lc.R + 0.6806995451 * lc.G + 0.1073969566 * lc.B
        const s = 0.0883024619 * lc.R + 0.2817188376 * lc.G + 0.6299787005 * lc.B

        const l_ = Math.cbrt(l)
        const m_ = Math.cbrt(m)
        const s_ = Math.cbrt(s)

        return {
                L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
                A: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
                B: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
        }
}

export function OKLAB_to_RGB(c: LAB): RGB {
        const l_ = c.L + 0.3963377774 * c.A + 0.2158037573 * c.B
        const m_ = c.L - 0.1055613458 * c.A - 0.0638541728 * c.B
        const s_ = c.L - 0.0894841775 * c.A - 1.2914855480 * c.B

        const l = l_ * l_ * l_
        const m = m_ * m_ * m_
        const s = s_ * s_ * s_

        const lc = {
                R: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
                G: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
                B: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
        }

        return inflateRGB(unlinearizeRGB(lc))
}

export function OKLAB_to_OKLCH(c: LAB): LCH {
        return {
                L: c.L,
                C: Math.sqrt(c.A ** 2 + c.B ** 2),
                H: Math.atan2(c.B, c.A) * 180 / Math.PI - 180
        }
}

export function OKLCH_to_OKLAB(c: LCH): LAB {
        return {
                L: c.L,
                A: c.C * Math.cos((c.H - 180) * Math.PI / 180),
                B: c.C * Math.sin((c.H - 180) * Math.PI / 180),
        }
}

export function HEX_to_RGB(c: string): RGB {

        try {
                c = c.replace("#", "")

                const R = parseInt(c.substring(0, 2), 16)
                const G = parseInt(c.substring(2, 4), 16)
                const B = parseInt(c.substring(4, 6), 16)

                return { R, G, B }

        } catch {
                console.error(`Failed to parse hex color: "${c}"`)

                return BLACK
        }
}

export function RGB_to_HEX(c: RGB): string {
        let R = c.R.toString(16)
        let G = c.G.toString(16)
        let B = c.B.toString(16)

        R = R.length === 1 ? `0${R}` : R
        G = G.length === 1 ? `0${G}` : G
        B = B.length === 1 ? `0${B}` : B

        return `#${R}${G}${B}`.toUpperCase()
}

function linearizeRGB(c: RGB): RGB {
        const linear = (x: number) => {
                if (x >= 0.04045) return ((x + 0.055) / (1 + 0.055)) ** 2.4
                return x / 12.92
        }

        return {
                R: linear(c.R),
                G: linear(c.G),
                B: linear(c.B),
        }
}

function unlinearizeRGB(c: RGB): RGB {
        const nonlinear = (x: number) => {
                if (x >= 0.0031308) return (1.055) * (x ** (1.0 / 2.4)) - 0.055
                return 12.92 * x
        }

        return {
                R: nonlinear(c.R),
                G: nonlinear(c.G),
                B: nonlinear(c.B),
        }
}
