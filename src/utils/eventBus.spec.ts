import { EventBus, FontEvents } from './eventBus';
import { FontsLoaderConfig } from '../index';

describe('EventBus', () => {
  let eventBus;
  const loadingFunc = jest.fn();
  const activeFunc = jest.fn();
  const inactiveFunc = jest.fn();
  const loadingFontFunc = jest.fn();
  const activeFontFunc = jest.fn();
  const inactiveFontFunc = jest.fn();
  const config: FontsLoaderConfig = {
    events: true,
    loading: loadingFunc,
    active: activeFunc,
    inactive: inactiveFunc,
    fontloading: loadingFontFunc,
    fontactive: activeFontFunc,
    fontinactive: inactiveFontFunc,
  };

  jest.spyOn(document, 'addEventListener');//.mockImplementation(jest.fn());

  beforeEach(() => {
    eventBus = new EventBus(config);
  });

  it('initialize the class', () => {
    expect(eventBus).toBeDefined();
    expect(document.addEventListener).toBeCalledTimes(6);
    expect(document.addEventListener).toHaveBeenNthCalledWith(1, FontEvents.LOADING, expect.any(Function), false);
    expect(document.addEventListener).toHaveBeenNthCalledWith(2, FontEvents.ACTIVE, expect.any(Function), false);
    expect(document.addEventListener).toHaveBeenNthCalledWith(3, FontEvents.INACTIVE, expect.any(Function), false);
    expect(document.addEventListener).toHaveBeenNthCalledWith(4, FontEvents.FONT_LOADING, expect.any(Function), false);
    expect(document.addEventListener).toHaveBeenNthCalledWith(5, FontEvents.FONT_ACTIVE, expect.any(Function), false);
    expect(document.addEventListener).toHaveBeenNthCalledWith(6, FontEvents.FONT_INACTIVE, expect.any(Function), false);
  });

  it('handleLoading_()', () => {
    const loadingEvent = new CustomEvent(FontEvents.LOADING, {});
    document.dispatchEvent(loadingEvent);
    expect(loadingFunc).toHaveBeenCalled();
  });

  it('handleActive_()', () => {
    const activeEvent = new CustomEvent(FontEvents.ACTIVE, {});
    document.dispatchEvent(activeEvent);
    expect(activeFunc).toHaveBeenCalled();
  });

  it('handleInactive_()', () => {
    const inactiveEvent = new CustomEvent(FontEvents.INACTIVE, {});
    document.dispatchEvent(inactiveEvent);
    expect(inactiveFunc).toHaveBeenCalled();
  });

  it('handleFontLoading_()', () => {
    const loadingFontEvent = new CustomEvent(FontEvents.FONT_LOADING, {
      detail: 'testFont:i4',
    });
    document.dispatchEvent(loadingFontEvent);
    expect(loadingFontFunc).toHaveBeenCalled();
  });

  it('handleFontActive_()', () => {
    const activeFontEvent = new CustomEvent(FontEvents.FONT_ACTIVE, {
      detail: 'testFont:i4',
    });
    document.dispatchEvent(activeFontEvent);
    expect(activeFontFunc).toHaveBeenCalled();
  });

  it('handleFontInactive_()', () => {
    const inactiveFontEvent = new CustomEvent(FontEvents.FONT_INACTIVE, {
      detail: 'testFont:i4',
    });
    document.dispatchEvent(inactiveFontEvent);
    expect(inactiveFontFunc).toHaveBeenCalled();
  });
});
