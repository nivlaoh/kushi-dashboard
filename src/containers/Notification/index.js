import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Notification from '../../components/Notification';
import { operations } from '../../ducks/Notification';

const onRead = () => {
};

const mapStateToProps = (state, ownProps) => {
  return {
    showToast: state.notification.status,
    messages: state.notification.messages,
  };
};

const mapDispatchToProps = dispatch => ({
  getMessages: (cb) => operations.getEmails(cb)(dispatch),
  deleteMessage: (message) => operations.deleteEmail(message)(dispatch),
  onRead,
  onSend: (message) => operations.sendEmail(message)(dispatch),
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Notification));

export default NotificationContainer;
