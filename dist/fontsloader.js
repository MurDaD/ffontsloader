/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FontsLoader", [], factory);
	else if(typeof exports === 'object')
		exports["FontsLoader"] = factory();
	else
		root["FontsLoader"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fontsloader.ts":
/*!****************************!*\
  !*** ./src/fontsloader.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"load\": () => (/* binding */ load)\n/* harmony export */ });\n/* harmony import */ var _modules_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/google */ \"./src/modules/google/index.ts\");\n/* harmony import */ var _modules_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/custom */ \"./src/modules/custom/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _utils_watcher_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/watcher/watcher */ \"./src/utils/watcher/watcher.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\nconst DEFAULT_CONFIG = {\r\n    events: false,\r\n    classes: false,\r\n    timeout: 3000,\r\n};\r\n/**\r\n * Main function that loads all the fonts to <link /> tag\r\n * @param fontsLoaderConfig\r\n */\r\nconst load = (fontsLoaderConfig) => __awaiter(void 0, void 0, void 0, function* () {\r\n    const config = Object.assign(Object.assign({}, DEFAULT_CONFIG), fontsLoaderConfig);\r\n    const watcher = new _utils_watcher_watcher__WEBPACK_IMPORTED_MODULE_3__.Watcher(config.timeout);\r\n    if (config.classes || config.events) {\r\n        new _utils__WEBPACK_IMPORTED_MODULE_2__.EventBus(config);\r\n    }\r\n    if (config.google) {\r\n        const googleLoader = new _modules_google__WEBPACK_IMPORTED_MODULE_0__.GoogleLoader(config.google);\r\n        if (config.google.load === 'native') {\r\n            yield loadFontToBrowser_(yield googleLoader.getParsedFonts());\r\n        }\r\n        else {\r\n            googleLoader.getUris().forEach(addLinkElement_);\r\n        }\r\n        googleLoader.getFonts().forEach((font) => {\r\n            var _a;\r\n            watcher.add(font, ((_a = config.google) === null || _a === void 0 ? void 0 : _a.load) || 'link');\r\n        });\r\n    }\r\n    if (config.custom) {\r\n        const customLoader = new _modules_custom__WEBPACK_IMPORTED_MODULE_1__.CustomLoader(config.custom);\r\n        // TODO: implement native loader\r\n        customLoader.getUris().forEach(addLinkElement_);\r\n        customLoader.getFonts().forEach((font) => {\r\n            watcher.add(font, 'link');\r\n        });\r\n    }\r\n    if (config.classes || config.events) {\r\n        watcher.watchFonts();\r\n    }\r\n});\r\n/**\r\n * Native fonts to browser insert\r\n * @param fonts\r\n */\r\nconst loadFontToBrowser_ = (fonts) => __awaiter(void 0, void 0, void 0, function* () {\r\n    for (const font of fonts) {\r\n        const fontFace = yield new FontFace(font.fontFamily, font.src, {\r\n            style: font.fontStyle,\r\n            unicodeRange: font.unicodeRange,\r\n            weight: font.fontWeight,\r\n        }).load();\r\n        document.fonts.add(fontFace);\r\n    }\r\n});\r\n/**\r\n * Creates new <link rel=\"stylesheet\" /> with given href and async if needed\r\n * @param href\r\n */\r\nconst addLinkElement_ = (href) => {\r\n    const link = document.createElement('link');\r\n    link.rel = 'stylesheet';\r\n    link.href = href;\r\n    link.media = 'all';\r\n    document.head.appendChild(link);\r\n};\r\n\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/fontsloader.ts?");

/***/ }),

