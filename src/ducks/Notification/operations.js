import actions from './actions';

const getEmails = () => (dispatch) => {
  const test = dispatch(actions.getEmails());
  console.log('test', test);
};

const sendEmail = (message) => (dispatch) => {
  dispatch(actions.sendEmail(message));
};

export default {
  getEmails,
  sendEmail,
};
