import types from './types';

export const getStockInfo = (stockInfo) => ({
  type: types.GET_STOCK_INFO,
  stock: stockInfo,
});

export default {
  getStockInfo,
};
