import axios from 'axios';
import actions from './actions';

const getStockInfo = (symbol) => (dispatch) => {
  return axios.get(`http://localhost:8080/stocks/${symbol}`)
    .then(response => dispatch(actions.getStockInfo(response.data)))
    .catch(error => console.error(error));
};

export default {
  getStockInfo,
};
