import type { RGB } from "./color-engine";

// Map RGB values from 0-255 to 0-1
export function crushRGB(c: RGB): RGB {
        const LIMIT = 255
        return {
                R: c.R / LIMIT,
                G: c.G / LIMIT,
                B: c.B / LIMIT,
        }
}

// Map RGB values from 0-1 to 0-255
export function inflateRGB(c: RGB): RGB {
        const LIMIT = 255
        return {
                R: Math.round(c.R * LIMIT),
                G: Math.round(c.G * LIMIT),
                B: Math.round(c.B * LIMIT),
        }
}
