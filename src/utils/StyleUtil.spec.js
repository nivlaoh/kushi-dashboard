import { getRandomColours } from './StyleUtil';

describe('StyleUtil', () => {
  describe('getRandomColours', () => {
    it('should get six alphabetic letter codes', () => {
      expect(getRandomColours().length).toEqual(7);
    });
    it('should not contain any invalid colour character', () => {
      const testExamples = Array.apply(null, { length: 10 }).map(Function.call, getRandomColours);
      expect(testExamples.every(item => /#[0-9A-F]{6}/.test(item))).toBe(true);
    });
  });
});
