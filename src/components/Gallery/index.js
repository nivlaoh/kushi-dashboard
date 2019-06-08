import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Gallery from './Gallery';
import { operations } from '../../ducks/Gallery';

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.gallery.images,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getImages: () => operations.getImages()(dispatch),
});

const WidgetContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Gallery));

export default WidgetContainer;
