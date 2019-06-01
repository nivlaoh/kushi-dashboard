export const isAdvancedUpload = () => {
  const div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
};

export const formatFileSize = (size) => {
  const sizeInKb = size/1024;
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

export default {
  isAdvancedUpload,
  formatFileSize,
  getBase64,
};
