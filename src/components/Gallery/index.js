import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Gallery from './Gallery';
import { operations } from '../../ducks/Gallery';

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.gallery.images,
    subject: state.gallery.subject,
    transition: state.gallery.transition,
    timing: state.gallery.timing,
    subjects: state.gallery.subjects,
    transitions: state.gallery.transitions,
    timings: state.gallery.timings,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getImages: () => operations.getImages()(dispatch),
  clearImages: () => operations.clearImages()(dispatch),
  loadSubjects: () => operations.loadSubjects()(dispatch),
  loadTransitions: () => operations.loadTransitions()(dispatch),
  loadTimings: () => operations.loadTimings()(dispatch),
  getSubject: () => operations.getSubject()(dispatch),
  getTransition: () => operations.getTransition()(dispatch),
  getTiming: () => operations.getTiming()(dispatch),
  setSubject: (subject) => operations.setSubject(subject)(dispatch),
  setTransition: (transition) => operations.setTransition(transition)(dispatch),
  setTiming: (timing) => operations.setTiming(timing)(dispatch),
});

const WidgetContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Gallery));

export default WidgetContainer;
