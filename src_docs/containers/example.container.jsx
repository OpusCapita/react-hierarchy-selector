import React from 'react';
import ExampleView from '../components/example-view.component';
import GithubLogo from '../images/logo-github.svg';

import './example.scss';

export default () => (
  <div className="example-container oc-flex-column">
    <div className="example-header oc-flex-row">
      <h3>React Hierarchy Selector</h3>
      <a
        className="example-git-logo"
        href="https://github.com/OpusCapita/react-hierarchy-selector"
      >
        <span><GithubLogo /></span>
      </a>
    </div>
    <div className="example-content oc-flex-column">
      <div className="example-input-row oc-flex-row">
        <span className="example-input-label">Select items:</span>
        <div className="example-input-control">
          <ExampleView />
        </div>
      </div>
    </div>
  </div>
);
