import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styles from './styles.css';

class CardFooter extends Component {
  render() {
    const {
      children,
      rightAligned,
    } = this.props;
    return (
      <div className={`footer${rightAligned ? ' right' : ''}`}>
        {children}
      </div>
    );
  }
}

CardFooter.propTypes = {
  children: PropTypes.node,
  rightAligned: PropTypes.bool,
};

export default CardFooter;
