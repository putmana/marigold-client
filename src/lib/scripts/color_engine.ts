const darkenFull = 0;
const darkenHover = 20;
const darkenMain = 40;
const darkenBackground = 60;

export default class ColorEngine {
    constructor(public color: string) {}

    get fullLight() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseLightColor(this.color), darkenFull)) 
    }
    
    get fullDark() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseDarkColor(this.color), darkenFull))
    }

    get hoverLight() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseLightColor(this.color), darkenHover))
    }

    get hoverDark() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseDarkColor(this.color), darkenHover))
    }

    get mainLight() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseLightColor(this.color), darkenMain))
    }

    get mainDark() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseDarkColor(this.color), darkenMain))
    }

    get backgroundLight() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseLightColor(this.color), darkenBackground))
    }

    get backgroundDark() {
        return ColorEngine.buildCssColor(ColorEngine.darkenColor(ColorEngine.parseDarkColor(this.color), darkenBackground))
    }

    private static parseLightColor(mgColor: string): number[] {
        let c = mgColor.split("&"); // "255.255.255&10.10.10" -> ["255.255.255", "10.10.10"]
        let lc = c[0].split("."); // "255.255.255" -> ["255", "255", "255"]
        
        return [ +lc[0], +lc[1], +lc[2] ]
    }

    private static parseDarkColor(mgColor: string): number[] {
        let c = mgColor.split("&"); // "255.255.255&10.10.10" -> ["255.255.255", "10.10.10"]
        let dc = c[1].split("."); // "10.10.10" -> ["10", "10", "10"]
    
        return [ +dc[0], +dc[1], +dc[2] ]
    }

    private static darkenColor(color: number[], percent: number): number[] {
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

    private static buildCssColor(color: number[]) {
        return "rgb("+color[0]+", "+color[1]+", "+color[2]+")"; 
    }
}
