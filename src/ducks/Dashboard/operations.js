import actions from './actions';
import widgetData from '../../components/Dashboard/widget.json';

const getWidgets = () => (dispatch) => {
  dispatch(actions.getWidgets(widgetData));
}

const closeWidget = (index) => (dispatch) => {
  dispatch(actions.closeWidget(index));
};

export default {
  getWidgets,
  closeWidget,
};
