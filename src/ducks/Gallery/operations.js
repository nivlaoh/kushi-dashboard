import axios from 'axios';
import actions from './actions';

import logger from '../../utils/logger';

const getImages = (num = 10) => (dispatch) => {
  const subject = JSON.parse(localStorage.getItem('subject')) || { key: 'shibes' };
  return axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://shibe.online/api/${subject.key}?count=${num}&urls=true&httpsUrls=true`)
    .then(response => {
      dispatch(actions.getImages(response.data));
    })
    .catch((error) => {
      logger('unable to get images', 'ERROR', error);
    });
};

const clearImages = () => (dispatch) => {
  dispatch(actions.clearImages());
};

const loadSubjects = () => (dispatch) => {
  const subjects = [
    { key: 'shibes', value: 'Shiba Inus' },
    { key: 'cats', value: 'Cats' },
    { key: 'dogs', value: 'Dogs' },
  ];
  dispatch(actions.loadSubjects(subjects));
};

const getSubject = () => (dispatch) => {
  const subject = JSON.parse(localStorage.getItem('subject')) || { key: 'shibes', value: 'Shiba Inu' };
  dispatch(actions.setSubject(subject));
};

const setSubject = (subject) => (dispatch) => {
  localStorage.setItem('subject', JSON.stringify(subject));
  dispatch(actions.setSubject(subject));
};

const loadTransitions = () => (dispatch) => {
  const transitions = [
    { key: 'fade', value: 'Fade' },
    { key: 'slideUp', value: 'Slide Up' },
    { key: 'slideLeft', value: 'Slide Left' },
  ];
  dispatch(actions.loadTransitions(transitions));
};

const getTransition = () => (dispatch) => {
  const transition = JSON.parse(localStorage.getItem('transition')) || { key: 'fade', value: 'Fade' };
  dispatch(actions.setTransition(transition));
};

const setTransition = (transition = { key: 'fade', value: 'Fade' }) => (dispatch) => {
  localStorage.setItem('transition', JSON.stringify(transition));
  dispatch(actions.setTransition(transition));
};

const loadTimings = () => (dispatch) => {
  const timings = [
    { key: '5000', value: '5 seconds' },
    { key: '10000', value: '10 seconds' },
    { key: '30000', value: '30 seconds' },
  ];
  dispatch(actions.loadTimings(timings));
};

const getTiming = () => (dispatch) => {
  const timing = JSON.parse(localStorage.getItem('timing')) || { key: '5000', value: '5 seconds' };
  dispatch(actions.setTiming(timing));
};

const setTiming = (timing = 5000) => (dispatch) => {
  localStorage.setItem('timing', JSON.stringify(timing));
  dispatch(actions.setTiming(timing));
};

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
