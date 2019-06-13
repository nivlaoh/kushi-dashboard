export const getLocation = (cb) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
    return true;
  }
  return false;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1); 
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

export const getNearestArea = (myCoord, listOfCoords) => {
  const areaDiff = listOfCoords.map(metadata => {
    const coord = metadata.label_location;
    return {
      area: metadata.name,
      diff: getDistanceFromLatLonInKm(myCoord.latitude, myCoord.longitude, coord.latitude, coord.longitude),
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
