import { load } from './fontsloader';
import { Font, FontsLoaderConfig, ParsedFont } from './index';
import { GoogleLoader } from './modules/google';
import { mocked } from 'jest-mock';
import { Watcher } from './utils/watcher/watcher';

const url =  'https://font.url/';
const fontName1 = 'Font';
const fontName2 = 'Font Two';
const fontName3 = 'Font Three:n4';
const fontName4 = 'Font Four:300,700:latin,greek';
const font1: Font = {
  family: fontName1,
  variation: 'n4',
};
const font2: Font = {
  family: fontName1,
  variation: 'n4',
};
const parsedFont1: ParsedFont = {
  fontFamily: fontName1,
  src: url,
};
const parsedFont2: ParsedFont = {
  fontFamily: fontName2,
  src: url,
};

const mockGoogleLoaderGetParsedFonts = jest.fn();
const mockGoogleLoaderGetUris = jest.fn();
const mockGoogleLoaderGetFonts = jest.fn();
jest.mock('./modules/google', () => {
  return {
    GoogleLoader: jest.fn().mockImplementation(() => {
      return {
        getParsedFonts: mockGoogleLoaderGetParsedFonts,
        getUris: mockGoogleLoaderGetUris,
        getFonts: mockGoogleLoaderGetFonts,
      };
    }),
  };
});
const mockWatcherAdd = jest.fn();
const mockWatcherFontLoaded = jest.fn();
const mockWatcherWatchFonts = jest.fn();
jest.mock('./utils/watcher/watcher', () => {
  return {
    Watcher: jest.fn().mockImplementation(() => {
      return {
        add: mockWatcherAdd,
        fontLoaded: mockWatcherFontLoaded,
        watchFonts: mockWatcherWatchFonts,
      };
    }),
  };
});

const mockFontFaceLoad = jest.fn();
(global as any).FontFace = jest.fn(() => {
  return {
    FontFace: jest.fn(),
    load: mockFontFaceLoad,
  };
});

describe('GoogleFontApi', () => {

  let config: FontsLoaderConfig = {};

  it('initialize the class', () => {
    expect(load).toBeDefined();
  });

  describe('google fonts', () => {
    const mockedGoogleLoader = mocked(GoogleLoader, true);
    const mockedWatcher = mocked(GoogleLoader, true);

    beforeEach(() => {
      config = {};
      mockedGoogleLoader.mockClear();
      mockedWatcher.mockClear();
      Object.defineProperty(global, 'document', {
        get: () => ({
          fonts: {
            add: () => true,
          },
        }),
      });
    });


    it('native load', async () => {
      config = {
        google: {
          families: [fontName1, fontName2],
          load: 'native',
        },
      };
      mockFontFaceLoad.mockResolvedValue({});
      mockGoogleLoaderGetParsedFonts.mockImplementation(() => [parsedFont1, parsedFont2]);
      mockGoogleLoaderGetFonts.mockImplementation(() => [font1, font2]);
      await load(config);

      expect(mockedGoogleLoader).toHaveBeenCalledTimes(1);
      expect(mockGoogleLoaderGetParsedFonts).toHaveBeenCalledTimes(1);
      expect(mockGoogleLoaderGetFonts).toHaveBeenCalledTimes(1);
      expect(mockedWatcher).toHaveBeenCalledTimes(1);
      expect(mockWatcherAdd).toHaveBeenCalledTimes(2);
    });
  });
});
