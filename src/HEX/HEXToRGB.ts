import { HEX_REG, HHEEXX_REG } from '../utils/reg'

/**
 * HEX to RGB
 *
 * @example 
 * #rgb => rgb(r,g,b)
 * #rgba => rgb(r,g,b,a)
 * #rrggbb => rgb(r,g,b)
 * #rrggbbaa => rgba(r,g,b,a)
 * 
 * @param h hex
 * 
 * @returns RGB string
 */
function HEXToRGB(h: string): Array<number> {
    if (!(HEX_REG.test(h) || HHEEXX_REG.test(h)))
        throw new Error("Invalid input HEX color")

    let red: string = '0',
        green: string = '0',
        blue: string = '0',
        alpha: string = '1';

    // 3 digits
    if (h.length === 4 || h.length === 5) {
        red = "0x" + h[1] + h[1];
        green = "0x" + h[2] + h[2];
        blue = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length === 7 || h.length === 9) {
        red = "0x" + h[1] + h[2];
        green = "0x" + h[3] + h[4];
        blue = "0x" + h[5] + h[6];
    }
    if (h.length === 5) {
        alpha = "0x" + h[4] + h[4];
        alpha = (+alpha / 255).toFixed(3);
    } else if (h.length === 9) {
        alpha = "0x" + h[7] + h[8];
        alpha = (+alpha / 255).toFixed(3);
    }


    if (h.length === 4 || h.length === 7) {
        return [+red, +green, +blue]
    } else {
        return [+red, +green, +blue, +alpha]
    }
}

export default HEXToRGB