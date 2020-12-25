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
declare function RGBToHex(r: number | string, g?: number, b?: number, a?: number): string;
export default RGBToHex;
