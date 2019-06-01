import { GET_PROFILE_PIC, UPLOAD_PROFILE_PIC } from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_PIC:
      return {
        ...state,
        profilePic: action.image,
      };
    case UPLOAD_PROFILE_PIC:
      return {
        ...state,
        profilePic: action.image,
      };
    default:
      return state;
  }
};

export default reducer;
