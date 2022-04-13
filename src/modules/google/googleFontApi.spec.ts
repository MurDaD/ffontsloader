import { GoogleFontApi } from './googleFontApi';
import { FontParser } from '../../utils/fontParser';
import { Font } from '../../index';

const font1: Font = {
  family: 'Font',
  variation: 'n4',
};

const font2: Font = {
  family: 'Font two',
  variation: 'n7',
};

jest.mock('../../utils/fontParser', () => {
  return {
    FontParser: jest.fn().mockImplementation(() => {
      return {
        parse: jest.fn(),
        getFonts: () => [ font1, font2 ],
      };
    }),
  };
});

describe('GoogleFontApi', () => {
  let googleFontApi: GoogleFontApi;
  const config: string[] = ['Font', 'Font two:300,700:latin,greek'];

  beforeEach(() => {
    googleFontApi = new GoogleFontApi(config);
  });

  it('initialize the class', () => {
    expect(googleFontApi).toBeDefined();
  });

  it('buildUri()', () => {
    const result = googleFontApi.buildUri();
    expect(result).toEqual('https://fonts.googleapis.com/css?family=Font:n4|Font+two:n7');
  });
});
