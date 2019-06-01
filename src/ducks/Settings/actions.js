import types from './types';

const getProfilePicture = (file) => {
  return {
    type: types.GET_PROFILE_PIC,
    image: file,
  };
}

const uploadProfilePicture = (file) => {
  return {
    type: types.UPLOAD_PROFILE_PIC,
    image: file,
  };
};

export default {
  getProfilePicture,
  uploadProfilePicture,
};
