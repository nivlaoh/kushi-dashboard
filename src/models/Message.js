import PropTypes from 'prop-types';

const Message = PropTypes.shape({
  id: PropTypes.string,
  senderName: PropTypes.string,
  senderEmail: PropTypes.string,
  senderIcon: PropTypes.string,
  toEmail: PropTypes.string,
  ccEmail: PropTypes.string,
  bccEmail: PropTypes.string,
  subject: PropTypes.string,
  message: PropTypes.string,
  status: PropTypes.oneOf(['READ', 'UNREAD']),
  colour: PropTypes.string,
});

export default Message;
