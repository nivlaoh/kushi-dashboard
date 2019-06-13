import { formatFileSize, detectIE } from './browserUtil';

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

  describe('detectIE', () => {
    it('should detect IE', () => {
      Object.defineProperty(window.navigator, "userAgent", ((_value) => {
        return {
          get: () => { return _value; },
          set: (v) => { _value = v; },
        };
      })(window.navigator.userAgent));
      window.navigator.userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)';
      expect(detectIE()).toEqual(6);
      window.navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)';
      expect(detectIE()).toEqual(10);
      window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko';
      expect(detectIE()).toEqual(11);
    });

    it('should return false for non IE', () => {
      window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
      expect(detectIE()).toEqual(false);
      window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1';
      expect(detectIE()).toEqual(false);
    });
  });
});
