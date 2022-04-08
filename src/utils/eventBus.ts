import { FontsLoaderConfig } from '../index';

export enum FontEvents {
  LOADING = 'loading',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FONT_LOADING = 'fontloading',
  FONT_ACTIVE = 'fontactive',
  FONT_INACTIVE = 'fontinactive',
}

export class EventBus {
  private namespace_: string = 'wf';
  private classSeparator_: string = '-';
  private event_: Event;
  private config_: FontsLoaderConfig;
  private htmlElement_;

  constructor(config: FontsLoaderConfig) {
    this.config_ = config;
    this.event_ = document.createEvent('CustomEvent');
    this.htmlElement_ = document.documentElement;
    document.addEventListener(
      FontEvents.LOADING,
      (event: CustomEvent) => {
        this.handleLoading_();
      },
      false
    );
    document.addEventListener(
      FontEvents.ACTIVE,
      (event: CustomEvent) => {
        this.handleActive_();
      },
      false
    );
    document.addEventListener(
      FontEvents.INACTIVE,
      (event: CustomEvent) => {
        this.handleInactive_();
      },
      false
    );
    document.addEventListener(
      FontEvents.FONT_LOADING,
      (event: CustomEvent) => {
        const { detail } = event;
        this.handleFontLoading_(detail);
      },
      false
    );
    document.addEventListener(
      FontEvents.FONT_ACTIVE,
      (event: CustomEvent) => {
        const { detail } = event;
        this.handleFontActive_(detail);
      },
      false
    );
    document.addEventListener(
      FontEvents.FONT_INACTIVE,
      (event: CustomEvent) => {
        const { detail } = event;
        this.handleFontInactive_(detail);
      },
      false
    );
  }

  private handleLoading_() {
    if (this.config_.events && this.config_.loading) {
      this.config_.loading.call(null);
      this.addClassToHtml_(FontEvents.LOADING);
      this.removeClassFromHtml_(FontEvents.ACTIVE);
      this.removeClassFromHtml_(FontEvents.INACTIVE);
    }
  }

  private handleActive_() {
    if (this.config_.events && this.config_.active) {
      this.config_.active.call(null);
      this.removeClassFromHtml_(FontEvents.LOADING);
      this.addClassToHtml_(FontEvents.ACTIVE);
      this.removeClassFromHtml_(FontEvents.INACTIVE);
    }
  }

  private handleInactive_() {
    if (this.config_.events && this.config_.inactive) {
      this.config_.inactive.call(null);
      this.removeClassFromHtml_(FontEvents.LOADING);
      this.removeClassFromHtml_(FontEvents.ACTIVE);
      this.addClassToHtml_(FontEvents.INACTIVE);
    }
  }

  private handleFontLoading_(font: string) {
    if (this.config_.events && this.config_.fontloading) {
      const fontArray = font.split(':');
      this.config_.fontloading.call(null, fontArray[0], fontArray[1]);
      this.addClassToHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);
      this.removeClassFromHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);
      this.removeClassFromHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);
    }
  }

  private handleFontActive_(font: string) {
    if (this.config_.events && this.config_.fontactive) {
      const fontArray = font.split(':');
      this.config_.fontactive.call(null, fontArray[0], fontArray[1]);
      this.removeClassFromHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);
      this.addClassToHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);
      this.removeClassFromHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);
    }
  }

  private handleFontInactive_(font: string) {
    if (this.config_.events && this.config_.fontinactive) {
      const fontArray = font.split(':');
      this.config_.fontinactive.call(null, fontArray[0], fontArray[1]);
      this.removeClassFromHtml_(FontEvents.LOADING, [fontArray[0], fontArray[1]]);
      this.removeClassFromHtml_(FontEvents.ACTIVE, [fontArray[0], fontArray[1]]);
      this.addClassToHtml_(FontEvents.INACTIVE, [fontArray[0], fontArray[1]]);
    }
  }

  private addClassToHtml_(className: string, prefix: string[] = []) {
    this.htmlElement_.classList.add(
      [this.namespace_].concat(prefix.map(this.sanitizeClassName_), className).join(this.classSeparator_)
    );
  }

  private removeClassFromHtml_(className: string, prefix: string[] = []) {
    this.htmlElement_.classList.remove(
      [this.namespace_].concat(prefix.map(this.sanitizeClassName_), className).join(this.classSeparator_)
    );
  }

  private sanitizeClassName_(className) {
    return className.replace(/[\W_]+/g, '').toLowerCase();
  }
}
