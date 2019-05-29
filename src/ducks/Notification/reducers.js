import { GET_EMAILS, SEND_EMAIL, DELETE_EMAIL } from './types';
import messages from '../../components/Dashboard/messages.json';

import { getRandomColours } from '../../utils/StyleUtil';

const msgCopies = messages.map(message => ({ ...message, colour: getRandomColours() }));

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMAILS:
      return {
        ...state,
        messages: msgCopies,
      };
    case SEND_EMAIL:
      return {
        ...state,
        message: action.message,
        status: true,
      };
    case DELETE_EMAIL:
      const id = state.messages.findIndex(msg => msg.id === action.message.id);
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, id),
          ...state.messages.slice(id + 1),
        ],
      }
    default:
      return state;
  }
};

export default notificationReducer;
