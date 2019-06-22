import { validateEmail, accentFold, capitaliseFirstLetter } from './stringUtil';

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

  describe('accentFold', () => {
    it('should return unaccented character', () => {
      expect(accentFold('Åland')).toEqual('Aland');
    });
  });

  describe('capitaliseFirstLetter', () => {
    it('should capitalise single letter', () => {
      expect(capitaliseFirstLetter('a')).toEqual('A');
    });
    
    it('should capitalise one word', () => {
      expect(capitaliseFirstLetter('hello')).toEqual('Hello');
    });

    it('should capitalise words in sentence', () => {
      expect(capitaliseFirstLetter('I am running.')).toEqual('I Am Running.');
    });
  });
});
