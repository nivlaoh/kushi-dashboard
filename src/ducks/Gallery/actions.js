import types from './types';

const getImages = (images = []) => ({
  type: types.GET_IMAGES,
  images,
});

export default {
  getImages,
};
