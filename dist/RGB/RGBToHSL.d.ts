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
declare function RGBToHSL(r: number | string, g?: number, b?: number, a?: number): Array<number>;
export default RGBToHSL;
