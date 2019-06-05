import { GET_PROFILE_PIC, UPLOAD_PROFILE_PIC, GET_COUNTRIES } from './types';

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
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
      };
    default:
      return state;
  }
};

export default reducer;
