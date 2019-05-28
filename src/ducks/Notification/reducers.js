import { GET_EMAILS, SEND_EMAIL } from './types';
import messages from '../../components/Dashboard/messages.json';

import { getRandomColours } from '../../utils/StyleUtil';

const msgCopies = messages.map(message => ({ ...message, colour: getRandomColours() }));
console.log('copies', msgCopies);

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
    default:
      return state;
  }
};

export default notificationReducer;