/***/ "./src/modules/custom/customLoader.ts":
/*!********************************************!*\
  !*** ./src/modules/custom/customLoader.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CustomLoader\": () => (/* binding */ CustomLoader)\n/* harmony export */ });\nclass CustomLoader {\r\n    constructor(config) {\r\n        this.fonts_ = [];\r\n        this.families_ = [];\r\n        this.uris_ = config.urls;\r\n        this.parseFamilyConfig_(config.families);\r\n    }\r\n    /**\r\n     * Returns parsed uris strings\r\n     */\r\n    getUris() {\r\n        return this.uris_ || [];\r\n    }\r\n    /**\r\n     * Return all font's that should be loaded\r\n     */\r\n    getFonts() {\r\n        return this.fonts_;\r\n    }\r\n    /**\r\n     * Returns font object array\r\n     */\r\n    getParsedFonts() {\r\n        // TODO: implement with native font loader\r\n        return [];\r\n    }\r\n    /**\r\n     * Parsing config to separate string and object families\r\n     * @param families\r\n     * @private\r\n     */\r\n    parseFamilyConfig_(families) {\r\n        families.forEach((family) => {\r\n            var _a, _b;\r\n            if (typeof family !== 'string') {\r\n                this.fonts_.push({ family: family.name, variation: 'n4' });\r\n                (_a = this.uris_) === null || _a === void 0 ? void 0 : _a.push(family.url);\r\n            }\r\n            else {\r\n                const font = family.split(':');\r\n                const fontName = font[0];\r\n                let fontVariants = (_b = font[1]) === null || _b === void 0 ? void 0 : _b.split(',');\r\n                if (!fontVariants || fontVariants.length < 1) {\r\n                    fontVariants = ['n4'];\r\n                }\r\n                fontVariants.forEach((fontVariant) => {\r\n                    this.fonts_.push({\r\n                        family: fontName,\r\n                        variation: fontVariant,\r\n                    });\r\n                });\r\n            }\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/modules/custom/customLoader.ts?");

/***/ }),

/***/ "./src/modules/custom/index.ts":
/*!*************************************!*\
  !*** ./src/modules/custom/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CustomLoader\": () => (/* reexport safe */ _customLoader__WEBPACK_IMPORTED_MODULE_0__.CustomLoader)\n/* harmony export */ });\n/* harmony import */ var _customLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customLoader */ \"./src/modules/custom/customLoader.ts\");\n\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/modules/custom/index.ts?");

/***/ }),

/***/ "./src/modules/google/googleFontApi.ts":
/*!*********************************************!*\
  !*** ./src/modules/google/googleFontApi.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GoogleFontApi\": () => (/* binding */ GoogleFontApi)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\n\r\nclass GoogleFontApi {\r\n    /**\r\n     * @param fonts\r\n     * @param version\r\n     */\r\n    constructor(fonts, version = 1) {\r\n        this.apiUrl_ = 'https://fonts.googleapis.com/css';\r\n        this.fonts_ = fonts;\r\n        this.version_ = version;\r\n    }\r\n    /**\r\n     * Builds font googleapis url from given fonts in constructor\r\n     * @return string\r\n     */\r\n    buildUri() {\r\n        const fontApiParser = new _utils__WEBPACK_IMPORTED_MODULE_0__.FontParser(this.fonts_);\r\n        fontApiParser.parse();\r\n        const request = fontApiParser.getFonts().map((font) => {\r\n            const fontString = `${font.family}:${font.variation}`;\r\n            return fontString.replace(/\\s/g, '+');\r\n        });\r\n        const requestString = request.join('|');\r\n        return `${this.apiUrl_}?family=${requestString}`;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/modules/google/googleFontApi.ts?");

/***/ }),

