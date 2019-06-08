import axios from 'axios';
import actions from './actions';

import logger from '../../utils/logger';

const getImages = (num = 10) => (dispatch) => {
  axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://shibe.online/api/shibes?count=${num}&urls=true&httpsUrls=true`, { crossDomain: true })
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
