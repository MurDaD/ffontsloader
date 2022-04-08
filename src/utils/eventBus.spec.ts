import { EventBus, FontEvents } from './eventBus';
import { FontsLoaderConfig } from '../index';

describe('EventBus', () => {
  let eventBus;
  let config: FontsLoaderConfig = {
    events: true,
    loading: jest.fn,
  };

  jest.spyOn(document, 'addEventListener').mockImplementation(jest.fn());

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
});
