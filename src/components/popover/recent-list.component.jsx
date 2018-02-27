import React from 'react';
import PropTypes from 'prop-types';

import HierarchySelectorAbstractList from './abstract-list.component';

export default class HierarchySelectorRecentList extends HierarchySelectorAbstractList {
  render() {
    return (
      <div>
        <p className="list-group-header">{this.props.recentGroupLabel}</p>
      </div>
    );
  }
}

HierarchySelectorRecentList.propTypes = {
  recentGroupLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

HierarchySelectorRecentList.defaultProps = {
  recentGroupLabel: 'Recently used',
};
