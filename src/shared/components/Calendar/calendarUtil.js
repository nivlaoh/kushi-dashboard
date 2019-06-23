export const chunkArray = (arr, size) => {
  const results = [];
  let count = 0;
  while (count < arr.length) {
    results.push(arr.slice(count, count+size));
    count += size;
  }
  return results;
};

export default {
  chunkArray,
};
