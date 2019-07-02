import {
  GET_STOCK_INFO,
  CHANGE_STOCK_SYMBOL,
} from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_STOCK_INFO:
      return {
        ...state,
        stock: action.stock,
      };
    case CHANGE_STOCK_SYMBOL:
      return {
        ...state,
        symbol: action.symbol,
      };
    default:
      return state;
  }
};

export default reducer;