/***/ "./src/modules/google/googleLoader.ts":
/*!********************************************!*\
  !*** ./src/modules/google/googleLoader.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GoogleLoader\": () => (/* binding */ GoogleLoader)\n/* harmony export */ });\n/* harmony import */ var _googleFontApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./googleFontApi */ \"./src/modules/google/googleFontApi.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ \"./src/utils/index.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nclass GoogleLoader {\r\n    constructor(fonts) {\r\n        this.fonts_ = fonts;\r\n        this.generateUri_();\r\n    }\r\n    /**\r\n     * Returns google uri to get all the fonts\r\n     */\r\n    getUris() {\r\n        return this.uri_ ? [this.uri_] : [];\r\n    }\r\n    /**\r\n     * Return all google font's that should be loaded\r\n     */\r\n    getFonts() {\r\n        const fontApiParser = new _utils__WEBPACK_IMPORTED_MODULE_1__.FontParser(this.fonts_.families);\r\n        fontApiParser.parse();\r\n        return fontApiParser.getFonts();\r\n    }\r\n    /**\r\n     * Returns ParsedFont array for native font loading\r\n     */\r\n    getParsedFonts() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!this.uri_) {\r\n                throw new Error('No uri provided. Nothing to parse.');\r\n            }\r\n            const fontResponse = yield fetch(this.uri_).then((response) => response.text());\r\n            const cssParser = new _utils__WEBPACK_IMPORTED_MODULE_1__.CssParser(fontResponse);\r\n            cssParser.parseCSS();\r\n            return cssParser.getParsedFonts();\r\n        });\r\n    }\r\n    /**\r\n     * Generates google font api url from given array of fonts\r\n     */\r\n    generateUri_() {\r\n        const googleFontApi = new _googleFontApi__WEBPACK_IMPORTED_MODULE_0__.GoogleFontApi(this.fonts_.families);\r\n        this.uri_ = googleFontApi.buildUri();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/modules/google/googleLoader.ts?");

/***/ }),

/***/ "./src/modules/google/index.ts":
/*!*************************************!*\
  !*** ./src/modules/google/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GoogleLoader\": () => (/* reexport safe */ _googleLoader__WEBPACK_IMPORTED_MODULE_0__.GoogleLoader)\n/* harmony export */ });\n/* harmony import */ var _googleLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./googleLoader */ \"./src/modules/google/googleLoader.ts\");\n\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/modules/google/index.ts?");

/***/ }),

