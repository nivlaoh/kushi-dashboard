import React, { Component } from 'react';
import * as d3 from 'd3';
import { event as currentEvent } from 'd3-selection';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import geoJson from '../../../public/data/gadm36_SGP_1.json';
//import roads from '../../../public/data/roads.json';
import './styles.scss';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      translate: [0, 0],
      drag: false,
    };
    this.mapRef = React.createRef();
    this.zoom = d3.zoom()
      .scaleExtent([1, 5])
      //.translateExtent([[-1, -1], [1920, 1320]])
      .on('zoom', this.zoomed);
  }

  componentDidMount() {
    this.drawMap(true);
    d3.select('#content').insert('rect', '#mapWrap')
      .attr('class', 'mouse-capture')
      .attr('x', -5000)
      .attr('y', -5000)
      .attr('width', 15000)
      .attr('height', 15000)
      .style('fill', 'transparent')
      .lower()
      .call(this.zoom);
  }

  zoomed = () => {
    const {k, x, y} = d3.event.transform;
    // This moves the map!
    d3.select('#mapWrap').attr('transform', `translate(${x},${y}) scale(${k})`);
  };

  onDrag = () => {
    console.log('dragging');
    this.setState({
      drag: true,
    });
  };

  onDrop = () => {
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
      });
    }
  };

  clickArea = (d, i, elems) => {
    /* this.setState({
      activeArea: elems[i].id,
    }); */
    elems.forEach(elem => elem.classList.remove('active'));
    elems[i].classList.toggle('active');
  }

  drawMap = (init = false) => {
    const {
      scale,
      translate,
    } = this.state;

    const width = this.mapRef.current.clientWidth;
    const height = this.mapRef.current.clientHeight;

    const projection = d3.geoEquirectangular()
      .scale(scale)
      .translate(translate);
    const geoGenerator = d3.geoPath().projection(projection);

    const b = geoGenerator.bounds(geoJson);
    const s = init ? .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) : scale;
    const t = init ? [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2] : translate;
    // console.log('settings', s, t);
    projection.scale(s).translate(t);

    d3.select('#content g.map')
      .selectAll('path')
      .remove();
    const u = d3.select('#content g.map')
      .selectAll('path')
      .data(geoJson.features);
    u.enter()
      .append('path')
      .attr('id', (d) => `area-${d.properties.NAME_1}`)
      .attr('class', 'area')
      .attr('d', geoGenerator)
      .attr('stroke', '#009624')
      .attr('fill', '#00c853')
      .on('click', (d, i, elems) => { this.clickArea(d, i, elems); });

    const regionLabels = d3.select('#mapWrap')
      .append('g')
      .attr('id', 'regions')
      .attr('class', 'labels');
    regionLabels.selectAll('.regionLabel')
      .data(geoJson.features)
      .enter()
        .append('text')
        .attr('class', 'regionLabel')
        .attr('transform', (d) => (`translate(${geoGenerator.centroid(d)})`))
        .text((d) => (d.properties.NAME_1));

    // const trainStations = buildings.features.filter(f => f.properties.type === 'train_station');
    /* const roadsToShow = ['motorway', 'motorway_link', 'trunk'];
    const trainStations = roads.features.filter(r => roadsToShow.includes(r.properties.type));
    const stnPath = d3.select('#mapWrap')
      .append('g')
      .attr('class', 'overlay')
      .selectAll('path')
      .data(trainStations);
    stnPath.enter()
      .append('path')
      .attr('id', (d) => `overlay-${d.properties.name}`)
      .attr('d', geoGenerator)
      .attr('stroke', 'black')
      .attr('stroke-width', '0.2')
      .attr('stroke-opacity', 0.5)
      .attr('fill', 'none'); */

    /* const labels = d3.select('#mapWrap')
      .append('g')
      .attr('class', 'labels');
    labels.selectAll('.locationLabel').data(trainStations).enter()
      .append('text')
      .attr('class', 'locationLabel')
      .attr('style', 'font-size: 8px')
      .attr('transform', (d) => {
        return `translate(${geoGenerator.centroid(d)})`;
      })
      .style('text-anchor', 'middle')
      .text((d) => (d.properties.name)); */


    if (init) {
      this.setState({
        scale: s,
        translate: t,
      });
    }
  };

  zoomIn = () => {
    const rect = d3.select('rect.mouse-capture');
    rect.transition().duration(500).call(this.zoom.scaleBy, 2);
  };

  zoomOut = () => {
    const rect = d3.select('rect.mouse-capture');
    rect.transition().duration(500).call(this.zoom.scaleBy, -2);
  };

  render() {
    const width = this.mapRef.current ? this.mapRef.current.clientWidth : 0;
    const height = this.mapRef.current ? this.mapRef.current.clientHeight - 2 : 0;
    return (
      <div className="mapContainer" ref={this.mapRef}>
        <div className="widgetName">Map</div>
        <svg
          width={width}
          height={height}
          id="content"
          preserveAspectRatio="xMidYMid meet"
        >
          <g id="mapWrap">
            <g className="map"></g>
          </g>
        </svg>
        <div className="mapButtons">
          <button type="button" id="zoomIn" className="mapBtn" title="Zoom In" onClick={this.zoomIn}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" id="zoomOut" className="mapBtn" title="Zoom Out" onClick={this.zoomOut}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      </div>
    );
  }
}

export default Map;
