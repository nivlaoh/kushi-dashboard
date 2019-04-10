import PropTypes from 'prop-types';

const DashboardWidget = PropTypes.shape({
  id: PropTypes.string,
  columns: PropTypes.number,
  rows: PropTypes.number,
  background: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(['site', 'plugin']),
  url: PropTypes.string,
});

export default DashboardWidget;
