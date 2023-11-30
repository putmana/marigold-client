export function formatPlayerTime(time: number) {
        time = Math.round(time)

        const lzero = (x: number) => {
                return x < 10 ? `0${x}` : `${x}`
        }

        const secs = time % 60
        const mins = Math.floor(time / 60)
        const hours = Math.floor(mins / 60)

        if (hours > 0) {
                return `${hours}:${lzero(mins)}:${lzero(secs)}`
        }

        return `${mins}:${lzero(secs)}`
}

export function clamp(x: number, min: number, max: number) {
        return Math.min(Math.max(min, x), max)
}

export function randomInteger(min: number, max: number) {
        const range = (max - min)
        const rnd = Math.floor(Math.random() * range) - min

        return rnd
}

export function shuffleArray(arr: Array<any>) {
        for (let i = arr.length - 1; i > 0; i--) {
                const k = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[k]] = [arr[k], arr[i]];
        }
        return arr;
}

export async function getFileURL(file: File): Promise<string> {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result.toString())
                reader.onerror = () => reject(new Error("Failed to load file"))
        })
}

export function pluralize(count: number, single: string, plural: string): string {
        return count === 1 ? single : plural
}
