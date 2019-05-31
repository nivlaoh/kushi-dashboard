export const getLocation = (cb) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
    return true;
  }
  return false;
};

export const getNearestArea = (myCoord, listOfCoords) => {
  const areaDiff = listOfCoords.map(metadata => {
    const coord = metadata.label_location;
    return {
      area: metadata.name,
      diff: Math.sqrt((myCoord.latitude - coord.latitude) ** 2 + (myCoord.longitude - coord.longitude) ** 2),
    };
  });
  console.log('diff', areaDiff);
  return areaDiff.reduce((prev, curr) => {
    return prev.diff < curr.diff ? prev : curr;
  }).area;
};

export default {
  getLocation,
  getNearestArea,
};
