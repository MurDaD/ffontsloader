import { FontWatcher } from './fontWatcher';
import { FontEvents } from '../eventBus';

describe('FontWatcher', () => {
  let fontWatcher;
  const font1 = {
    family: 'Font',
    variation: 'n4',
  };
  const font2 = {
    family: 'Font two',
    variation: 'n4',
  };
  const nativeLoad = 'native';
  const linkLoad = 'link';
  const dispatchEventMock = jest.fn();

  beforeEach(() => {
    Object.defineProperty(global, 'document', {
      get: () => ({
        dispatchEvent: dispatchEventMock,
        fonts: {
          check: () => true,
        },
      }),
    });
    fontWatcher = undefined;
  });

  it('works as expected with native load', () => {
    fontWatcher = new FontWatcher(font1, nativeLoad);
    const event = new CustomEvent(FontEvents.FONT_LOADING, { detail: `${font1.family}:${font1.variation}` });
    expect(dispatchEventMock).toHaveBeenCalledWith(event);
  });

  it('works as expected with link load', () => {
    fontWatcher = new FontWatcher(font2, linkLoad);
    const event = new CustomEvent(FontEvents.FONT_LOADING, { detail: `${font2.family}:${font2.variation}` });
    expect(dispatchEventMock).toHaveBeenCalledWith(event);
  });

  it('getFont()', () => {
    fontWatcher = new FontWatcher(font1, nativeLoad);
    expect(fontWatcher.getFont()).toEqual(font1);
  });

  it('watch()', () => {

    fontWatcher = new FontWatcher(font1, nativeLoad);
    expect(fontWatcher.watch()).toEqual(true);
  });
});
