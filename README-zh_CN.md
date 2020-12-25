# convert-color

[English](./README.md) | 简体中文

支持 `RGB[A]` , `#RGB` , `HSL[A]` 三种格式互转    

`RGB[A]` 与 `HSL[A]` 支持 `逗号`，`百分号`，`/`，`空格` 等多种分隔符，格式较多，总计支持 **50** 种格式互转，支持转换如下：

![convert](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/5423051457/1526/5e24/bb06/4f5e0666331b5d13e2b0974cdec4d599.png)

## 使用方法
### install
``` sh
npm i color-transfer
```

### 使用
``` js
import { HEXToHSL, HEXToRGB, RGBToHEX, RGBToHSL, HSLToHEX, HSLToRGB } from 'color-transfer'

HEXToRGB('#f36') // => [255, 51, 102]
RGBToHSL('rgba(100% 0% 60% / 0.4)') // => [324, 100, 50, 0.4]

// ...
```

## HEX
### HEX to RGB[A]
* #rgb => rgb(r,g,b)
* #rgba => rgb(r,g,b,a)

* #rrggbb => rgb(r,g,b)
* #rrggbbaa => rgba(r,g,b,a)
### HEX to HSL[A]
* #rgb => hsl(h,s%,l%)
* #rgba => hsl(h,s%,l%,a)

* #rrggbb => hsl(h,s%,l%)
* #rrggbbaa => hsl(h,s%,l%,a)

## RGB[A]
### RGB[A] to HEX
* (r,g,b) => #rgb
* (r,g,b,a) => #rrggbbaa

* rgb(r,g,b) => #rgb
* rgba(r,g,b,a) => #rgba

* rgba(r g b) => #rgb
* rgba(r g b / a) => #rgba

* rgb(r%,g%,b%) => #rgb
* rgba(r%,g%,b%,a) => #rgba
* rgba(r%,g%,b%,%a) => #rgba

* rgb(r% g% b%) => #rgb
* rgba(r% g% b% / a%) => #rgba

### RGB[A] to HSL[A]
* (r,g,b) => hsl(h,s%,l%)
* (r,g,b,a) => hsl(h,s%,l%,a)

* rgb(r,g,b) => hsl(h,s%,l%)
* rgba(r,g,b,a) => hsl(h,s%,l%,a)

* rgba(r g b) => hsl(h,s%,l%)
* rgba(r g b / a) => hsl(h,s%,l%,a)

* rgb(r%,g%,b%) => hsl(h,s%,l%)
* rgb(r%,g%,b%,%a) => hsl(h,s%,l%,a)

* rgb(r% g% b%) => hsl(h,s%,l%)
* rgba(r% g% b% / a%) => hsl(h,s%,l%,a)

* rgb(r%,g%,b%,a) => hsl(h,s%,l%,a)

## HSL[A]
### HSL[A] to HEX
* (h,s%,l%) => #rgb
* (h,s%,l%,a) => #rgba

* hsl(h,s%,l%) => #rgb
* (h,s%,l%,a) => #rgba

* hsl(h s% l%) => #rgb

* hsl(hdeg,s%,l%) => #rgb
* hsl(hrad,s%,l%) => #rgb
* hsl(hturn,s%,l%) => #rgb

* hsla(h s% l% / a) => #rgba
* hsla(h s% l% / a%) => #rgba 

### HSL[A] to RGB[A]
* (h,s,l) => rgb(r,g,b)
* (h,s,l,a) => rgb(r,g,b,a)

* hsl(h,s,l) => rgb(r,g,b)
* (h,s,l,a) => rgb(r,g,b,a)

* hsl(h s l) => rgb(r,g,b)

* hsl(hdeg,s,l) => rgb(r,g,b)
* hsl(hrad,s,l) => rgb(r,g,b)
* hsl(hturn,s,l) => rgb(r,g,b)

* hsla(h s l / a) => rgb(r,g,b,a)rgb(r,g,b,a)
* hsla(h s l / a%) => rgb(r,g,b,a)

### 开发与测试
* 📦 打包
``` 
npm i
npm run build
```
* 单元测试
```
npm run test
```
## 单元测试
50种类型转换全部经过单元测试，单元测试代码覆盖率**100%**
![单元测试](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/5145843442/827c/41aa/b619/632d70a18a6c35e469c1497074453aa8.png)
## TODO
- 添加正则表达式校验输入合法