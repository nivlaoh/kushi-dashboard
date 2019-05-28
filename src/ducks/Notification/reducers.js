import { SEND_EMAIL } from './types';

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        message: action.message,
        status: true,
      };
    default:
      return state;
  }
};

export default notificationReducer;
