import { GET_WIDGETS, CLOSE_WIDGET } from './types';

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WIDGETS:
      return {
        ...state,
        widgets: action.widgets,
      };
    case CLOSE_WIDGET:
      const widgetIndex = state.widgets.findIndex(w => w.id === action.index);
      return {
        ...state,
        widgets: [
          ...state.widgets.slice(0, widgetIndex),
          ...state.widgets.slice(widgetIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default dashboardReducer;
