import axios from 'axios';

import actions from './actions';
import { getBase64 } from '../../utils/browserUtil';
import logger from '../../utils/logger';

const getProfilePic = () => (dispatch) => {
  const profilePicFile = JSON.parse(localStorage.getItem('profilePic'));
  if (profilePicFile === null) {
    logger('No profile pic found', 'INFO');
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

const getCountries = () => (dispatch) => {
  axios.get('https://restcountries.eu/rest/v2/all')
    .then((response) => {
      const countries = response.data.map(r => ({ key: r.alpha2Code, value: r.name }));
      dispatch(actions.getCountries(countries));
    })
    .catch((error) => {
      logger('countries error', 'ERROR', error);
    });
}

export default {
  getProfilePic,
  uploadProfilePic,
  getCountries,
};
