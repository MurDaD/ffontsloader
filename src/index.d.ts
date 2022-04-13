type EmptyFunction = () => void;
type FamilyFunction = (familyName: string, fvd) => void;
export type LoadingMethod = 'native' | 'link';
export type Font = {
  family: string;
  variation: string;
};
export type FontFamilies = {
  families: string[];
  load?: LoadingMethod;
};
export type CustomFamily = {
  name: string;
  url: string;
};
export type CustomFamilies = {
  families: (string | CustomFamily)[];
  urls?: string[];
  load?: LoadingMethod;
};
export type FontsLoaderConfig = {
  google?: FontFamilies;
  custom?: CustomFamilies;
  classes?: boolean;
  events?: boolean;
  context?: string[];
  timeout?: number;
  loading?: EmptyFunction;
  active?: EmptyFunction;
  inactive?: EmptyFunction;
  fontloading?: FamilyFunction;
  fontactive?: FamilyFunction;
  fontinactive?: FamilyFunction;
};
export type FontsLoaderDefaultConfig = {
  events: boolean;
  classes: boolean;
  timeout: number;
};

// API
export type FontRequest = {
  family: string;
  style?: string | string[];
};
export type ParsedFont = {
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: string;
  src: string;
  unicodeRange?: string;
};
export interface FontLoader {
  getFonts(): Font[] | Promise<Font[]>;
  getParsedFonts(): ParsedFont[] | Promise<ParsedFont[]>;
  getUris(): string[];
}
