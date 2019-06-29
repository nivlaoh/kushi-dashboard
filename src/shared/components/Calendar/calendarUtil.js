export const chunkArray = (arr = [], size = 1) => {
  const results = [];
  let count = 0;
  if (arr !== null) {
    while (count < arr.length) {
      results.push(arr.slice(count, count+size));
      count += size;
    }
  }
  return results;
};

export default {
  chunkArray,
};
