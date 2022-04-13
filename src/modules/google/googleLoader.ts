import { Font, FontFamilies, FontLoader, ParsedFont } from '../../';
import { GoogleFontApi } from './googleFontApi';
import { CssParser, FontParser } from '../../utils';

export class GoogleLoader implements FontLoader {
  private fonts_: FontFamilies;
  private uri_: string | undefined;

  constructor(fonts: FontFamilies) {
    this.fonts_ = fonts;
    this.generateUri_();
  }

  /**
   * Returns google uri to get all the fonts
   */
  public getUris(): string[] {
    return this.uri_ ? [this.uri_] : [];
  }

  /**
   * Return all google font's that should be loaded
   */
  public getFonts(): Font[] {
    const fontApiParser = new FontParser(this.fonts_.families);
    fontApiParser.parse();
    return fontApiParser.getFonts();
  }

  /**
   * Returns ParsedFont array for native font loading
   */
  public async getParsedFonts(): Promise<ParsedFont[]> {
    if (!this.uri_) {
      throw new Error('No uri provided. Nothing to parse.');
    }
    const fontResponse = await fetch(this.uri_).then((response) => response.text());
    const cssParser = new CssParser(fontResponse);
    cssParser.parseCSS();
    return cssParser.getParsedFonts();
  }

  /**
   * Generates google font api url from given array of fonts
   */
  private generateUri_(): void {
    const googleFontApi = new GoogleFontApi(this.fonts_.families);
    this.uri_ = googleFontApi.buildUri();
  }
}
