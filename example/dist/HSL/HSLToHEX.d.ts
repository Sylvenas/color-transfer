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
declare function HSLToHEX(h: number | string, s?: number, l?: number, a?: number): string;
export default HSLToHEX;
