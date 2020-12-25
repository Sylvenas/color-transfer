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
declare function hexToHSL(hex: string): Array<number>;
export default hexToHSL;
