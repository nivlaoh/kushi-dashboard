export const concatClass = (list) => {
  const a = list.reduce((item) => {
    return `${item} `;
  });
  return a;
};
