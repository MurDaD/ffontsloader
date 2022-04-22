import { mocked } from 'jest-mock';
import { Watcher } from './watcher';
import { FontWatcher } from './fontWatcher';
import { LoadingMethod } from '../../index';
import { FontEvents } from '../eventBus';

const watchFunc = jest.fn();
const getFontFunc = jest.fn();

jest.mock('./fontWatcher', () => {
  return {
    FontWatcher: jest.fn().mockImplementation(() => {
      return {
        watch: watchFunc,
        getFont: getFontFunc,
      };
    }),
  };
});
jest.useFakeTimers();

describe('Watcher', () => {
  let watcher;
  const font1 = {
    family: 'Font',
    variation: 'n4',
  };
  const font2 = {
    family: 'Font two',
    variation: 'n4',
  };
  const nativeLoad: LoadingMethod = 'native';
  const linkLoad = 'link';
  const mockedFontWatcher = mocked(FontWatcher, true);
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
    watcher = undefined;
    mockedFontWatcher.mockClear();
  });

  describe('works as expected', () => {
    beforeEach(() => {
      watcher = undefined;
      mockedFontWatcher.mockClear();
      dispatchEventMock.mockClear();
    });

    it('and all fonts loaded', () => {
      watchFunc.mockImplementation(() => true);
      getFontFunc.mockImplementationOnce(() => font1);
      getFontFunc.mockImplementationOnce(() => font2);
      watcher = new Watcher();
      watcher.add(font1, nativeLoad);
      watcher.add(font2, linkLoad);
      watcher.watchFonts();
      expect(dispatchEventMock).toHaveBeenCalledTimes(3);

      expect(dispatchEventMock.mock.calls[0][0].type).toEqual(FontEvents.FONT_ACTIVE);
      expect(dispatchEventMock.mock.calls[0][0].detail).toEqual(`${font1.family}:${font1.variation}`);
      expect(dispatchEventMock.mock.calls[1][0].type).toEqual(FontEvents.FONT_ACTIVE);
      expect(dispatchEventMock.mock.calls[1][0].detail).toEqual(`${font2.family}:${font2.variation}`);
      expect(dispatchEventMock.mock.calls[2][0].type).toEqual(FontEvents.ACTIVE);
      expect(dispatchEventMock.mock.calls[2][0].detail).toEqual(null);

      expect(mockedFontWatcher).toHaveBeenCalledTimes(2);
      expect(mockedFontWatcher).toHaveBeenNthCalledWith(1, font1, nativeLoad);
      expect(mockedFontWatcher).toHaveBeenNthCalledWith(2, font2, linkLoad);
    });

    it('and no fonts loaded', () => {
      watchFunc.mockImplementation(() => false);
      getFontFunc.mockImplementationOnce(() => font1);
      getFontFunc.mockImplementationOnce(() => font2);
      watcher = new Watcher();
      watcher.add(font1, nativeLoad);
      watcher.add(font2, linkLoad);
      watcher.watchFonts();
      expect(dispatchEventMock).toHaveBeenCalledTimes(3);

      expect(dispatchEventMock.mock.calls[0][0].type).toEqual(FontEvents.FONT_INACTIVE);
      expect(dispatchEventMock.mock.calls[0][0].detail).toEqual(`${font1.family}:${font1.variation}`);
      expect(dispatchEventMock.mock.calls[1][0].type).toEqual(FontEvents.FONT_INACTIVE);
      expect(dispatchEventMock.mock.calls[1][0].detail).toEqual(`${font2.family}:${font2.variation}`);
      expect(dispatchEventMock.mock.calls[2][0].type).toEqual(FontEvents.INACTIVE);
      expect(dispatchEventMock.mock.calls[2][0].detail).toEqual(null);

      expect(mockedFontWatcher).toHaveBeenCalledTimes(2);
      expect(mockedFontWatcher).toHaveBeenNthCalledWith(1, font1, nativeLoad);
      expect(mockedFontWatcher).toHaveBeenNthCalledWith(2, font2, linkLoad);
    });
  });

  it('fontLoaded()', () => {
    watcher = new Watcher();
    watcher.fontLoaded(font1.family);
    watcher.fontLoaded(font2.family);
    expect(watcher.loadedFonts_).toEqual([font1.family, font2.family]);
  });
});
