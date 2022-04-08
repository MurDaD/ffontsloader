/**
 * Originally created by Bram Stein <https://github.com/bramstein>
 * Converted to typescript by Max Shakhbazov <https://github.com/MurDaD>
 *
 * Source: https://github.com/typekit/webfontloader/blob/master/src/modules/google/fontapiparser.js
 */
import { Font } from '../index';
export declare class FontParser {
    private fontFamilies_;
    private parsedFonts_;
    private fontTestStrings_;
    private INT_FONTS;
    private WEIGHTS;
    private STYLES;
    private VARIATION_MATCH;
    /**
     * @constructor
     */
    constructor(fontFamilies: string[]);
    parse(): void;
    private generateFontVariationDescription_;
    private normalizeStyle_;
    private normalizeWeight_;
    private parseVariations_;
    parseSubsets_(subsets: any): any;
    getFonts(): Font[];
    getFontTestStrings(): any;
}
