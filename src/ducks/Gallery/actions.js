import types from './types';

const getImages = (images = []) => ({
  type: types.GET_IMAGES,
  images,
});

const clearImages = () => ({
  type: types.CLEAR_IMAGES,
});

const loadSubjects = (subjects = []) => ({
  type: types.LOAD_SUBJECTS,
  subjects,
});

const getSubject = (subject) => ({
  type: types.GET_SUBJECT,
  subject,
});

const setSubject = (subject) => ({
  type: types.SET_SUBJECT,
  subject,
});

const loadTransitions = (transitions = []) => ({
  type: types.LOAD_TRANSITIONS,
  transitions,
});

const getTransition = (transition) => ({
  type: types.GET_TRANSITION,
  transition,
});

const setTransition = (transition) => ({
  type: types.SET_TRANSITION,
  transition,
});

const loadTimings = (timings = []) => ({
  type: types.LOAD_TIMINGS,
  timings,
});

const getTiming = (timing) => ({
  type: types.GET_TIMING,
  timing,
});

const setTiming = (timing) => ({
  type: types.SET_TIMING,
  timing,
});

export default {
  getImages,
  clearImages,
  loadSubjects,
  getSubject,
  setSubject,
  loadTransitions,
  getTransition,
  setTransition,
  loadTimings,
  getTiming,
  setTiming,
};
