import { derived, writable, type Writable } from "svelte/store";

class PaletteStore {
    constructor (
        public highlight_light: Writable<[number, number, number]> = writable([200, 200, 200]),
        public highlight_dark: Writable<[number, number, number]> = writable([135, 135, 135]),
        public hover_light: Writable<[number, number, number]> = writable([135, 135, 135]),
        public hover_dark: Writable<[number, number, number]> = writable([100, 100, 100]),
        public main_light: Writable<[number, number, number]> = writable([100, 100, 100]),
        public main_dark: Writable<[number, number, number]> = writable([70, 70, 70]),
        public background_light: Writable<[number, number, number]> = writable([50, 50, 50]),
        public background_dark: Writable<[number, number, number]> = writable([20, 20, 20])
    ) {}

    get css_highlight_light() {
        return derived(this.highlight_light, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_highlight_dark() {
        return derived(this.highlight_dark, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_hover_light() {
        return derived(this.hover_light, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_hover_dark() {
        return derived(this.hover_dark, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_main_light() {
        return derived(this.main_light, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_main_dark() {
        return derived(this.main_dark, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_background_light() {
        return derived(this.background_light, ($color) => {
            return this.buildCssColor($color);
        });
    }
    get css_background_dark() {
        return derived(this.background_dark, ($color) => {
            return this.buildCssColor($color);
        });
    }

    private buildCssColor(color: [number, number, number]) {
        return "rgb("+color[0]+", "+color[1]+", "+color[2]+")"; 
    }
}


export const deckPaletteStore = new PaletteStore();
export const playerPaletteStore = new PaletteStore();