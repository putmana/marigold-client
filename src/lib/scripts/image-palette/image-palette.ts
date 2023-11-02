import { Palette } from "../color-engine/palette"
import { RGB_to_OKLCH, OKLCH_to_RGB } from "../color-engine/oklab"
import { getQuantizedColors } from "./median-cut"
import { Color } from "../color-engine/color"

async function loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
                const img = new Image()
                img.src = url
                img.onload = () => resolve(img)
                img.onerror = () => reject(new Error(`Failed to load image from url: ${url}`))
        })
}

export async function loadAndResize(imgURL: string, width = 100, height = 100): Promise<string> {
        const img = await loadImage(imgURL)

        const canvas = new OffscreenCanvas(width, height)
        const ctx = canvas.getContext("2d")

        ctx.drawImage(img, 0, 0, width, height)

        const blob = await canvas.convertToBlob()
        const url = URL.createObjectURL(blob)

        return url
}

export async function resizeImage(img: HTMLImageElement, width: number, height: number): Promise<HTMLImageElement> {
        const canvas = new OffscreenCanvas(width, height)
        const ctx = canvas.getContext("2d")

        ctx.drawImage(img, 0, 0, width, height)

        const blob = await canvas.convertToBlob()
        img.src = URL.createObjectURL(blob)

        return img
}

const SAMPLE_RATE = 1
const IMAGE_SIZE = 200
export async function getPalette(imgURL: string): Promise<Palette> {
        const img = await loadImage(imgURL)

        const canvas = new OffscreenCanvas(IMAGE_SIZE, IMAGE_SIZE)
        const ctx = canvas.getContext("2d")

        ctx.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE)

        // Grab image data while filtering out alpha values
        const data = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE).data
                .filter((c, index) => index % 4 !== 3)


        // Map the image data to an array of OKLAB colors 
        const pixels = [...data]
                .reduce((arr, c, index) => {
                        const colorIndex = Math.floor(index / 3)
                        if (!arr[colorIndex]) arr[colorIndex] = []
                        arr[colorIndex].push(c)
                        return arr
                }, [])
                .filter((c, index) => index % SAMPLE_RATE === 0)


        return getDominantColors(pixels)
}

function getPrimaryColor(pixels: number[][]): Color {
        const colors = getQuantizedColors(pixels, 1)
                .map(c => RGB_to_OKLCH({
                        R: c[0],
                        G: c[1],
                        B: c[2],
                }))
                .sort((a, b) => a.L - b.L)
                .reverse()
                .map(c => OKLCH_to_RGB(c))

        return Color.fromRGB(colors[0])
}

function getDominantColors(pixels: number[][]): Palette {
        const colors = getQuantizedColors(pixels, 1)
                .map(c => RGB_to_OKLCH({
                        R: c[0],
                        G: c[1],
                        B: c[2],
                }))
                .sort((a, b) => a.L - b.L)
                .reverse()
                .map(c => OKLCH_to_RGB(c))

        return Palette.fromRGB(colors[0], colors[1])
}
