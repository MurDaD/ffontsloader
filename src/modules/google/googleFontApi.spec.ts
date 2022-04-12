import { GoogleFontApi } from './googleFontApi';

describe('GoogleFontApi', () => {
  let googleFontApi: GoogleFontApi;
  const config: string[] = ['Font', 'Font two:300,700:latin,greek'];

  beforeEach(() => {
    googleFontApi = new GoogleFontApi(config);
  });

  it('initialize the class', () => {
    expect(googleFontApi).toBeDefined();
  });
});
