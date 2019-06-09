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
      getSubject,
      getTransition,
      getTiming,
    } = this.props;
    const {
      subject,
    } = this.state;
    getSubject();
    getTransition();
    getTiming();
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
    const {
      subject,
      transition,
      timing,
    } = this.props;
    const newState = {};
    if (nextProps.images.length < nextProps.maxImages) {
      const sliceImages = nextProps.images
        .filter(image => image.id >= showingImage && image.id <= showingImage + (nextProps.imageBuffer - 1));
      newState.galleryImages = [
        ...sliceImages,
      ];
    }
    if (nextProps.subject !== subject) {
      newState.selectedSubject = nextProps.subject;
    }
    if (nextProps.transition !== transition) {
      newState.selectedTransition = nextProps.transition;
    }
    if (nextProps.timing !== timing) {
      newState.selectedTiming = nextProps.timing;
    }
    this.setState(newState);
  }

  componentWillUnmount() {
    clearInterval(this.rotateImage);
    clearInterval(this.loadImages);
    this.rotateImage = null;
    this.loadImages = null;
  }

  showDialog = () => {
    const {
      loadSubjects,
      loadTransitions,
      loadTimings,
    } = this.props;
    loadSubjects();
    loadTransitions();
    loadTimings();
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
    const {
      setSubject,
      setTransition,
      setTiming,
      subject,
      clearImages,
    } = this.props;
    const {
      selectedSubject,
      selectedTransition,
      selectedTiming,
    } = this.state;
    this.setState({
      showSettings: false,
    });
    if (subject !== selectedSubject) {
      clearImages();
    }
    setSubject(selectedSubject);
    setTransition(selectedTransition);
    setTiming(selectedTiming);
  };

  selectOption = (option, selected) => {
    this.setState({
      [option]: selected,
    });
  };

  render() {
    const {
      subjects,
      transitions,
      timings,
    } = this.props;
    const {
      showingImage,
      galleryImages,
      showSettings,
      selectedSubject,
      selectedTransition,
      selectedTiming,
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
        <div className="widgetSettings">
          <Button type="icon-clear" onClick={this.showDialog} rounded>
            <i className="fa fa-cog"></i>
          </Button>
        </div>
        <Dialog mode="confirm"
          show={showSettings}
          title="Gallery Settings"
          onConfirm={this.changeSettings}
          onDismiss={this.hideDialog}
        >
          <div>
            <MultiSelect
              label="Subject"
              placeholder="Choose a subject"
              options={subjects}
              onChange={(e) => { this.selectOption('selectedSubject', e); }}
              selected={selectedSubject}
            />
            <MultiSelect
              label="Transition"
              placeholder="Choose a transition"
              options={transitions}
              onChange={(e) => { this.selectOption('selectedTransition', e); }}
              selected={selectedTransition}
            />
            <MultiSelect
              label="Timing"
              placeholder="Choose a transition timing"
              options={timings}
              onChange={(e) => { this.selectOption('selectedTiming', e); }}
              selected={selectedTiming}
            />
          </div>
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
  loadSubjects: PropTypes.func,
  loadTransitions: PropTypes.func,
  loadTimings: PropTypes.func,
  setSubject: PropTypes.func,
  setTransition: PropTypes.func,
  setTiming: PropTypes.func,
};

Gallery.defaultProps = {
  images: [],
  maxImages: 100,
  imageBuffer: 3,
  loadSubjects: () => {},
  loadTransitions: () => {},
  loadTimings: () => {},
  setSubject: () => {},
  setTransition: () => {},
  setTiming: () => {},
};

export default Gallery;
