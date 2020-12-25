import { formatHSLAToNum } from '../utils'
import { HSL_REG, HSLA_REG } from '../utils/reg'
import { isNumeric } from '../utils/type-check'

/**
 * HSL to RGB
 * @example
 * (h,s,l) => #rrggbb
 * (h,s,l,a) => #rrggbbaa
 * hsl(h,s,l) => #rrggbb
 * hsla(h,s,l,a) => #rrggbbaa
 * hsl(hdeg,s,l) => #rrggbb
 * hsl(hrad,s,l) => #rrggbb
 * hsl(hturn,s,l) => #rrggbb
 * 
 * @param h hue number or hsl[a] string
 * @param s saturation number
 * @param l lightness number
 * @param a alpha number
 * 
 * @returns '#rrggbb[aa]' string
 */
function HSLToHEX(h: number | string, s?: number, l?: number, a?: number): Array<string> {

    let hue: number,
        saturation: number,
        lightness: number,
        alpha: string;
    if (typeof h === 'number') {
        if (!isNumeric(h, s, l, a ? a : 1))
            throw new Error("Invalid input HSL[A] color")

        // Must be fractions of 1
        hue = h as number;
        saturation = s / 100;
        lightness = l / 100;
        if (a && typeof a === 'number')
            alpha = Math.round(a * 255).toString(16);
    } else if (typeof h === 'string') {
        if (!(HSL_REG.test(h) || HSLA_REG.test(h)))
            throw new Error("Invalid input HSL[A] color")

        const hsla = formatHSLAToNum(h)
        hue = hsla.hue
        saturation = hsla.saturation
        lightness = hsla.lightness
        if (hsla.alpha != null) {
            alpha = Math.round((hsla.alpha * 255)).toString(16)
        }
    }

    let primary: number = (1 - Math.abs(2 * lightness - 1)) * saturation,
        secondary: number = primary * (1 - Math.abs((hue / 60) % 2 - 1)),
        middle: number = lightness - primary / 2,
        red: number | string = 0,
        green: number | string = 0,
        blue: number | string = 0;

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
    red = Math.round((red + middle) * 255).toString(16) as string;
    green = Math.round((green + middle) * 255).toString(16) as string;
    blue = Math.round((blue + middle) * 255).toString(16) as string;

    // 添加 0
    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;

    if (alpha) {
        return [red, green, blue, alpha]
    }

    return [red, green, blue]
}

export default HSLToHEX