import { Font, LoadingMethod } from '../../index';
export declare class Watcher {
    private fontWatchers_;
    private loadedFonts_;
    private watched_;
    add(font: Font, load: LoadingMethod): void;
    fontLoaded(fontName: string): void;
    watchFonts(): void;
}
