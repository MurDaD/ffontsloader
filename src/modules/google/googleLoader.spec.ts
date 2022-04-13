import { GoogleLoader } from './googleLoader';
import { GoogleFontApi } from './googleFontApi';
import { FontFamilies } from '../../index';
import { mocked } from 'jest-mock';
import { CssParser } from '../../utils/cssParser';
import { FontParser } from '../../utils/fontParser';

const FONT_URI = 'https://font.url/';
const FONT_FETCH_RESPONSE = 'FONT_FETCH_RESPONSE';
const PARSED_FONT = 'PARSED_FONT';
const PARSED_CSS_FONT = 'PARSED_CSS_FONT';
const mockGoogleFontApiBuildUriFunc = jest.fn();

jest.mock('./googleFontApi', () => {
  return {
    GoogleFontApi: jest.fn().mockImplementation(() => {
      return {
        buildUri: mockGoogleFontApiBuildUriFunc,
      };
    }),
  };
});

jest.mock('../../utils/cssParser', () => {
  return {
    CssParser: jest.fn().mockImplementation(() => {
      return {
        parseCSS: jest.fn(),
        getParsedFonts: () => PARSED_CSS_FONT,
      };
    }),
  };
});

jest.mock('../../utils/fontParser', () => {
  return {
    FontParser: jest.fn().mockImplementation(() => {
      return {
        parse: jest.fn(),
        getFonts: () => PARSED_FONT,
      };
    }),
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(FONT_FETCH_RESPONSE),
  }),
) as jest.Mock;

describe('GoogleLoader', () => {
  describe('works as expected', () => {

    let googleLoader: GoogleLoader;
    const config: FontFamilies = {
      families: ['Font', 'Font two:300,700:latin,greek'],
    };
    const mockedGoogleFontApi = mocked(GoogleFontApi, true);
    const mockedCssParser = mocked(CssParser, true);
    const mockedFontParser = mocked(FontParser, true);

    beforeEach(() => {
      mockedGoogleFontApi.mockClear();
      mockedCssParser.mockClear();
      mockedFontParser.mockClear();
      googleLoader = new GoogleLoader(config);
      mockGoogleFontApiBuildUriFunc.mockImplementation(() => FONT_URI);
    });

    it('initialize the class', () => {
      expect(googleLoader).toBeDefined();
      // expect(mockedGoogleFontApi).toHaveBeenCalledTimes(1);
    });

    it('getUris()', () => {
      expect(googleLoader.getUris()).toEqual([ FONT_URI ]);
    });

    it('getFonts()', () => {
      expect(googleLoader.getFonts()).toEqual(PARSED_FONT);
      expect(mockedFontParser).toHaveBeenCalledTimes(1);

    });

    it('getParsedFonts()', async () => {
      expect.assertions(2);
      const result = await googleLoader.getParsedFonts();
      expect(result).toEqual(PARSED_CSS_FONT);
      expect(mockedCssParser).toHaveBeenCalledTimes(1);
    });
  });

  describe('throws an error', () => {
    let googleLoader: GoogleLoader;
    const config: FontFamilies = {
      families: ['Font', 'Font two:300,700:latin,greek'],
    };
    const mockedGoogleFontApi = mocked(GoogleFontApi, true);
    const mockedCssParser = mocked(CssParser, true);
    const mockedFontParser = mocked(FontParser, true);

    beforeEach(() => {
      mockedGoogleFontApi.mockClear();
      mockedCssParser.mockClear();
      mockedFontParser.mockClear();
      mockGoogleFontApiBuildUriFunc.mockClear();
      mockGoogleFontApiBuildUriFunc.mockImplementation(() => undefined);
      googleLoader = new GoogleLoader(config);
    });

    it('getParsedFonts() throws an error', async () => {
      expect.assertions(1);
      await expect(googleLoader.getParsedFonts()).rejects.toThrow(new Error('No uri provided. Nothing to parse.'));
    });
  });
});
