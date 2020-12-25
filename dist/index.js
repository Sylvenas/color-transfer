'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * hue format
 *
 * @param hue string
 *
 * @returns hus number
 */
function hueUnit(hue) {
    var res;
    if (hue.indexOf('deg') > -1)
        res = +hue.replace('deg', '');
    else if (hue.indexOf('rad') > -1)
        res = Math.round(+hue.replace('rad', '') * (180 / Math.PI));
    else if (hue.indexOf('turn') > -1)
        res = Math.round(+hue.replace('turn', '') * 360);
    else
        res = +hue;
    return res;
}
/**
 * string RGB[A] to number {r, g, b, a}
 *
 * @param rgba string
 *
 * @returns RGBA
 */
function formatRGBAToNum(rgba) {
    var reg = /\((.+?)\)/g;
    var red, green, blue, alpha;
    if (reg.test(rgba)) {
        var rgba_1 = RegExp.$1;
        var sep = rgba_1.indexOf(",") > -1 ? "," : " ";
        var rgbaList = rgba_1.split(sep);
        if (rgbaList.indexOf("/") > -1)
            rgbaList.splice(3, 1);
        red = computeRGB(rgbaList[0]);
        green = computeRGB(rgbaList[1]);
        blue = computeRGB(rgbaList[2]);
        if (rgbaList[3]) {
            alpha = Math.round(computeAlpha(rgbaList[3]));
        }
    }
    return { red: red, green: green, blue: blue, alpha: alpha };
}
function computeRGB(str) {
    return str.indexOf("%") > -1 ? +str.replace('%', '') / 100 * 255 : +str;
}
function computeAlpha(alpha) {
    return alpha.indexOf("%") > -1 ? +alpha.replace('%', '') / 100 * 255 : +alpha * 255;
}
/**
 * string HSL[A] to number {h, s, l, a}
 * @param hsla string
 *
 * @returns HSALA
 */
function formatHSLAToNum(hsla) {
    var reg = /\((.+?)\)/g;
    var hue, saturation, lightness, alpha;
    if (reg.test(hsla)) {
        var hsla_1 = RegExp.$1;
        var sep = hsla_1.indexOf(",") > -1 ? "," : " ";
        var hslaList = hsla_1.split(sep);
        if (hslaList.indexOf("/") > -1)
            hslaList.splice(3, 1);
        hue = hueUnit(hslaList[0]);
        saturation = (+hslaList[1].replace('%', '')) / 100;
        lightness = (+hslaList[2].replace('%', '')) / 100;
        if (hslaList[3])
            alpha = computeAlpha(hslaList[3]) / 255;
    }
    return { hue: hue, saturation: saturation, lightness: lightness, alpha: alpha };
}

var RGB_REG = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
var RGBA_REG = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
var HEX_REG = /^#([\da-f]{3}){1,2}$/i;
var HHEEXX_REG = /^#([\da-f]{4}){1,2}$/i;
var HSL_REG = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
var HSLA_REG = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

