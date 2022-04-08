import { Font, FontFamilies, FontLoader, ParsedFont } from '../../';
export declare class GoogleLoader implements FontLoader {
    private fonts_;
    private uri_;
    constructor(fonts: FontFamilies);
    /**
     * Returns google uri to get all the fonts
     */
    getUris(): string[];
    /**
     * Return all google font's that should be loaded
     */
    getFonts(): Font[];
    /**
     * Returns ParsedFont array for native font loading
     */
    getParsedFonts(): Promise<ParsedFont[]>;
    /**
     * Generates google font api url from given array of fonts
     */
    private generateUri_;
}
