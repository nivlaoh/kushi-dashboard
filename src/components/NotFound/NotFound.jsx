import React, { Component } from 'react';

import { Card, CardBody } from '../../shared/components/Card';
import styles from './styles.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="pageWrapper">
        <Card className="infoCard">
          <CardBody>
            <i className="fa fa-exclamation-triangle"></i> Oops, page not found. Please contact the administrator for more information.
            <div className="redirectHelp">
              <a href="javascript:" onClick={(e) => {this.props.history.go(-1)}}>
                Click here to return
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default NotFound;
