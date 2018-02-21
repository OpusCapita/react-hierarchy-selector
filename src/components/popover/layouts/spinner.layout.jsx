import React from 'react';
import { Spinner } from '@opuscapita/react-spinner';

import CommonLayout from './common.layout';

export default class HSSpinnerLayout extends React.PureComponent {
  render() {
    return (
      <CommonLayout>
        <Spinner />
      </CommonLayout>
    );
  }
}
