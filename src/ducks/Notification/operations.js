import actions from './actions';

const getEmails = () => (dispatch) => {
  dispatch(actions.getEmails());
};

const sendEmail = (message, cb) => (dispatch) => {
  dispatch(actions.sendEmail(message));
  cb();
};

const deleteEmail = (message) => (dispatch) => {
  dispatch(actions.deleteEmail(message));
};

export default {
  getEmails,
  sendEmail,
  deleteEmail,
};
