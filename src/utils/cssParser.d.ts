import { ParsedFont } from '../index';
export declare class CssParser {
    private css_;
    private rules_;
    constructor(fontFaceResponseText: string);
    /**
     * Returns ParsedFont array of parsed CSS
     */
    getParsedFonts(): ParsedFont[];
    /**
     * Parses CSS into array of ParsedFont object
     */
    parseCSS(): void;
    /**
     * Parsing css block
     * @param css
     * @private
     */
    private parseCSSBlock_;
    /**
     * Removes all empty lines from CSS
     * @param css
     * @private
     */
    private removeNewLines_;
}
