import { FontsLoaderConfig } from '../index';
export declare enum FontEvents {
    LOADING = "loading",
    ACTIVE = "active",
    INACTIVE = "inactive",
    FONT_LOADING = "fontloading",
    FONT_ACTIVE = "fontactive",
    FONT_INACTIVE = "fontinactive"
}
export declare class EventBus {
    private namespace_;
    private classSeparator_;
    private event_;
    private config_;
    private htmlElement_;
    constructor(config: FontsLoaderConfig);
    private handleLoading_;
    private handleActive_;
    private handleInactive_;
    private handleFontLoading_;
    private handleFontActive_;
    private handleFontInactive_;
    private addClassToHtml_;
    private removeClassFromHtml_;
    private sanitizeClassName_;
}
