import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styles from './styles.css';

class CardTitle extends Component {
  render() {

    return (
      <div className="title">
        {this.props.children}
      </div>
    );
  }
}

CardTitle.propTypes = {
  children: PropTypes.node,
};

export default CardTitle;
