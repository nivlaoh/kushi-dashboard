import actions from './actions';

const sendEmail = (message) => (dispatch) => {
  dispatch(actions.sendEmail(message));
};

export default {
  sendEmail,
};
