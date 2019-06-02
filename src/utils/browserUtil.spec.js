import { formatFileSize } from './browserUtil';

describe('browserUtil', () => {
  describe('formatFileSize', () => {
    it('should return size lesser than 1 MB', () => {
      expect(formatFileSize(2048)).toEqual('2 kB');
    });

    it('should round off odd size', () => {
      expect(formatFileSize(1430)).toEqual('1 kB');
    });

    it('should return size bigger or equal than 1MB', () => {
      expect(formatFileSize(1048576)).toEqual('1 MB');
    });

    it('should return size bigger or equal than 1GB', () => {
      expect(formatFileSize(1073741824)).toEqual('1 GB');
    });
  });
});
