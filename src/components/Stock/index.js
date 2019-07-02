import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { operations } from '../../ducks/Stock';
import Stock from './Stock';

const mapStateToProps = (state, ownProps) => {
  return {
    stockPrices: isEmpty(state.stock.stock) ? [] : Object.values(state.stock.stock.timeSeries),
    symbol: isEmpty(state.stock.metadata) ? undefined : state.stock.metadata.symbol,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getStockInfo: (symbol) => operations.getStockInfo(symbol)(dispatch),
  changeStockSymbol: (symbol) => operations.changeStockSymbol(symbol)(dispatch),
});

const WidgetContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Stock));

export default WidgetContainer;
