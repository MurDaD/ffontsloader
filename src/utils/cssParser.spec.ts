import { CssParser } from './cssParser';

describe('CssParser', () => {
  describe('works as expected', () => {
    const input = `/* latin */
@font-face {
  font-family: 'Cantarell';
  font-style: italic;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/cantarell/v13/B50LF7ZDq37KMUvlO015iZJpNKs.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin */
@font-face {
  font-family: 'Droid Serif';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/droidserif/v18/tDbV2oqRg1oM3QBjjcaDkOJGiRD7OwE.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;
    const expected = [
      {
        fontFamily: 'Cantarell',
        fontStyle: 'italic',
        fontWeight: '400',
        src: 'url(https://fonts.gstatic.com/s/cantarell/v13/B50LF7ZDq37KMUvlO015iZJpNKs.woff2) format(\'woff2\')',
        unicodeRange:
          'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
      },
      {
        fontFamily: 'Droid Serif',
        fontStyle: 'normal',
        fontWeight: '700',
        src: 'url(https://fonts.gstatic.com/s/droidserif/v18/tDbV2oqRg1oM3QBjjcaDkOJGiRD7OwE.woff2) format(\'woff2\')',
        unicodeRange:
          'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
      },
    ];
    let cssParser;
    let output;
    beforeEach(() => {
      cssParser = new CssParser(input);
      cssParser.parseCSS();
      output = cssParser.getParsedFonts();
    });

    it('it parses multiple fonts file', () => {
      expect(output).toEqual(expected);
    });
  });
});
