import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/components/Button';
import Dialog from '../../shared/components/Dialog';
import MultiSelect from '../../shared/components/MultiSelect';
import './styles.scss';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.galleryRef = React.createRef();
    this.loadImages = null;

    this.state = {
      showingImage: 0,
      galleryImages: [],
      subject: 'shibes',
      showSettings: false,
    };
  }

  componentDidMount() {
    const {
      getImages,
    } = this.props;
    const {
      subject,
    } = this.state;
    this.loadImages = setInterval(() => {
      getImages(10, subject).then(() => {
        if (this.rotateImage) {
          clearInterval(this.rotateImage);
        }
        this.rotateImage = setInterval(() => {
          const {
            images,
            maxImages,
            imageBuffer,
          } = this.props;
          const {
            showingImage,
          } = this.state;

          if (images.length !== 0) {
            console.log('Showing', (showingImage + 1) % images.length, 'of', images.length);
            const sliceImages = images
              .filter(image => image.id >= showingImage && image.id <= showingImage + (imageBuffer - 1));

            if (this.loadImages !== null && images.length >= maxImages) {
              console.log('Max images reached, stop loading more');
              clearInterval(this.loadImages);
              this.loadImages = null;
            }

            this.setState({
              showingImage: (showingImage + 1) % maxImages,
              galleryImages: [
                ...sliceImages,
              ],
            });
          }
        }, 5000);
      });
    }, 20000);
  }

  componentWillReceiveProps(nextProps) {
    const {
      showingImage,
    } = this.state;
    if (nextProps.images.length < nextProps.maxImages) {
      const sliceImages = nextProps.images
        .filter(image => image.id >= showingImage && image.id <= showingImage + (nextProps.imageBuffer - 1));
      this.setState({
        galleryImages: [
          ...sliceImages,
        ],
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.rotateImage);
    clearInterval(this.loadImages);
    this.rotateImage = null;
    this.loadImages = null;
  }

  showDialog = () => {
    this.setState({
      showSettings: true,
    });
  };

  hideDialog = () => {
    this.setState({
      showSettings: false,
    });
  };

  changeSettings = () => {
    console.log('change settings');
    this.setState({
      showSettings: false,
      subject: 'cats',
    });
  };

  render() {
    const {
      showingImage,
      galleryImages,
      showSettings,
    } = this.state;

    return (
      <div className="widgetWrapper">
        <div className="widgetName">Gallery</div>
        <div className="gallery" ref={this.galleryRef}>
          { galleryImages.filter(image => image !== '').map((image) => (
            <div key={image.id} className={`galleryImage${image.id === showingImage ? ' active' : ''}`}>
              <div style={{ backgroundImage: `url(${image.src})` }} alt="Shiba Inus" />
            </div>))
          }
          { galleryImages.length === 0 &&
            <div><i className="fa fa-2x fa-circle-o-notch fa-spin"></i></div>
          }
        </div>
        <div className="infoRow">
          <Button type="icon-clear" onClick={this.showDialog} rounded>
            <i className="fa fa-cog"></i>
          </Button>
        </div>
        <Dialog mode="confirm"
          show={showSettings}
          onConfirm={this.changeSettings}
          onDismiss={this.hideDialog}
        >
          Subject
          <MultiSelect placeholder="Please choose a subject" />
        </Dialog>
      </div>
    );
  }
}

Gallery.propTypes = {
  getImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
  })),
  maxImages: PropTypes.number,
  imageBuffer: PropTypes.number,
};

Gallery.defaultProps = {
  images: [],
  maxImages: 100,
  imageBuffer: 3,
};

export default Gallery;
