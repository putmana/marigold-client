// mgColor is the proprietary format in which colors are stored in the database.
// Example: 0.0.0&0.0.0 -> {light: [0, 0, 0], dark: [0, 0, 0]}


export function parseMgColor(mgColor: string): {light: [number, number, number], dark: [number, number, number]} {
    let c = mgColor.split("&"); // "255.255.255&10.10.10" -> ["255.255.255", "10.10.10"]
    let lc = c[0].split("."); // "255.255.255" -> ["255", "255", "255"]
    let dc = c[1].split("."); // "10.10.10" -> ["10", "10", "10"]

    return {
        light: [ +lc[0], +lc[1], +lc[2] ],
        dark: [ +dc[0], +dc[1], +dc[2] ]
    }
}

export function buildMgColor(lightColor: [number, number, number], darkColor: [number, number, number]): string {
    return lightColor[0]+"."+lightColor[1]+"."+lightColor[2]+"&"+darkColor[0]+"."+darkColor[1]+"."+darkColor[2];
}