import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styles from './styles.css';

class CardBody extends Component {
  render() {
    return (
      <div className={`body ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardBody;
