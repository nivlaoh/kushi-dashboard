import { getLocation } from './geolocation';

describe('Geolocation', () => {
  describe('getLocation', () => {
    it('should relay callback to getCurrentPosition', () => {
      const cb = jest.fn();
      navigator.geolocation = {
        getCurrentPosition: (fn) => { fn(); },
      };
      expect(getLocation(cb)).toBeTruthy();
      expect(cb).toHaveBeenCalled();
    });

    it('should return false if geolocation is not supported', () => {
      navigator.geolocation = undefined;
      expect(getLocation(jest.fn())).toEqual(false);
    });
  });
});
