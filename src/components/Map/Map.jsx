import React, { Component } from 'react';
import * as d3 from 'd3';

import geoJson from '../../../public/data/Singapore.geojson';
import logger from '../../utils/logger';
import './styles.scss';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      translate: [0, 0],
      bounds: null,
      drag: false,
    };
  }

  componentDidMount() {
    d3.select('#mapWrap').attr('pointer-events', 'none');
    this.drawMap(true);
    const contentWrap = d3.select('#mapWrap');
    const zoomed = () => {
      const {k, x, y} = d3.event.transform;
      // This moves the map!
      contentWrap.attr('transform', `translate(${x},${y}) scale(${k})`);
    };
    const zoom = d3.zoom()
      .scaleExtent([1, 5])
      .translateExtent([[-1, -1], [1920-500, 1320-500]])
      .on('zoom', zoomed);

    d3.select('#content').append('rect')
      .attr('class', 'mouse-capture')
      .attr('x', -5000)
      .attr('y', -5000)
      .attr('width', 15000)
      .attr('height', 15000)
      .style('fill', 'transparent')
      .lower()
      .call(zoom);
  }

  onDrag = (e) => {
    console.log('dragging');
    this.setState({
      drag: true,
    });
  };

  onDrop = (e) => {
    console.log('dropping');
    this.setState({
      drag: false,
    });
  };

  dragMap = (e) => {
    const {
      drag,
      translate,
    } = this.state;
    if (drag) {
      console.log('moving');
      this.setState({
        translate: [ e.clientX - translate[0], e.clientY - translate[1] ],
      }, () => { this.drawMap() });
    }
  };

  drawMap = (init = false) => {
    const {
      scale,
      translate,
    } = this.state;

    const width = 748;
    const height = 398;

    const projection = d3.geoEquirectangular()
      .scale(scale)
      .translate(translate);
    const geoGenerator = d3.geoPath().projection(projection);
    logger('geoJson', 'INFO', geoJson);

    const b = geoGenerator.bounds(geoJson);
    const s = init ? .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) : scale;
    const t = init ? [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2] : translate;
    console.log('settings', s, t);
    projection.scale(s).translate(t);

    d3.select('#content g.map')
      .selectAll('path')
      .remove();
    const u = d3.select('#content g.map')
      .selectAll('path')
      .data(geoJson.features);
    u.enter()
      .append('path')
      .attr('id', 'testpath')
      .attr('d', geoGenerator)
      .attr('stroke', '#009624')
      .attr('fill', '#00c853');

    if (init) {
      this.setState({
        scale: s,
        translate: t,
        bounds: b,
      });
    }
  };

  zoomIn = () => {
    const {
      scale,
    } = this.state;
    this.setState({
      scale: scale * 1.001,
    }, () => { this.drawMap() });
  };

  zoomOut = () => {
    const {
      scale,
    } = this.state;
    this.setState({
      scale: scale * 0.999,
    }, () => { this.drawMap() });
  };

  render() {
    return (
      <div className="mapContainer">
        <div className="widgetTitle">Map</div>
        <svg
          width="748"
          height="398"
          id="content"
          preserveAspectRatio="xMidYMid meet"
        >
          <g id="mapWrap" className="map">
          </g>
        </svg>
        <div className="mapButtons">
          <div id="zoomIn" className="mapBtn" title="Zoom In" onClick={this.zoomIn}>
            <i className="fa fa-plus"></i>
          </div>
          <div id="zoomOut" className="mapBtn" title="Zoom Out" onClick={this.zoomOut}>
            <i className="fa fa-minus"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
