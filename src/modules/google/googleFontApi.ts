import { FontParser } from '../../utils';

export class GoogleFontApi {
  private apiUrl_ = 'https://fonts.googleapis.com/css';
  // TODO: implement google v2 api query
  // private apiUrlV2_ = 'https://fonts.googleapis.com/css2';
  private fonts_: string[];
  private version_: 1 | 2;

  /**
   * @param fonts
   * @param version
   */
  constructor(fonts: string[], version: 1 | 2 = 1) {
    this.fonts_ = fonts;
    this.version_ = version;
  }

  /**
   * Builds font googleapis url from given fonts in constructor
   * @return string
   */
  public buildUri(): string {
    const fontApiParser = new FontParser(this.fonts_);
    fontApiParser.parse();
    const request = fontApiParser.getFonts().map((font) => {
      const fontString = `${font.family}:${font.variation}`;
      return fontString.replace(/\s/g, '+');
    });
    const requestString: string = request.join('|');
    return `${this.apiUrl_}?family=${requestString}`;
  }
}
