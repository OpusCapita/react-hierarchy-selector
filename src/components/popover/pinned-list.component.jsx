import React from 'react';
import PropTypes from 'prop-types';

import HierarchySelectorAbstractList from './abstract-list.component';

export default class HierarchySelectorPinnedList extends HierarchySelectorAbstractList {
  render() {
    return (
      <div>
        <p className="list-group-header">{this.props.pinnedGroupLabel}</p>
      </div>
    );
  }
}

HierarchySelectorPinnedList.propTypes = {
  pinnedGroupLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

HierarchySelectorPinnedList.defaultProps = {
  pinnedGroupLabel: 'Pinned items',
};