/***/ "./src/utils/cssParser.ts":
/*!********************************!*\
  !*** ./src/utils/cssParser.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CssParser\": () => (/* binding */ CssParser)\n/* harmony export */ });\nclass CssParser {\r\n    constructor(fontFaceResponseText) {\r\n        this.rules_ = [];\r\n        this.css_ = fontFaceResponseText;\r\n    }\r\n    /**\r\n     * Returns ParsedFont array of parsed CSS\r\n     */\r\n    getParsedFonts() {\r\n        return this.rules_;\r\n    }\r\n    /**\r\n     * Parses CSS into array of ParsedFont object\r\n     */\r\n    parseCSS() {\r\n        this.css_ = this.removeNewLines_(this.css_);\r\n        const blocks = this.css_.split('}');\r\n        blocks.pop();\r\n        blocks.forEach((block) => {\r\n            const pair = block.split('{');\r\n            const parsed = this.parseCSSBlock_(pair[1]);\r\n            this.rules_.push({\r\n                fontFamily: parsed['font-family'],\r\n                fontStyle: parsed['font-style'],\r\n                fontWeight: parsed['font-weight'],\r\n                src: parsed.src,\r\n                unicodeRange: parsed['unicode-range'],\r\n            });\r\n        });\r\n    }\r\n    /**\r\n     * Parsing css block\r\n     * @param css\r\n     * @private\r\n     */\r\n    parseCSSBlock_(css) {\r\n        const rule = {};\r\n        const declarations = css.split(';');\r\n        declarations.pop();\r\n        declarations.forEach((declaration) => {\r\n            const loc = declaration.indexOf(':');\r\n            const property = declaration.substring(0, loc).trim();\r\n            let value = declaration.substring(loc + 1).trim();\r\n            if (value[0] === \"'\" && value[value.length - 1] === \"'\") {\r\n                value = value.replace(/'/g, '');\r\n            }\r\n            if (property != '' && value != '')\r\n                rule[property] = value;\r\n        });\r\n        return rule;\r\n    }\r\n    /**\r\n     * Removes all empty lines from CSS\r\n     * @param css\r\n     * @private\r\n     */\r\n    removeNewLines_(css) {\r\n        return css.replace(/\\n/g, '');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/cssParser.ts?");

/***/ }),

/***/ "./src/utils/eventBus.ts":
/*!*******************************!*\
  !*** ./src/utils/eventBus.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventBus\": () => (/* binding */ EventBus),\n/* harmony export */   \"FontEvents\": () => (/* binding */ FontEvents)\n/* harmony export */ });\nvar FontEvents;\r\n(function (FontEvents) {\r\n    FontEvents[\"LOADING\"] = \"loading\";\r\n    FontEvents[\"ACTIVE\"] = \"active\";\r\n    FontEvents[\"INACTIVE\"] = \"inactive\";\r\n    FontEvents[\"FONT_LOADING\"] = \"fontloading\";\r\n    FontEvents[\"FONT_ACTIVE\"] = \"fontactive\";\r\n    FontEvents[\"FONT_INACTIVE\"] = \"fontinactive\";\r\n})(FontEvents || (FontEvents = {}));\r\nclass EventBus {\r\n    constructor(config) {\r\n        this.namespace_ = 'wf';\r\n        this.classSeparator_ = '-';\r\n        this.config_ = config;\r\n        this.event_ = document.createEvent('CustomEvent');\r\n        this.htmlElement_ = document.documentElement;\r\n        document.addEventListener(FontEvents.LOADING, () => {\r\n            this.handleLoading_();\r\n        }, false);\r\n        document.addEventListener(FontEvents.ACTIVE, () => {\r\n            this.handleActive_();\r\n        }, false);\r\n        document.addEventListener(FontEvents.INACTIVE, () => {\r\n            this.handleInactive_();\r\n        }, false);\r\n        document.addEventListener(FontEvents.FONT_LOADING, (event) => {\r\n            const { detail } = event;\r\n            this.handleFontLoading_(detail);\r\n        }, false);\r\n        document.addEventListener(FontEvents.FONT_ACTIVE, (event) => {\r\n            const { detail } = event;\r\n            this.handleFontActive_(detail);\r\n        }, false);\r\n        document.addEventListener(FontEvents.FONT_INACTIVE, (event) => {\r\n            const { detail } = event;\r\n            this.handleFontInactive_(detail);\r\n        }, false);\r\n    }\r\n    handleLoading_() {\r\n        if (this.config_.events && this.config_.loading) {\r\n            this.config_.loading.call(null);\r\n            this.addClassToHtml_(FontEvents.LOADING);\r\n            this.removeClassFromHtml_(FontEvents.ACTIVE);\r\n            this.removeClassFromHtml_(FontEvents.INACTIVE);\r\n        }\r\n    }\r\n    handleActive_() {\r\n        if (this.config_.events && this.config_.active) {\r\n            this.config_.active.call(null);\r\n            this.removeClassFromHtml_(FontEvents.LOADING);\r\n            this.addClassToHtml_(FontEvents.ACTIVE);\r\n            this.removeClassFromHtml_(FontEvents.INACTIVE);\r\n        }\r\n    }\r\n    handleInactive_() {\r\n        if (this.config_.events && this.config_.inactive) {\r\n            this.config_.inactive.call(null);\r\n            this.removeClassFromHtml_(FontEvents.LOADING);\r\n            this.removeClassFromHtml_(FontEvents.ACTIVE);\r\n            this.addClassToHtml_(FontEvents.INACTIVE);\r\n        }\r\n    }\r\n    handleFontLoading_(font) {\r\n        if (this.config_.events && this.config_.fontloading) {\r\n            const fontArray = font.split(':');\r\n            this.config_.fontloading.call(null, fontArray[0], fontArray[1]);\r\n            this.addClassToHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);\r\n            this.removeClassFromHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);\r\n            this.removeClassFromHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);\r\n        }\r\n    }\r\n    handleFontActive_(font) {\r\n        if (this.config_.events && this.config_.fontactive) {\r\n            const fontArray = font.split(':');\r\n            this.config_.fontactive.call(null, fontArray[0], fontArray[1]);\r\n            this.removeClassFromHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);\r\n            this.addClassToHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);\r\n            this.removeClassFromHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);\r\n        }\r\n    }\r\n    handleFontInactive_(font) {\r\n        if (this.config_.events && this.config_.fontinactive) {\r\n            const fontArray = font.split(':');\r\n            this.config_.fontinactive.call(null, fontArray[0], fontArray[1]);\r\n            this.removeClassFromHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);\r\n            this.removeClassFromHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);\r\n            this.addClassToHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);\r\n        }\r\n    }\r\n    addClassToHtml_(className, prefix = []) {\r\n        this.htmlElement_.classList.add([this.namespace_].concat(prefix.map(this.sanitizeClassName_), className).join(this.classSeparator_));\r\n    }\r\n    removeClassFromHtml_(className, prefix = []) {\r\n        this.htmlElement_.classList.remove([this.namespace_].concat(prefix.map(this.sanitizeClassName_), className).join(this.classSeparator_));\r\n    }\r\n    sanitizeClassName_(className) {\r\n        return className.replace(/[\\W_]+/g, '').toLowerCase();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/eventBus.ts?");

