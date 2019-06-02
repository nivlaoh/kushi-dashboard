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
        <MultiSelect placeholder="Select timing" label="Login Session" options={sessionLengths} />
      </div>
    );
  }
}

export default System;