function isNumeric() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var numberArr = numbers.filter(function (n) { return !isNaN(parseFloat(n.toString())) && isFinite(n); });
    return numberArr.length === numbers.length;
}

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
function RGBToHex(r, g, b, a) {
    var red, green, blue, alpha;
    if (typeof r === 'number') {
        if (!isNumeric(r, g, b, a ? a : 1))
            throw new Error("Invalid input RGB[A] color");
        red = r.toString(16);
        green = g.toString(16);
        blue = b.toString(16);
        if (a) {
            alpha = Math.round(a * 255).toString(16);
        }
    }
    else if (typeof r === 'string') {
        if (!(RGB_REG.test(r) || RGBA_REG.test(r)))
            throw new Error("Invalid input RGB[A] color");
        var rgba = formatRGBAToNum(r);
        red = rgba.red.toString(16);
        green = rgba.green.toString(16);
        blue = rgba.blue.toString(16);
        if (rgba.alpha != null)
            alpha = rgba.alpha.toString(16);
    }
    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;
    if (alpha && alpha.length == 1)
        alpha = "0" + alpha;
    if (alpha) {
        return [red, green, blue, alpha];
    }
    return [red, green, blue];
}

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
function RGBToHSL(r, g, b, a) {
    var red, green, blue, alpha;
    if (typeof r === 'number') {
        if (!isNumeric(r, g, b, a ? a : 1))
            throw new Error("Invalid input RGB[A] color");
        red = r / 255;
        green = g / 255;
        blue = b / 255;
        if (a && typeof a === 'number')
            alpha = a;
    }
    else if (typeof r === 'string') {
        if (!(RGB_REG.test(r) || RGBA_REG.test(r)))
            throw new Error("Invalid input RGB[A] color");
        var rgba = formatRGBAToNum(r);
        red = rgba.red / 255;
        green = rgba.green / 255;
        blue = rgba.blue / 255;
        if (rgba.alpha != null)
            alpha = +(rgba.alpha / 255).toFixed(1);
    }
    var cmin = Math.min(red, green, blue), cmax = Math.max(red, green, blue), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === red)
        h = ((green - blue) / delta) % 6;
    // Green is max
    else if (cmax === green)
        h = (blue - red) / delta + 2;
    // Blue is max
    else
        h = (red - green) / delta + 4;
    h = Math.round(h * 60);
    // 负值反转360度
    if (h < 0)
        h += 360;
    l = (cmax + cmin) / 2;
    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    if (alpha) {
        return [h, s, l, alpha];
    }
    return [h, s, l];
}

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
function HEXToRGB(h) {
    if (!(HEX_REG.test(h) || HHEEXX_REG.test(h)))
        throw new Error("Invalid input HEX color");
    var red = '0', green = '0', blue = '0', alpha = '1';
    // 3 digits
    if (h.length === 4 || h.length === 5) {
        red = "0x" + h[1] + h[1];
        green = "0x" + h[2] + h[2];
        blue = "0x" + h[3] + h[3];
        // 6 digits
    }
    else if (h.length === 7 || h.length === 9) {
        red = "0x" + h[1] + h[2];
        green = "0x" + h[3] + h[4];
        blue = "0x" + h[5] + h[6];
    }
    if (h.length === 5) {
        alpha = "0x" + h[4] + h[4];
        alpha = (+alpha / 255).toFixed(3);
    }
    else if (h.length === 9) {
        alpha = "0x" + h[7] + h[8];
        alpha = (+alpha / 255).toFixed(3);
    }
    if (h.length === 4 || h.length === 7) {
        return [+red, +green, +blue];
    }
    else {
        return [+red, +green, +blue, +alpha];
    }
}

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
function hexToHSL(hex) {
    if (!(HEX_REG.test(hex) || HHEEXX_REG.test(hex)))
        throw new Error("Invalid input HEX color");
    // Convert hex to RGB first
    var r = '0', g = '0', b = '0', a = '1';
    if (hex.length == 4 || hex.length === 5) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    }
    else if (hex.length == 7 || hex.length === 9) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    if (hex.length === 5)
        a = "0x" + hex[4] + hex[4];
    else if (hex.length === 9)
        a = "0x" + hex[7] + hex[8];
    // Then to HSL
    var red = +r / 255, green = +g / 255, blue = +b / 255, alpha = +(+a / 255).toFixed(3);
    var cmin = Math.min(red, green, blue), cmax = Math.max(red, green, blue), delta = cmax - cmin, h = 0, s = 0, l = 0;
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
        return [h, s, l];
    else
        return [h, s, l, alpha];
}

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
function HSLToRGB(h, s, l, a) {
    var hue, saturation, lightness, alpha;
    if (typeof h === 'number') {
        if (!isNumeric(h, s, l, a ? a : 1))
            throw new Error("Invalid input HSL[A] color");
        // Must be fractions of 1
        hue = h;
        saturation = s / 100;
        lightness = l / 100;
        if (a && typeof a === 'number')
            alpha = a;
    }
    else if (typeof h === 'string') {
        if (!(HSL_REG.test(h) || HSLA_REG.test(h)))
            throw new Error("Invalid input HSL[A] color");
        var hsla = formatHSLAToNum(h);
        hue = hsla.hue;
        saturation = hsla.saturation;
        lightness = hsla.lightness;
        if (hsla.alpha != null) {
            alpha = hsla.alpha;
        }
    }
    var primary = (1 - Math.abs(2 * lightness - 1)) * saturation, secondary = primary * (1 - Math.abs((hue / 60) % 2 - 1)), middle = lightness - primary / 2, red = 0, green = 0, blue = 0;
    if (0 <= hue && hue < 60) {
        red = primary;
        green = secondary;
        blue = 0;
    }
    else if (60 <= hue && hue < 120) {
        red = secondary;
        green = primary;
        blue = 0;
    }
    else if (120 <= hue && hue < 180) {
        red = 0;
        green = primary;
        blue = secondary;
    }
    else if (180 <= hue && hue < 240) {
        red = 0;
        green = secondary;
        blue = primary;
    }
    else if (240 <= hue && hue < 300) {
        red = secondary;
        green = 0;
        blue = primary;
    }
    else if (300 <= hue && hue < 360) {
        red = primary;
        green = 0;
        blue = secondary;
    }
    red = Math.round((red + middle) * 255);
    green = Math.round((green + middle) * 255);
    blue = Math.round((blue + middle) * 255);
    if (alpha) {
        return [red, green, blue, alpha];
    }
    return [red, green, blue];
}

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
function HSLToHEX(h, s, l, a) {
    var hue, saturation, lightness, alpha;
    if (typeof h === 'number') {
        if (!isNumeric(h, s, l, a ? a : 1))
            throw new Error("Invalid input HSL[A] color");
        // Must be fractions of 1
        hue = h;
        saturation = s / 100;
        lightness = l / 100;
        if (a && typeof a === 'number')
            alpha = Math.round(a * 255).toString(16);
    }
    else if (typeof h === 'string') {
        if (!(HSL_REG.test(h) || HSLA_REG.test(h)))
            throw new Error("Invalid input HSL[A] color");
        var hsla = formatHSLAToNum(h);
        hue = hsla.hue;
        saturation = hsla.saturation;
        lightness = hsla.lightness;
        if (hsla.alpha != null) {
            alpha = Math.round((hsla.alpha * 255)).toString(16);
        }
    }
    var primary = (1 - Math.abs(2 * lightness - 1)) * saturation, secondary = primary * (1 - Math.abs((hue / 60) % 2 - 1)), middle = lightness - primary / 2, red = 0, green = 0, blue = 0;
    if (0 <= hue && hue < 60) {
        red = primary;
        green = secondary;
        blue = 0;
    }
    else if (60 <= hue && hue < 120) {
        red = secondary;
        green = primary;
        blue = 0;
    }
    else if (120 <= hue && hue < 180) {
        red = 0;
        green = primary;
        blue = secondary;
    }
    else if (180 <= hue && hue < 240) {
        red = 0;
        green = secondary;
        blue = primary;
    }
    else if (240 <= hue && hue < 300) {
        red = secondary;
        green = 0;
        blue = primary;
    }
    else if (300 <= hue && hue < 360) {
        red = primary;
        green = 0;
        blue = secondary;
    }
    red = Math.round((red + middle) * 255).toString(16);
    green = Math.round((green + middle) * 255).toString(16);
    blue = Math.round((blue + middle) * 255).toString(16);
    // 添加 0
    if (red.length == 1)
        red = "0" + red;
    if (green.length == 1)
        green = "0" + green;
    if (blue.length == 1)
        blue = "0" + blue;
    if (alpha) {
        return [red, green, blue, alpha];
    }
    return [red, green, blue];
}

exports.HEXToHSL = hexToHSL;
exports.HEXToRGB = HEXToRGB;
exports.HSLToHEX = HSLToHEX;
exports.HSLToRGB = HSLToRGB;
exports.RGBToHEX = RGBToHex;
exports.RGBToHSL = RGBToHSL;
//# sourceMappingURL=index.js.map
