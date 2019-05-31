const isFileOfExt = (exts, filename) => {
  return exts
    .map(ext => filename.toLowerCase().endsWith(ext))
    .includes(true);
};

export const getFileIcon = (filename) => {
  let fontIcon;
  if (filename.endsWith('.pdf')) {
    fontIcon = 'fa-file-pdf-o';
  } else if (isFileOfExt(['.txt', '.log'], filename)) {
    fontIcon = 'fa-file-text-o';
  } else if (isFileOfExt(['.jpg', '.jpeg', '.gif', '.png'], filename)) {
    fontIcon = 'fa-file-image-o';
  } else if (isFileOfExt(['.docx', '.doc'], filename)) {
    fontIcon = 'fa-file-word-o';
  } else if (isFileOfExt(['.xls', '.xlsx'], filename)) {
    fontIcon = 'fa-file-excel-o';
  } else if (isFileOfExt(['.ppt', '.pptx'], filename)) {
    fontIcon = 'fa-file-powerpoint-o';
  } else if (isFileOfExt(['.html', '.htm', '.js', '.jsx'], filename)) {
    fontIcon = 'fa-file-code-o';
  } else {
    fontIcon = 'fa-file-o';
  }
  return fontIcon;
};

export default {
  getFileIcon,
};
