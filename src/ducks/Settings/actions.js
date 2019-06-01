import types from './types';

const uploadProfilePicture = (image) => {
  return {
    type: types.UPLOAD_PROFILE_PIC,
    image,
  };
};

export default {
  uploadProfilePicture,
};
