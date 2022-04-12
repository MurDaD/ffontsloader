import { CustomLoader } from './customLoader';
import { CustomFamilies } from '../../index';

describe('CustomLoader', () => {
  let customLoader: CustomLoader;
  const config: CustomFamilies = {
    families: ['Font', 'Font two'],
    urls: ['https://css.url/'],
  };

  beforeEach(() => {
    customLoader = new CustomLoader(config);
  });

  it('initialize the class', () => {
    expect(customLoader).toBeDefined();
  });
});
