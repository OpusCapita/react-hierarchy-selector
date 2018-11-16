import React from 'react';
import Spinner from '@opuscapita/react-spinner';

const DELAY = 50;

export default class SelectorSpinner extends React.PureComponent {
  render() {
    return <Spinner delay={DELAY} />;
  }
}
