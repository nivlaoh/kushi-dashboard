export const concatClass = (list) => {
  const a= list.reduce((item, i) => {
    return item + ' ';
  });
  console.log('here', a);
  return a;
};