/***/ }),

/***/ "./src/utils/fontParser.ts":
/*!*********************************!*\
  !*** ./src/utils/fontParser.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FontParser\": () => (/* binding */ FontParser)\n/* harmony export */ });\n/**\r\n * Originally created by Bram Stein <https://github.com/bramstein>\r\n * Converted to typescript by Max Shakhbazov <https://github.com/MurDaD>\r\n *\r\n * Source: https://github.com/typekit/webfontloader/blob/master/src/modules/google/fontapiparser.js\r\n */\r\nclass FontParser {\r\n    /**\r\n     * @constructor\r\n     */\r\n    constructor(fontFamilies) {\r\n        this.INT_FONTS = {\r\n            latin: 'BESbswy',\r\n            'latin-ext': '\\u00E7\\u00F6\\u00FC\\u011F\\u015F',\r\n            cyrillic: '\\u0439\\u044f\\u0416',\r\n            greek: '\\u03b1\\u03b2\\u03a3',\r\n            khmer: '\\u1780\\u1781\\u1782',\r\n            Hanuman: '\\u1780\\u1781\\u1782', // For backward compatibility\r\n        };\r\n        this.WEIGHTS = {\r\n            thin: '1',\r\n            extralight: '2',\r\n            'extra-light': '2',\r\n            ultralight: '2',\r\n            'ultra-light': '2',\r\n            light: '3',\r\n            regular: '4',\r\n            book: '4',\r\n            medium: '5',\r\n            'semi-bold': '6',\r\n            semibold: '6',\r\n            'demi-bold': '6',\r\n            demibold: '6',\r\n            bold: '7',\r\n            'extra-bold': '8',\r\n            extrabold: '8',\r\n            'ultra-bold': '8',\r\n            ultrabold: '8',\r\n            black: '9',\r\n            heavy: '9',\r\n            l: '3',\r\n            r: '4',\r\n            b: '7',\r\n        };\r\n        this.STYLES = {\r\n            i: 'i',\r\n            italic: 'i',\r\n            n: 'n',\r\n            normal: 'n',\r\n        };\r\n        this.VARIATION_MATCH = new RegExp('^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|' +\r\n            '(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i' +\r\n            '|normal|italic)?$');\r\n        this.fontFamilies_ = fontFamilies;\r\n        this.parsedFonts_ = [];\r\n        this.fontTestStrings_ = {};\r\n    }\r\n    parse() {\r\n        const length = this.fontFamilies_.length;\r\n        for (let i = 0; i < length; i++) {\r\n            const elements = this.fontFamilies_[i].split(':');\r\n            const fontFamily = elements[0].replace(/\\+/g, ' ');\r\n            let variations = ['n4'];\r\n            if (elements.length >= 2) {\r\n                const fvds = this.parseVariations_(elements[1]);\r\n                if (fvds.length > 0) {\r\n                    variations = fvds;\r\n                }\r\n                if (elements.length == 3) {\r\n                    const subsets = this.parseSubsets_(elements[2]);\r\n                    if (subsets.length > 0) {\r\n                        const fontTestString = this.INT_FONTS[subsets[0]];\r\n                        if (fontTestString) {\r\n                            this.fontTestStrings_[fontFamily] = fontTestString;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            // For backward compatibility\r\n            if (!this.fontTestStrings_[fontFamily]) {\r\n                const hanumanTestString = this.INT_FONTS[fontFamily];\r\n                if (hanumanTestString) {\r\n                    this.fontTestStrings_[fontFamily] = hanumanTestString;\r\n                }\r\n            }\r\n            for (let j = 0; j < variations.length; j += 1) {\r\n                this.parsedFonts_.push({\r\n                    family: fontFamily,\r\n                    variation: variations[j],\r\n                });\r\n            }\r\n        }\r\n    }\r\n    generateFontVariationDescription_(variation) {\r\n        if (!variation.match(/^[\\w-]+$/)) {\r\n            return '';\r\n        }\r\n        const normalizedVariation = variation.toLowerCase();\r\n        const groups = this.VARIATION_MATCH.exec(normalizedVariation);\r\n        if (groups == null) {\r\n            return '';\r\n        }\r\n        const styleMatch = this.normalizeStyle_(groups[2]);\r\n        const weightMatch = this.normalizeWeight_(groups[1]);\r\n        return [styleMatch, weightMatch].join('');\r\n    }\r\n    normalizeStyle_(parsedStyle) {\r\n        if (parsedStyle == null || parsedStyle == '') {\r\n            return 'n';\r\n        }\r\n        return this.STYLES[parsedStyle];\r\n    }\r\n    normalizeWeight_(parsedWeight) {\r\n        if (parsedWeight == null || parsedWeight == '') {\r\n            return '4';\r\n        }\r\n        const weight = this.WEIGHTS[parsedWeight];\r\n        if (weight) {\r\n            return weight;\r\n        }\r\n        if (isNaN(parsedWeight)) {\r\n            return '4';\r\n        }\r\n        return parsedWeight.substr(0, 1);\r\n    }\r\n    parseVariations_(variations) {\r\n        const finalVariations = [];\r\n        if (!variations) {\r\n            return finalVariations;\r\n        }\r\n        const providedVariations = variations.split(',');\r\n        const length = providedVariations.length;\r\n        for (let i = 0; i < length; i++) {\r\n            const variation = providedVariations[i];\r\n            const fvd = this.generateFontVariationDescription_(variation);\r\n            if (fvd) {\r\n                finalVariations.push(fvd);\r\n            }\r\n        }\r\n        return finalVariations;\r\n    }\r\n    parseSubsets_(subsets) {\r\n        const finalSubsets = [];\r\n        if (!subsets) {\r\n            return finalSubsets;\r\n        }\r\n        return subsets.split(',');\r\n    }\r\n    getFonts() {\r\n        return this.parsedFonts_;\r\n    }\r\n    getFontTestStrings() {\r\n        return this.fontTestStrings_;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/fontParser.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CssParser\": () => (/* reexport safe */ _cssParser__WEBPACK_IMPORTED_MODULE_1__.CssParser),\n/* harmony export */   \"EventBus\": () => (/* reexport safe */ _eventBus__WEBPACK_IMPORTED_MODULE_0__.EventBus),\n/* harmony export */   \"FontEvents\": () => (/* reexport safe */ _eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents),\n/* harmony export */   \"FontParser\": () => (/* reexport safe */ _fontParser__WEBPACK_IMPORTED_MODULE_2__.FontParser),\n/* harmony export */   \"FontWatcher\": () => (/* reexport safe */ _watcher__WEBPACK_IMPORTED_MODULE_3__.FontWatcher),\n/* harmony export */   \"Watcher\": () => (/* reexport safe */ _watcher__WEBPACK_IMPORTED_MODULE_3__.Watcher)\n/* harmony export */ });\n/* harmony import */ var _eventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventBus */ \"./src/utils/eventBus.ts\");\n/* harmony import */ var _cssParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cssParser */ \"./src/utils/cssParser.ts\");\n/* harmony import */ var _fontParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fontParser */ \"./src/utils/fontParser.ts\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./watcher */ \"./src/utils/watcher/index.ts\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/watcher/fontWatcher.ts":
/*!******************************************!*\
  !*** ./src/utils/watcher/fontWatcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FontWatcher\": () => (/* binding */ FontWatcher)\n/* harmony export */ });\n/* harmony import */ var _eventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventBus */ \"./src/utils/eventBus.ts\");\n\r\nclass FontWatcher {\r\n    constructor(font, load) {\r\n        this.font_ = font;\r\n        this.load_ = load;\r\n        this.loading_();\r\n    }\r\n    loading_() {\r\n        document.dispatchEvent(new CustomEvent(_eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.FONT_LOADING, { detail: `${this.font_.family}:${this.font_.variation}` }));\r\n    }\r\n    getFont() {\r\n        return this.font_;\r\n    }\r\n    watch() {\r\n        return document.fonts.check(`16px ${this.font_.family}`, 'BESbswy');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/watcher/fontWatcher.ts?");

