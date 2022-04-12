import { GoogleLoader } from './googleLoader';
import { FontFamilies } from '../../index';

describe('GoogleLoader', () => {
  let googleLoader: GoogleLoader;
  const config: FontFamilies = {
    families: ['Font', 'Font two:300,700:latin,greek'],
  };

  beforeEach(() => {
    googleLoader = new GoogleLoader(config);
  });

  it('initialize the class', () => {
    expect(googleLoader).toBeDefined();
  });
});
