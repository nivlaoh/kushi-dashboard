import axios from 'axios';
import actions from './actions';

import logger from '../../utils/logger';

const getImages = (num = 10, subject = 'shibes') => (dispatch) => {
  return axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://shibe.online/api/${subject}?count=${num}&urls=true&httpsUrls=true`)
    .then(response => {
      dispatch(actions.getImages(response.data));
    })
    .catch((error) => {
      logger('unable to get images', 'ERROR', error);
    });
};

export default {
  getImages,
};
