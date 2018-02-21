import React from 'react';
import PropTypes from 'prop-types';

export default class HierarchySelectorAbstractList extends React.PureComponent {
  onSelect = () => {
    /** Template of onSelect event. It should be overridden in a child component */
    this.props.onSelectHandler();
  }
}

HierarchySelectorAbstractList.propTypes = {
  onSelectHandler: PropTypes.func,
};

HierarchySelectorAbstractList.defaultProps = {
  onSelectHandler: () => {},
};