/***/ }),

/***/ "./src/utils/watcher/index.ts":
/*!************************************!*\
  !*** ./src/utils/watcher/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FontWatcher\": () => (/* reexport safe */ _fontWatcher__WEBPACK_IMPORTED_MODULE_0__.FontWatcher),\n/* harmony export */   \"Watcher\": () => (/* reexport safe */ _watcher__WEBPACK_IMPORTED_MODULE_1__.Watcher)\n/* harmony export */ });\n/* harmony import */ var _fontWatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fontWatcher */ \"./src/utils/watcher/fontWatcher.ts\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher */ \"./src/utils/watcher/watcher.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/watcher/index.ts?");

/***/ }),

/***/ "./src/utils/watcher/watcher.ts":
/*!**************************************!*\
  !*** ./src/utils/watcher/watcher.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Watcher\": () => (/* binding */ Watcher)\n/* harmony export */ });\n/* harmony import */ var _eventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventBus */ \"./src/utils/eventBus.ts\");\n/* harmony import */ var _fontWatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fontWatcher */ \"./src/utils/watcher/fontWatcher.ts\");\n\r\n\r\nclass Watcher {\r\n    constructor(timeout) {\r\n        this.fontWatchers_ = [];\r\n        this.timeout = timeout;\r\n    }\r\n    add(font, load) {\r\n        this.fontWatchers_.push(new _fontWatcher__WEBPACK_IMPORTED_MODULE_1__.FontWatcher(font, load));\r\n    }\r\n    watchFonts() {\r\n        document.dispatchEvent(new CustomEvent(_eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.LOADING, {}));\r\n        setTimeout(() => {\r\n            let atLeastOneLoaded = false;\r\n            this.fontWatchers_.forEach((fontWatcher) => {\r\n                const loaded = fontWatcher.watch();\r\n                const font = fontWatcher.getFont();\r\n                if (loaded) {\r\n                    atLeastOneLoaded = true;\r\n                }\r\n                document.dispatchEvent(new CustomEvent(loaded ? _eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.FONT_ACTIVE : _eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.FONT_INACTIVE, {\r\n                    detail: `${font.family}:${font.variation}`,\r\n                }));\r\n            });\r\n            document.dispatchEvent(new CustomEvent(atLeastOneLoaded ? _eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.ACTIVE : _eventBus__WEBPACK_IMPORTED_MODULE_0__.FontEvents.INACTIVE, {}));\r\n        }, this.timeout);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://FontsLoader/./src/utils/watcher/watcher.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/fontsloader.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});