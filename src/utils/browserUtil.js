export const isAdvancedUpload = () => {
  const div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
};

export const formatFileSize = (size) => {
  const sizeInKb = size/1024;
  if (sizeInKb >= 1048576) {
    return `${Math.round(sizeInKb/1024/1024)} GB`;
  }
  return sizeInKb < 1024 ? `${Math.round(sizeInKb)} kB` : `${Math.round(sizeInKb/1024)} MB`;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const detectIE = () => {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

export default {
  isAdvancedUpload,
  formatFileSize,
  getBase64,
  detectIE,
};
