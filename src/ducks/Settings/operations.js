import actions from './actions';
import { getBase64 } from '../../utils/browserUtil';

const getProfilePic = () => (dispatch) => {
  const profilePicFile = JSON.parse(localStorage.getItem('profilePic'));
  if (profilePicFile === null) {
    console.log('no profile pic');
    return;
  }
  const restoredProfilePic = {
    ...profilePicFile,
    ref: {
      ...profilePicFile.ref,
    },
  };
  dispatch(actions.getProfilePicture(restoredProfilePic));
};

const uploadProfilePic = (file) => (dispatch) => {
  console.log('here', file);
  getBase64(file.ref).then(data => {
    const saveValue = {
      ...file,
      ref: {
        name: file.ref.name,
        size: file.ref.size,
        type: file.ref.type,
        lastModified: file.ref.lastModified,
        lastModifiedDate: file.ref.lastModifiedDate,
        payload: data,
      },
    };
    localStorage.setItem('profilePic', JSON.stringify(saveValue));
    dispatch(actions.uploadProfilePicture(saveValue));
  });
};

export default {
  getProfilePic,
  uploadProfilePic,
};
