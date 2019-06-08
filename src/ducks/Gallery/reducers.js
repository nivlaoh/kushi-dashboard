import { GET_IMAGES } from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGES:
      const stateImages = state.images === undefined ? [] : state.images;
      const newImages = state.images === undefined ?
        action.images.map((image, index) => ({ id: stateImages.length + index, src: image })) :
        action.images.filter(image => state.images.every(img => img.src !== image))
          .map((image, index) => ({ id: stateImages.length + index, src: image }));
      return {
        ...state,
        images: [
          ...stateImages,
          ...newImages,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
