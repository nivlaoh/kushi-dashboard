import types from './types';

const sendEmail = (message) => {
  return {
    type: types.SEND_EMAIL,
    message,
  };
};

export default {
  sendEmail,
};
