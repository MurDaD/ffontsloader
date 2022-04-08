import { Font, LoadingMethod } from '../../index';
import { FontEvents } from '../eventBus';

export class FontWatcher {
  private font_: Font;
  private load_: LoadingMethod;

  constructor(font: Font, load: LoadingMethod) {
    this.font_ = font;
    this.load_ = load;

    this.loading_();
  }

  private loading_() {
    document.dispatchEvent(
      new CustomEvent(FontEvents.FONT_LOADING, { detail: `${this.font_.family}:${this.font_.variation}` })
    );
  }

  public getFont(): Font {
    return this.font_;
  }

  public watch(): boolean {
    return document.fonts.check(`16px ${this.font_.family}`, 'BESbswy');
  }
}
