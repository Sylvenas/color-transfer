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
declare function HSLToRGB(h: number | string, s?: number, l?: number, a?: number): Array<number>;
export default HSLToRGB;
