import { chunkArray } from './calendarUtil';

describe('calendarUtil', () => {
  describe('chunkArray', () => {
    it('should return empty array for null array', () => {
      expect(chunkArray(null, 2)).toEqual([]);
    });

    it('should split by 1 item if not specified', () => {
      expect(chunkArray(['1', '2', '3']).length).toEqual(3);
    });

    it('should split string array into chunks', () => {
      const result = chunkArray(['1', '2', '3', '4', '5', '6'], 2);
      expect(result.length).toEqual(3);
      expect(result[0]).toEqual(['1', '2']);
    });

    it('should split object array into chunks', () => {
      const result = chunkArray([
        { id: 1, thing: 'here' },
        { id: 2, thing: 'here2' },
        { id: 3, thing: 'here3' },
        { id: 4, thing: 'here4' },
      ], 2);
      expect(result.length).toEqual(2);
      expect(result[0]).toEqual([ { id: 1, thing: 'here' }, { id: 2, thing: 'here2' } ]);
    });
  });
});
