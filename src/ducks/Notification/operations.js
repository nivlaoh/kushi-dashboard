import actions from './actions';

const getEmails = () => (dispatch) => {
  const test = dispatch(actions.getEmails());
};

const sendEmail = (message) => (dispatch) => {
  dispatch(actions.sendEmail(message));
};

const deleteEmail = (message) => (dispatch) => {
  dispatch(actions.deleteEmail(message));
};

export default {
  getEmails,
  sendEmail,
  deleteEmail,
};
