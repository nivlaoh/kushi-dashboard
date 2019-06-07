import types from './types';

export const getWidgets = (widgets) => {
  return {
    type: types.GET_WIDGETS,
    widgets,
  };
};

export const closeWidget = (index) => {
  return {
    type: types.CLOSE_WIDGET,
    index,
  };
};

export default {
  getWidgets,
  closeWidget,
};
