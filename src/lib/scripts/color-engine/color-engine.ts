import { clamp, randomInteger } from "../utils"
import { RGB_to_OKLCH, OKLCH_to_RGB } from "./oklab"

export type RGB = {
        R: number,
        G: number,
        B: number,
}

export type LAB = {
        L: number,
        A: number,
        B: number,
}

export type LCH = {
        L: number,
        C: number,
        H: number,
}
