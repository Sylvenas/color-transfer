/**
 * hue format
 * 
 * @param hue string
 * 
 * @returns hus number
 */
export function hueUnit(hue: string): number {
    let res: number
    if (hue.indexOf('deg') > -1)
        res = +hue.replace('deg', '')
    else if (hue.indexOf('rad') > -1)
        res = Math.round(+hue.replace('rad', '') * (180 / Math.PI))
    else if (hue.indexOf('turn') > -1)
        res = Math.round(+hue.replace('turn', '') * 360)
    else
        res = +hue

    return res
}

interface RGBA {
    red: number,
    green: number,
    blue: number,
    alpha?: number
}
/**
 * string RGB[A] to number {r, g, b, a}
 * 
 * @param rgba string
 * 
 * @returns RGBA
 */
export function formatRGBAToNum(rgba: string): RGBA {
    const reg: RegExp = /\((.+?)\)/g
    let red: number, green: number, blue: number, alpha: number;
    if (reg.test(rgba)) {
        const rgba = RegExp.$1;
        const sep: string = rgba.indexOf(",") > -1 ? "," : " ";
        let rgbaList: Array<string> = rgba.split(sep);

        if (rgbaList.indexOf("/") > -1)
            rgbaList.splice(3, 1);

        red = computeRGB(rgbaList[0])
        green = computeRGB(rgbaList[1])
        blue = computeRGB(rgbaList[2])
        if (rgbaList[3]) {
            alpha = Math.round(computeAlpha(rgbaList[3]));
        }
    }
    return { red, green, blue, alpha }
}

export function computeRGB(str: string): number {
    return str.indexOf("%") > -1 ? +str.replace('%', '') / 100 * 255 : +str;
}

export function computeAlpha(alpha: string): number {
    return alpha.indexOf("%") > -1 ? +alpha.replace('%', '') / 100 * 255 : +alpha * 255;
}

interface HSLA {
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number
}
/**
 * string HSL[A] to number {h, s, l, a}
 * @param hsla string
 * 
 * @returns HSALA
 */
export function formatHSLAToNum(hsla: string): HSLA {
    const reg: RegExp = /\((.+?)\)/g
    let hue: number, saturation: number, lightness: number, alpha: number
    if (reg.test(hsla)) {
        const hsla: string = RegExp.$1;
        const sep: string = hsla.indexOf(",") > -1 ? "," : " ";
        const hslaList: Array<string> = hsla.split(sep);

        if (hslaList.indexOf("/") > -1)
            hslaList.splice(3, 1);

        hue = hueUnit(hslaList[0]);
        saturation = (+hslaList[1].replace('%', '')) / 100;
        lightness = (+hslaList[2].replace('%', '')) / 100;
        if (hslaList[3])
            alpha = computeAlpha(hslaList[3]) / 255
    }

    return { hue, saturation, lightness, alpha }
}