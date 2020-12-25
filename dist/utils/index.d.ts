/**
 * hue format
 *
 * @param hue string
 *
 * @returns hus number
 */
export declare function hueUnit(hue: string): number;
interface RGBA {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
/**
 * string RGB[A] to number {r, g, b, a}
 *
 * @param rgba string
 *
 * @returns RGBA
 */
export declare function formatRGBAToNum(rgba: string): RGBA;
export declare function computeRGB(str: string): number;
export declare function computeAlpha(alpha: string): number;
interface HSLA {
    hue: number;
    saturation: number;
    lightness: number;
    alpha?: number;
}
/**
 * string HSL[A] to number {h, s, l, a}
 * @param hsla string
 *
 * @returns HSALA
 */
export declare function formatHSLAToNum(hsla: string): HSLA;
export {};
