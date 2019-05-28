import types from './types';

const getEmails = () => {
  return {
    type: types.GET_EMAILS,
  };
};

const sendEmail = (message) => {
  return {
    type: types.SEND_EMAIL,
    message,
  };
};

export default {
  getEmails,
  sendEmail,
};
