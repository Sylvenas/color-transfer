import { formatRGBAToNum } from '../utils'
import { RGB_REG, RGBA_REG } from '../utils/reg'
import { isNumeric } from '../utils/type-check'
/**
 * RGB to HSL
 *
 * @example
 * (r,g,b) => hsl(h,s%,l%)
 * (r,g,b,a) => hsla(h,s%,l%,a)
 *
 * rgb(r,g,b) => hsl(h,s%,l%)
 * rgba(r,g,b,a) => hsla(h,s%,l%,a)
 *
 * rgb(r,g,b) => hsl(h,s%,l%,a)
 * rgba(r,g,b,a) => hsla(h,s%,l%,a)
 *
 * @param r red number or rgb[a] string
 * @param g green number
 * @param b blue number
 *
 * @returns HSL string
 */
function RGBToHSL(r: number | string, g?: number, b?: number, a?: number): Array<number> {
    let red: number,
        green: number,
        blue: number,
        alpha: number;

    if (typeof r === 'number') {
        if (!isNumeric(r, g, b, a ? a : 1))
            throw new Error("Invalid input RGB[A] color")

        red = r / 255;
        green = g / 255;
        blue = b / 255;
        if (a && typeof a === 'number')
            alpha = a
    } else if (typeof r === 'string') {
        if (!(RGB_REG.test(r) || RGBA_REG.test(r)))
            throw new Error("Invalid input RGB[A] color")

        const rgba = formatRGBAToNum(r)
        red = rgba.red / 255
        green = rgba.green / 255
        blue = rgba.blue / 255
        if (rgba.alpha != null)
            alpha = +(rgba.alpha / 255).toFixed(1);
    }

    let cmin: number = Math.min(red, green, blue),
        cmax: number = Math.max(red, green, blue),
        delta: number = cmax - cmin,
        h: number = 0,
        s: number = 0,
        l: number = 0;

    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === red)
        h = ((green - blue) / delta) % 6;
    // Green is max
    else if (cmax === green)
        h = (blue - red) / delta + 2;
    // Blue is max
    else
        h = (red - green) / delta + 4;

    h = Math.round(h * 60);

    // 负值反转360度
    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    if (alpha) {
        return [h, s, l, alpha]
    }
    return [h, s, l]
}

export default RGBToHSL