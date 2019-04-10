import PropTypes from 'prop-types';

const SidebarLink = PropTypes.shape({
  label: PropTypes.string,
  route: PropTypes.string,
  icon: PropTypes.string,
  run: PropTypes.func,
});

export default SidebarLink;
