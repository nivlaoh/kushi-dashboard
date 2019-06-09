const isFileOfExt = (exts, filename) => {
  return exts
    .map(ext => filename.toLowerCase().endsWith(ext))
    .includes(true);
};

export const getFileIcon = (filename) => {
  let fontIcon;
  if (filename.endsWith('.pdf')) {
    fontIcon = 'file-pdf';
  } else if (isFileOfExt(['.txt', '.log'], filename)) {
    fontIcon = 'file-alt';
  } else if (isFileOfExt(['.jpg', '.jpeg', '.gif', '.png'], filename)) {
    fontIcon = 'file-image';
  } else if (isFileOfExt(['.docx', '.doc'], filename)) {
    fontIcon = 'file-word';
  } else if (isFileOfExt(['.xls', '.xlsx'], filename)) {
    fontIcon = 'file-excel';
  } else if (isFileOfExt(['.ppt', '.pptx'], filename)) {
    fontIcon = 'file-powerpoint';
  } else if (isFileOfExt(['.html', '.htm', '.js', '.jsx'], filename)) {
    fontIcon = 'file-code';
  } else if (isFileOfExt(['.csv'], filename)) {
    fontIcon = 'file-csv';
  } else if (isFileOfExt(['.mp4', '.avi'], filename)) {
    fontIcon = 'file-video';
  } else {
    fontIcon = 'file';
  }
  return fontIcon;
};

export default {
  getFileIcon,
};
