import { derived, writable, type Writable } from "svelte/store";

const defaultLight = [100, 100, 100];
const defaultDark = [70, 70, 70];

const darkenHighlight = 0;
const darkenHover = 20;
const darkenMain = 40;
const darkenBackground = 60;

class PaletteStore {
    constructor (
        public light: Writable<number[]> = writable(defaultLight),
        public dark: Writable<number[]> = writable(defaultDark),
    ) {}

    public updateColor(mgColor: string) {
        let colors = this.parseMgColor(mgColor);
        this.light = writable(colors.light);
        this.dark = writable(colors.dark);
    }
    
    get css_highlight_light() {
        return derived(this.light, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenHighlight));
        });
    }
    get css_highlight_dark() {
        return derived(this.dark, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenHighlight));
        });
    }
    get css_hover_light() {
        return derived(this.light, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenHover));
        });
    }
    get css_hover_dark() {
        return derived(this.dark, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenHover));
        });
    }
    get css_main_light() {
        return derived(this.light, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenMain));
        });
    }
    get css_main_dark() {
        return derived(this.dark, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenMain));
        });
    }
    get css_background_light() {
        return derived(this.light, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenBackground));
        });
    }
    get css_background_dark() {
        return derived(this.dark, ($color) => {
            return this.buildCssColor(this.darkenColor($color, darkenBackground));
        });
    }

    private buildCssColor(color: number[]) {
        return "rgb("+color[0]+", "+color[1]+", "+color[2]+")"; 
    }

    private parseMgColor(mgColor: string): {light: [number, number, number], dark: [number, number, number]} {
        let c = mgColor.split("&"); // "255.255.255&10.10.10" -> ["255.255.255", "10.10.10"]
        let lc = c[0].split("."); // "255.255.255" -> ["255", "255", "255"]
        let dc = c[1].split("."); // "10.10.10" -> ["10", "10", "10"]
    
        return {
            light: [ +lc[0], +lc[1], +lc[2] ],
            dark: [ +dc[0], +dc[1], +dc[2] ]
        }
    }

    private darkenColor(color: number[], percent: number): number[] {
        // Convert RGB values to a range from 0 to 1
        let r = color[0] / 255;
        let g = color[1] / 255;
        let b = color[2] / 255;

        // Darken the color by the specified percentage
        r *= 1 - percent / 100;
        g *= 1 - percent / 100;
        b *= 1 - percent / 100;

        // Convert back to the range from 0 to 255
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return [r, g, b];
    }
}


export const deckPaletteStore = new PaletteStore();
export const playerPaletteStore = new PaletteStore();