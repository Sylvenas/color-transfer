import { formatHSLAToNum } from '../utils'
import { HSL_REG, HSLA_REG } from '../utils/reg'
import { isNumeric } from '../utils/type-check'
/**
 * HSL to RGB
 * @example
 * (h,s%,l%) => rgb(r,g,b)
 * (h,s%,l%,a) => rgb(r,g,b,a)
 * hsl(h,s%,l%) => rgb(r,g,b)
 * hsla(h,s%,l%,a) => rgb(r,g,b,a)
 * hsl(h s% l%) => rgb(r,g,b)
 * hsla(h s% l% a) => rgb(r,g,b,a)
 * hsl(hdeg,s%,l%) => rgb(r,g,b)
 * hsl(hrad,s%,l%) => rgb(r,g,b)
 * hsl(hturn,s%,l%) => rgb(r,g,b)
 * 
 * @param h hue number or hsl[a] string
 * @param s saturation number
 * @param l lightness number
 * @param a alpha number
 * 
 * @returns 'rgb[a]' string
 */
function HSLToRGB(h: number | string, s?: number, l?: number, a?: number): Array<number> {

    let hue: number,
        saturation: number,
        lightness: number,
        alpha: number;
    if (typeof h === 'number') {
        if (!isNumeric(h, s, l, a ? a : 1))
            throw new Error("Invalid input HSL[A] color")

        // Must be fractions of 1
        hue = h as number;
        saturation = s / 100;
        lightness = l / 100;
        if (a && typeof a === 'number')
            alpha = a
    } else if (typeof h === 'string') {
        if (!(HSL_REG.test(h) || HSLA_REG.test(h)))
            throw new Error("Invalid input HSL[A] color")

        const hsla = formatHSLAToNum(h)
        hue = hsla.hue
        saturation = hsla.saturation
        lightness = hsla.lightness
        if (hsla.alpha != null) {
            alpha = hsla.alpha
        }
    }

    let primary: number = (1 - Math.abs(2 * lightness - 1)) * saturation,
        secondary: number = primary * (1 - Math.abs((hue / 60) % 2 - 1)),
        middle: number = lightness - primary / 2,
        red: number = 0,
        green: number = 0,
        blue: number = 0;

    if (0 <= hue && hue < 60) {
        red = primary; green = secondary; blue = 0;
    } else if (60 <= hue && hue < 120) {
        red = secondary; green = primary; blue = 0;
    } else if (120 <= hue && hue < 180) {
        red = 0; green = primary; blue = secondary;
    } else if (180 <= hue && hue < 240) {
        red = 0; green = secondary; blue = primary;
    } else if (240 <= hue && hue < 300) {
        red = secondary; green = 0; blue = primary;
    } else if (300 <= hue && hue < 360) {
        red = primary; green = 0; blue = secondary;
    }
    red = Math.round((red + middle) * 255);
    green = Math.round((green + middle) * 255);
    blue = Math.round((blue + middle) * 255);

    if (alpha) {
        return [red, green, blue, alpha]
    }

    return [red, green, blue]
}

export default HSLToRGB