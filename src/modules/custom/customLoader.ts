import { CustomFamilies, CustomFamily, Font, FontLoader, ParsedFont } from '../../';

export class CustomLoader implements FontLoader {
  private readonly fonts_: Font[];
  private readonly uris_: string[];

  constructor(config: CustomFamilies) {
    this.fonts_ = [];
    this.uris_ = config.urls || [];
    this.parseFamilyConfig_(config.families);
  }

  /**
   * Returns parsed uris strings
   */
  getUris(): string[] {
    return this.uris_ || [];
  }

  /**
   * Return all font's that should be loaded
   */
  getFonts(): Font[] {
    return this.fonts_;
  }

  /**
   * Returns font object array
   */
  getParsedFonts(): ParsedFont[] {
    // TODO: implement with native font loader
    return [];
  }

  /**
   * Parsing config to separate string and object families
   * @param families
   * @private
   */
  private parseFamilyConfig_(families: (string | CustomFamily)[]): void {
    families.forEach((family) => {
      if (typeof family !== 'string') {
        this.fonts_.push({ family: family.name, variation: 'n4'});
        this.uris_?.push(family.url);
      } else {
        const font = family.split(':');
        const fontName = font[0];
        let fontVariants = font[1]?.split(',');
        if (!fontVariants || fontVariants.length < 1) {
          fontVariants = ['n4'];
        }
        fontVariants.forEach((fontVariant) => {
          this.fonts_.push({
            family: fontName,
            variation: fontVariant,
          });
        });
      }
    });
  }
}
