import { GET_IMAGES } from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        images: action.images,
      };
    default:
      return state;
  }
};

export default reducer;
