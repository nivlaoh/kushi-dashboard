export const isAdvancedUpload = () => {
  const div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
};

export const formatFileSize = (size) => {
  const sizeInKb = size/1024;
  return sizeInKb < 1024 ? `${Math.round(sizeInKb)} kB` : `${Math.round(sizeInKb/1024)} MB`;
};

export default {
  isAdvancedUpload,
  formatFileSize,
};
