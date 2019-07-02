import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './styles.scss';

class Stock extends Component {
  constructor(props) {
    super(props);

    this.stockRef = React.createRef();
    props.getStockInfo(props.symbol)
      .then(data => this.drawChart());
  }

  componentDidMount() {
    this.drawChart();
  }

  componentWillReceiveProps(nextProps) {
    const {
      stockPrices,
    } = this.props;
    if (nextProps.stockPrices !== stockPrices) {
      this.drawChart();
      console.log('redraw', nextProps.stockPrices);
    }
  }

  getCandleHeight = (d) => {
    return Math.abs(d.open - d.close) * 400;
  };

  getWickHeight = (d) => {
    return (d.high - d.low) * 400;
  };

  getRange = () => {
    const {
      stockPrices,
    } = this.props;
    let low = null;
    let high = null;
    stockPrices.forEach(p => {
      if (low === null || p.low < low) {
        low = p.low;
      }
      if (high === null || p.high > high) {
        high = p.high;
      }
    });
    return [low, high];
  }

  drawChart = () => {
    const {
      stockPrices,
    } = this.props;
    const svg = d3.select('#chart');
    svg.selectAll('g').remove();

    const range = this.getRange();
    const getCandleTop = (d) => d.open < d.close ? d.close : d.open;
    console.log('range', range);
    svg.append('g')
      .attr('class', 'candle')
      .selectAll('rect')
      .data(stockPrices)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 15)
      .attr('y', (d) => (range[1] - getCandleTop(d))/(range[1] - range[0]) * 198)
      .attr('width', 10)
      .attr('height', (d) => this.getCandleHeight(d))
      .attr('fill', d => d.open < d.close ? 'green' : 'red');

    svg.append('g')
      .attr('class', 'wick')
      .selectAll('rect')
      .data(stockPrices)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 15 + 4)
      .attr('y', (d) => (range[1] - d.high)/(range[1] - range[0]) * 198)
      .attr('width', 1)
      .attr('height', (d) => this.getWickHeight(d))
      .attr('fill', d => d.open < d.close ? 'green' : 'red');
  };

  render() {
    const width = this.stockRef.current ? this.stockRef.current.clientWidth : 0;
    const height = this.stockRef.current ? this.stockRef.current.clientHeight - 2 : 0;
    return (
      <div className="widgetWrapper" ref={this.stockRef}>
        <div className="widgetName">Stock</div>
        <div className="chartWrapper">
          <svg id="chart" width={width} height={height}>
          </svg>
        </div>
      </div>
    );
  }
}

Stock.propTypes = {
  symbol: PropTypes.string,
  stockPrices: PropTypes.arrayOf(PropTypes.shape({})),
  getStockInfo: PropTypes.func,
};

Stock.defaultProps = {
  symbol: 'MSFT',
  stockPrices: [],
  getStockInfo: () => {},
};

export default Stock;
