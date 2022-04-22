import { Font, LoadingMethod } from '../../index';
import { FontEvents } from '../eventBus';
import { FontWatcher } from './fontWatcher';

export class Watcher {
  private fontWatchers_: FontWatcher[] = [];
  private loadedFonts_: string[] = [];
  private watched_ = false;

  public add(font: Font, load: LoadingMethod) {
    this.fontWatchers_.push(new FontWatcher(font, load));
  }

  public fontLoaded(fontName: string) {
    this.loadedFonts_.push(fontName);
  }

  public watchFonts() {
    if (!this.watched_) {
      this.watched_ = true;
      let atLeastOneLoaded = false;
      this.fontWatchers_.forEach((fontWatcher) => {
        const font = fontWatcher.getFont();
        const loaded = this.loadedFonts_.includes(font.family) || fontWatcher.watch();
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
    }
  }
}
