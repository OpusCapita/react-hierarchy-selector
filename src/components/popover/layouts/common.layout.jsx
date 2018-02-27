import React from 'react';
import PropTypes from 'prop-types';

export default class HSPopoverCommonLayout extends React.PureComponent {
  render() {
    return (
      <div className="oc-hierarchy-selector-popover-layout">
        { this.props.children }
      </div>
    );
  }
}

HSPopoverCommonLayout.propTypes = {
  children: PropTypes.node,
};

HSPopoverCommonLayout.defaultProps = {
  children: null,
};
