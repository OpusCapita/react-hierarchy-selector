import React from 'react';
import ExampleComboBox from '../components/example-combo-box.component';
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
      <h4>Example of HierarchySelectorComboBox:</h4>
      <div className="example-input-row w30 oc-flex-row">
        <span className="example-input-label">Select items (prechecked):</span>
        <div className="example-input-control">
          <ExampleComboBox usePrechecked />
        </div>
      </div>
      <div className="example-input-row w30 oc-flex-row">
        <span className="example-input-label">Select items (empty):</span>
        <div className="example-input-control">
          <ExampleComboBox />
        </div>
      </div>
      <hr />
      <h4>Example of HierarchySelectorView:</h4>
      <div className="example-input-row w100 h100 oc-flex-row">
        <span className="example-input-label">Select items:</span>
        <div className="example-input-control">
          <div className="example-view-wrapper">
            <ExampleView />
          </div>
        </div>
      </div>
    </div>
  </div>
);
