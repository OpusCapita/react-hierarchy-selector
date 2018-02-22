import React from 'react';
import { Spinner } from '@opuscapita/react-spinner';

import { SPINNER_DELAY } from '../constants';
import CommonLayout from './common.layout';

export default class HSSpinnerLayout extends React.PureComponent {
  render() {
    return (
      <CommonLayout>
        <Spinner delay={SPINNER_DELAY} />
      </CommonLayout>
    );
  }
}
