import { formatRGBAToNum } from '../utils'
import { RGB_REG, RGBA_REG } from '../utils/reg'
import { isNumeric } from '../utils/type-check'
/**
 * RGB to HEX
 * 
 * @example 
 * (r,g,b) => #rrggbb
 * (r,g,b,a) => #rrggbbaa
 * 
 * rgb(rgb) => #rrggbb
 * rgba(r,g,b,a) => #rrggbbaa
 * 
 * rgb(r g b) => #rrggbb
 * rgba(r g b a) => #rrggbbaa
 * 
 * @param r red number or rgb[a] string
 * @param g green number
 * @param b blue number
 * 
 * @returns HEX string
 */
function RGBToHex(r: number | string, g?: number, b?: number, a?: number): Array<string> {
    let red: string,
        green: string,
        blue: string,
        alpha: string;
    if (typeof r === 'number') {
        if (!isNumeric(r, g, b, a ? a : 1))
            throw new Error("Invalid input RGB[A] color")

        red = r.toString(16);
        green = g.toString(16);
        blue = b.toString(16);
        if (a) {
            alpha = Math.round(a * 255).toString(16);
        }
    } else if (typeof r === 'string') {
        if (!(RGB_REG.test(r) || RGBA_REG.test(r)))
            throw new Error("Invalid input RGB[A] color")

        const rgba = formatRGBAToNum(r)
        red = rgba.red.toString(16);
        green = rgba.green.toString(16);
        blue = rgba.blue.toString(16);
        if (rgba.alpha != null)
            alpha = rgba.alpha.toString(16);
    }

    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;
    if (alpha && alpha.length == 1)
        alpha = "0" + alpha;

    if (alpha) {
        return [red, green, blue, alpha]
    }
    return [red, green, blue]
}

export default RGBToHex