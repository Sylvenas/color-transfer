/**
 * hue format
 *
 * @param hue string
 *
 * @returns hus number
 */
export declare function hueUnit(hue: string): number;
export declare function formatRGBAToNum(rgba: any): {
    red: number;
    green: number;
    blue: number;
    alpha: number;
};
export declare function computeRGB(str: any): number;
export declare function computeAlpha(alpha: any): number;
export declare function formatHSLAToNum(hsla: any): {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
};
