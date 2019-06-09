export const getNewImages = (receivedImages, images) => {
  const stateImages = images === undefined ? [] : images;
  const newImages = images === undefined ?
    receivedImages.map((image, index) => ({ id: stateImages.length + index, src: image })) :
    receivedImages.filter(image => images.every(img => img.src !== image))
      .map((image, index) => ({ id: stateImages.length + index, src: image }));
  return newImages;
};

export default {
  getNewImages,
};
