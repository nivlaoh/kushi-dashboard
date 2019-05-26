import React, { Component } from 'react';
import MultiSelect from '../../shared/components/MultiSelect';

class System extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sessionLengths = [
      {
        key: '30',
        value: '30 minutes',
      },
      {
        key: '60',
        value: '60 minutes',
      },
    ];
    return (
      <div>
        <div className="form-label">Login Session</div>
        <MultiSelect placeholder="Select timing" options={sessionLengths} />
      </div>
    );
  }
}

export default System;
