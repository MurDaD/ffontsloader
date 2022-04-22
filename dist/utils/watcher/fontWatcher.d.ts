import { Font, LoadingMethod } from '../../index';
export declare class FontWatcher {
    private font_;
    private load_;
    constructor(font: Font, load: LoadingMethod);
    private loading_;
    getFont(): Font;
    watch(): boolean;
}
