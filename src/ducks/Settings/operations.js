import actions from './actions';

const uploadProfilePic = (image) => (dispatch) => {
  dispatch(actions.uploadProfilePicture(image));
};

export default {
  uploadProfilePic,
};
