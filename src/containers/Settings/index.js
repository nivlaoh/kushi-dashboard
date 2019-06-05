import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Settings from '../../components/Settings';
import loginOperations from '../../ducks/Login/operations';
import operations from '../../ducks/Settings/operations';

const mapStateToProps = (state, ownProps) => {
  return {
    user: {
      ...state.login,
      profilePic: state.settings.profilePic,
    },
    countries: state.settings.countries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadProfilePic: (image) => operations.uploadProfilePic(image)(dispatch),
  getProfilePic: () => operations.getProfilePic()(dispatch),
  getUserInfo: () => loginOperations.getUserInfo()(dispatch),
  updateUserInfo: (field, value) => loginOperations.updateUserInfo(field, value)(dispatch),
  getCountries: () => operations.getCountries()(dispatch),
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));

export default SettingsContainer;
