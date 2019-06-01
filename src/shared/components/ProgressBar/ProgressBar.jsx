import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const ProgressBar = (props) => {
  const {
    percentage,
    size,
    showPercentage,
  } = props;
  return (
    <div className="progressWrapper">
      <div className={`progressBase ${size}`}>
        <div className="progressBar" style={{ width: `${percentage}%` }}>
        </div>
      </div>
      { showPercentage &&
        <div className="progressText">
          {percentage > 100 ? 100 : Math.round(percentage)}%
        </div>
      }
    </div>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.oneOf(['normal', 'huge']),
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
};

ProgressBar.defaultProps = {
  size: 'normal',
  percentage: 0,
  showPercentage: false,
};

export default ProgressBar;
