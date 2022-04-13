import { CustomLoader } from './customLoader';
import { CustomFamilies, CustomFamily, Font } from '../../index';

const font1 = 'Font';
const font2 = 'Font two:n7';
const font3: CustomFamily = {
  name: 'Font three',
  url: 'url',
};
const parsedFont1: Font = {
  family: font1,
  variation: 'n4',
};
const parsedFont2: Font = {
  family: 'Font two',
  variation: 'n7',
};
const parsedFont3: Font = {
  family: 'Font three',
  variation: 'n4',
};
const fontUrl = 'https://css.url/';

describe('CustomLoader', () => {
  let customLoader: CustomLoader;
  let config: CustomFamilies;

  beforeEach(() => {
    config = {
      families: [ font1, font2, font3 ],
      urls: [ fontUrl ],
    };
    customLoader = new CustomLoader(config);
  });

  it('initialize the class', () => {
    expect(customLoader).toBeDefined();
  });

  it('getUris()', () => {
    const result = customLoader.getUris();
    expect(result).toEqual([ fontUrl, font3.url ]);
  });

  it('getFonts()', () => {
    const result = customLoader.getFonts();
    expect(result).toEqual([ parsedFont1, parsedFont2, parsedFont3 ]);
  });

  it('getParsedFonts()', () => {
    const result = customLoader.getParsedFonts();
    expect(result).toEqual([]);
  });
});
