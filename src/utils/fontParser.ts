/**
 * Originally created by Bram Stein <https://github.com/bramstein>
 * Converted to typescript by Max Shakhbazov <https://github.com/MurDaD>
 *
 * Source: https://github.com/typekit/webfontloader/blob/master/src/modules/google/fontapiparser.js
 */

import { Font } from '../index';

export class FontParser {
  private fontFamilies_: string[];
  private parsedFonts_: Font[];
  private fontTestStrings_;

  private INT_FONTS = {
    latin: 'BESbswy',
    'latin-ext': '\u00E7\u00F6\u00FC\u011F\u015F',
    cyrillic: '\u0439\u044f\u0416',
    greek: '\u03b1\u03b2\u03a3',
    khmer: '\u1780\u1781\u1782',
    Hanuman: '\u1780\u1781\u1782', // For backward compatibility
  };
  private WEIGHTS = {
    thin: '1',
    extralight: '2',
    'extra-light': '2',
    ultralight: '2',
    'ultra-light': '2',
    light: '3',
    regular: '4',
    book: '4',
    medium: '5',
    'semi-bold': '6',
    semibold: '6',
    'demi-bold': '6',
    demibold: '6',
    bold: '7',
    'extra-bold': '8',
    extrabold: '8',
    'ultra-bold': '8',
    ultrabold: '8',
    black: '9',
    heavy: '9',
    l: '3',
    r: '4',
    b: '7',
  };
  private STYLES = {
    i: 'i',
    italic: 'i',
    n: 'n',
    normal: 'n',
  };
  private VARIATION_MATCH = new RegExp(
    '^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|' +
      '(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i' +
      '|normal|italic)?$'
  );

  /**
   * @constructor
   */
  constructor(fontFamilies: string[]) {
    this.fontFamilies_ = fontFamilies;
    this.parsedFonts_ = [];
    this.fontTestStrings_ = {};
  }

  public parse() {
    let length = this.fontFamilies_.length;

    for (let i = 0; i < length; i++) {
      let elements = this.fontFamilies_[i].split(':');
      let fontFamily = elements[0].replace(/\+/g, ' ');
      let variations = ['n4'];

      if (elements.length >= 2) {
        let fvds = this.parseVariations_(elements[1]);

        if (fvds.length > 0) {
          variations = fvds;
        }
        if (elements.length == 3) {
          let subsets = this.parseSubsets_(elements[2]);
          if (subsets.length > 0) {
            let fontTestString = this.INT_FONTS[subsets[0]];

            if (fontTestString) {
              this.fontTestStrings_[fontFamily] = fontTestString;
            }
          }
        }
      }

      // For backward compatibility
      if (!this.fontTestStrings_[fontFamily]) {
        let hanumanTestString = this.INT_FONTS[fontFamily];
        if (hanumanTestString) {
          this.fontTestStrings_[fontFamily] = hanumanTestString;
        }
      }

      for (let j = 0; j < variations.length; j += 1) {
        this.parsedFonts_.push({
          family: fontFamily,
          variation: variations[j],
        });
      }
    }
  }

  private generateFontVariationDescription_(variation: string) {
    if (!variation.match(/^[\w-]+$/)) {
      return '';
    }
    let normalizedVariation = variation.toLowerCase();
    let groups = this.VARIATION_MATCH.exec(normalizedVariation);
    if (groups == null) {
      return '';
    }
    let styleMatch = this.normalizeStyle_(groups[2]);
    let weightMatch = this.normalizeWeight_(groups[1]);
    return [styleMatch, weightMatch].join('');
  }

  private normalizeStyle_(parsedStyle: string) {
    if (parsedStyle == null || parsedStyle == '') {
      return 'n';
    }
    return this.STYLES[parsedStyle];
  }

  private normalizeWeight_(parsedWeight) {
    if (parsedWeight == null || parsedWeight == '') {
      return '4';
    }
    let weight = this.WEIGHTS[parsedWeight];
    if (weight) {
      return weight;
    }
    if (isNaN(parsedWeight)) {
      return '4';
    }
    return parsedWeight.substr(0, 1);
  }

  private parseVariations_(variations) {
    let finalVariations: string[] = [];

    if (!variations) {
      return finalVariations;
    }
    let providedVariations = variations.split(',');
    let length = providedVariations.length;

    for (let i = 0; i < length; i++) {
      let variation = providedVariations[i];
      let fvd = this.generateFontVariationDescription_(variation);

      if (fvd) {
        finalVariations.push(fvd);
      }
    }
    return finalVariations;
  }

  public parseSubsets_(subsets) {
    let finalSubsets = [];

    if (!subsets) {
      return finalSubsets;
    }
    return subsets.split(',');
  }

  public getFonts() {
    return this.parsedFonts_;
  }

  public getFontTestStrings() {
    return this.fontTestStrings_;
  }
}
