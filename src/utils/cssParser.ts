import { ParsedFont } from '../index';

export class CssParser {
  private css_: string;
  private rules_: ParsedFont[] = [];

  constructor(fontFaceResponseText: string) {
    this.css_ = fontFaceResponseText;
  }

  /**
   * Returns ParsedFont array of parsed CSS
   */
  public getParsedFonts(): ParsedFont[] {
    return this.rules_;
  }

  /**
   * Parses CSS into array of ParsedFont object
   */
  public parseCSS() {
    this.css_ = this.removeNewLines_(this.css_);
    const blocks = this.css_.split('}');
    blocks.pop();
    blocks.forEach((block) => {
      const pair = block.split('{');
      const parsed = this.parseCSSBlock_(pair[1]);

      this.rules_.push({
        fontFamily: parsed['font-family'],
        fontStyle: parsed['font-style'],
        fontWeight: parsed['font-weight'],
        src: parsed.src,
        unicodeRange: parsed['unicode-range'],
      });
    });
  }

  /**
   * Parsing css block
   * @param css
   * @private
   */
  private parseCSSBlock_(css: string): {
    'font-family': string;
    'font-style': string;
    'font-weight': string;
    src: string;
    'font-range': string;
  } {
    const rule: any = {};
    const declarations = css.split(';');
    declarations.pop();
    declarations.forEach((declaration) => {
      const loc = declaration.indexOf(':');
      const property = declaration.substring(0, loc).trim();
      let value = declaration.substring(loc + 1).trim();
      if (value[0] === "'" && value[value.length - 1] === "'") {
        value = value.replace(/'/g, '');
      }

      if (property != '' && value != '') rule[property] = value;
    });
    return rule;
  }

  /**
   * Removes all empty lines from CSS
   * @param css
   * @private
   */
  private removeNewLines_(css: string) {
    return css.replace(/\n/g, '');
  }
}
