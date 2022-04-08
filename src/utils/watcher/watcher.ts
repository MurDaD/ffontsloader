import { Font, LoadingMethod } from '../../index';
import { FontEvents } from '../eventBus';
import { FontWatcher } from './fontWatcher';

export class Watcher {
  private fontWatchers_: FontWatcher[] = [];
  private timeout: number;

  constructor(timeout: number) {
    this.timeout = timeout;
  }

  public add(font: Font, load: LoadingMethod) {
    this.fontWatchers_.push(new FontWatcher(font, load));
  }

  public watchFonts() {
    document.dispatchEvent(new CustomEvent(FontEvents.LOADING, {}));
    setTimeout(() => {
      let atLeastOneLoaded = false;
      this.fontWatchers_.forEach((fontWatcher) => {
        const loaded = fontWatcher.watch();
        const font = fontWatcher.getFont();
        if (loaded) {
          atLeastOneLoaded = true;
        }
        document.dispatchEvent(
          new CustomEvent(loaded ? FontEvents.FONT_ACTIVE : FontEvents.FONT_INACTIVE, {
            detail: `${font.family}:${font.variation}`,
          })
        );
      });
      document.dispatchEvent(new CustomEvent(atLeastOneLoaded ? FontEvents.ACTIVE : FontEvents.INACTIVE, {}));
    }, this.timeout);
  }
}
