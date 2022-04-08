import { Font, FontsLoaderConfig, FontsLoaderDefaultConfig, ParsedFont } from './index';
import { GoogleLoader } from './modules/google';
import { CustomLoader } from './modules/custom';
import { EventBus } from './utils';
import { Watcher } from './utils/watcher/watcher';

const DEFAULT_CONFIG: FontsLoaderDefaultConfig = {
  events: false,
  classes: false,
  timeout: 3000,
};

/**
 * Main function that loads all the fonts to <link /> tag
 * @param fontsLoaderConfig
 */
const load = async (fontsLoaderConfig: FontsLoaderConfig): Promise<void> => {
  const config = {
    ...DEFAULT_CONFIG,
    ...fontsLoaderConfig,
  };
  const watcher = new Watcher(config.timeout);
  if (config.classes || config.events) {
    new EventBus(config);
  }
  console.table(config);
  if (config.google) {
    const googleLoader = new GoogleLoader(config.google);
    if (config.google.load === 'native') {
      await loadFontToBrowser_(await googleLoader.getParsedFonts());
    } else {
      googleLoader.getUris().forEach(addLinkElement_);
    }
    googleLoader.getFonts().forEach((font) => {
      console.log(`adding google ${font.family}:${font.variation}`);
      watcher.add(font, config.google?.load || 'link');
    });
  }
  if (config.custom) {
    const customLoader = new CustomLoader(config.custom);
    // TODO: implement native loader
    customLoader.getUris().forEach(addLinkElement_);
    customLoader.getFonts().forEach((font) => {
      console.log(`adding custom ${font.family}:${font.variation}`);
      watcher.add(font, 'link');
    });
  }
  if (config.classes || config.events) {
    console.log('watching  fonts');
    watcher.watchFonts();
  }
};

/**
 * Native fonts to browser insert
 * @param fonts
 */
const loadFontToBrowser_ = async (fonts: ParsedFont[]): Promise<void> => {
  for (const font of fonts) {
    const fontFace = await new FontFace(font.fontFamily, font.src, {
      style: font.fontStyle,
      unicodeRange: font.unicodeRange,
      weight: font.fontWeight,
    }).load();
    document.fonts.add(fontFace);
  }
};

/**
 * Creates new <link rel="stylesheet" /> with given href and async if needed
 * @param href
 */
const addLinkElement_ = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'all';
  document.head.appendChild(link);
};

export { load };
