import React, { Component } from 'react';
import * as d3 from 'd3';

import geoJson from '../../../public/data/Singapore.geojson';
import logger from '../../utils/logger';
import './styles.scss';

class Map extends Component {
  componentDidMount() {
    this.drawMap();
  }

  drawMap = () => {
    const projection = d3.geoEquirectangular()
      .scale(1)
      .translate([0,0]);
    const geoGenerator = d3.geoPath().projection(projection);
    const width = 700;
    const height = 400;
    logger('geoJson', 'INFO', geoJson);

    const b = geoGenerator.bounds(geoJson);
    const s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
    const t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);

    const u = d3.select('#content g.map')
      .selectAll('path')
      .data(geoJson.features);
    u.enter()
      .append('path')
      .attr('id', 'testpath')
      .attr('d', geoGenerator)
      .attr('stroke', '#009624')
      .attr('fill', '#00c853');
    const testPath = document.getElementById('testpath');
  };

  render() {
    return (
      <div className="mapContainer">
        Map
        <svg width="700" height="400" id="content" preserveAspectRatio="xMidYMid meet">
          <g className="map">
          </g>
        </svg>
      </div>
    );
  }
}

export default Map;
