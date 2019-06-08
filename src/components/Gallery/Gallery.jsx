import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Gallery extends Component {
  componentDidMount() {
    const {
      getImages,
    } = this.props;
    getImages();
  }

  render() {
    const {
      images,
    } = this.props;

    return (
      <div className="widgetWrapper">
        <div className="widgetName">Gallery</div>
        <div className="gallery">
          { images.map(image => (
            <div className="galleryImage">
              <img src={image} alt="Shibe" />
            </div>))
          }
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  getImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({})),
};

Gallery.defaultProps = {
  images: [],
};

export default Gallery;
