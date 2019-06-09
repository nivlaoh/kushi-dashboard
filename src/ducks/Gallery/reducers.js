import {
  GET_IMAGES,
  CLEAR_IMAGES,
  LOAD_SUBJECTS,
  LOAD_TRANSITIONS,
  LOAD_TIMINGS,
  SET_SUBJECT,
  SET_TRANSITION,
  SET_TIMING
} from './types';
import { getNewImages } from './selectors';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        images: [
          ...(state.images || []),
          ...getNewImages(action.images, (state.images || [])),
        ],
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        images: [],
      };
    case LOAD_SUBJECTS:
      return {
        ...state,
        subjects: action.subjects,
      };
    case LOAD_TRANSITIONS:
      return {
        ...state,
        transitions: action.transitions,
      };
    case LOAD_TIMINGS:
      return {
        ...state,
        timings: action.timings,
      };
    case SET_SUBJECT:
      return {
        ...state,
        subject: action.subject,
      };
    case SET_TRANSITION:
      return {
        ...state,
        transition: action.transition,
      };
    case SET_TIMING:
      return {
        ...state,
        timing: action.timing,
      };
    default:
      return state;
  }
};

export default reducer;
