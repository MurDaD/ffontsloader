import { FontsLoaderConfig } from './index';
/**
 * Main function that loads all the fonts to <link /> tag
 * @param fontsLoaderConfig
 */
declare const load: (fontsLoaderConfig: FontsLoaderConfig) => Promise<void>;
export { load };
