import { HEX_REG, HHEEXX_REG } from '../utils/reg'
/**
 * HEX to HSL
 * 
 * @example
 * #rgb => hsl(h,s%,l%)
 * #rgba => hsl(h,s%,l%,a)
 * #rrggbb => hsl(h,s%,l%)
 * #rrggbbaa => hsl(h,s%,l%,a)
 * 
 * @param hex string
 * 
 * @returns  hsl[a] string
 */
function hexToHSL(hex: string): Array<number> {
    if (!(HEX_REG.test(hex) || HHEEXX_REG.test(hex)))
        throw new Error("Invalid input HEX color")

    // Convert hex to RGB first
    let r = '0', g = '0', b = '0', a = '1';
    if (hex.length == 4 || hex.length === 5) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7 || hex.length === 9) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    if (hex.length === 5)
        a = "0x" + hex[4] + hex[4];
    else if (hex.length === 9)
        a = "0x" + hex[7] + hex[8];

    // Then to HSL
    let red = +r / 255,
        green = +g / 255,
        blue = +b / 255,
        alpha = +(+a / 255).toFixed(3);
    let cmin = Math.min(red, green, blue),
        cmax = Math.max(red, green, blue),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == red)
        h = ((green - blue) / delta) % 6;
    else if (cmax == green)
        h = (blue - red) / delta + 2;
    else
        h = (red - green) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    if (hex.length === 4 || hex.length === 7)
        return [h, s, l]
    else
        return [h, s, l, alpha]
}

export default hexToHSL