import { Font, LoadingMethod } from '../../index';
export declare class Watcher {
    private fontWatchers_;
    private timeout;
    constructor(timeout: number);
    add(font: Font, load: LoadingMethod): void;
    watchFonts(): void;
}
