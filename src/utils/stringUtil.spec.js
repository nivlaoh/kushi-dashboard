import { validateEmail } from './stringUtil';

describe('stringUtil', () => {
  describe('validateEmail', () => {
    it('should return true for normal email', () => {
      expect(validateEmail('test@test.com')).toBe(true);
    });

    it('should return true for capitalised email', () => {
      expect(validateEmail('AA@AA.COM')).toBe(true);
    });

    it('should return false for non valid domain', () => {
      expect(validateEmail('test@aa.x')).toBe(false);
    });

    it('should return false for invalid characters in local part', () => {
      expect(validateEmail('<>@test.com')).toBe(false);
    });
  });
});
