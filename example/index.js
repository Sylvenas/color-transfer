import { HEXToHSL, HEXToRGB, RGBToHEX, RGBToHSL, HSLToHEX, HSLToRGB } from './dist/index.esm.js'

const RGB = "rgb(0,0,255)",
    RGBA = "rgba(0,0,255,0.5)",
    HEX = "#0000ff",
    HEXA = "#0000ff80",
    HSL = "hsl(240,100%,50%)",
    HSLA = "hsla(240,100%,50%,0.5)";

const arr = "\u2192",
    fns = [
        ["RGB " + arr + " HEX", RGB, RGBToHEX(RGB)],
        ["RGBA " + arr + " HEXA", RGBA, RGBToHEX(RGBA)],
        ["HEX " + arr + " RGB", HEX, HEXToRGB(HEX)],
        ["HEXA " + arr + " RGBA", HEXA, HEXToRGB(HEXA)],
        ["RGB " + arr + " HSL", RGB, RGBToHSL(RGB)],
        ["RGBA " + arr + " HSLA", RGBA, RGBToHSL(RGBA)],
        ["HSL " + arr + " RGB", HSL, HSLToRGB(HSL)],
        ["HSLA " + arr + " RGBA", HSLA, HSLToRGB(HSLA)],
        ["HEX " + arr + " HSL", HEX, HEXToHSL(HEX)],
        ["HEXA " + arr + " HSLA", HEXA, HEXToHSL(HEXA)],
        ["HSL " + arr + " HEX", HSL, HSLToHEX(HSL)],
        ["HSLA " + arr + " HEXA", HSLA, HSLToHEX(HSLA)]
    ];
// table cells
fns.forEach(function (el) {
    let tb = document.querySelector("tbody"),
        tr = document.createElement("tr");

    for (let e in el) {
        let c = document.createElement(+e ? "td" : "th"),
            cTxt = document.createTextNode(el[e]);
        c.appendChild(cTxt);
        tr.appendChild(c);
    }
    tb.appendChild(tr);
});