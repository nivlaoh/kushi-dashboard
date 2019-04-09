import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { concatClass } from '../../../utils/StyleUtil';

import styles from './styles.css';

class Card extends Component {
  render() {
    return (
      <div className={`card ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: ''
};

export default Card;
