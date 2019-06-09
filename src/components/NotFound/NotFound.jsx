import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, CardBody } from '../../shared/components/Card';
import './styles.scss';

const NotFound = (props) => {
  const {
    history,
  } = props;
  return (
    <div className="pageWrapper">
      <Card className="infoCard">
        <CardBody>
          <FontAwesomeIcon icon={faExclamationTriangle} /> Oops, page not found. Please contact the administrator for more information.
          <div className="redirectHelp">
            <a href="javascript:" onClick={() => {history.go(-1)}}>
              Click here to return
            </a>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default NotFound;
