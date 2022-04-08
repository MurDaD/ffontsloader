import { CustomFamilies, CustomFamily, Font, FontLoader, ParsedFont } from '../../index';

export class CustomLoader implements FontLoader {
  private readonly fonts_: Font[];
  private readonly families_: CustomFamily[];
  private readonly uris_: string[] | undefined;

  constructor(config: CustomFamilies) {
    this.fonts_ = [];
    this.families_ = [];
    this.parseFamilyConfig_(config.families);
    this.uris_ = config.urls;
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
        this.families_.push(family);
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
