import React from 'react';
import PropTypes from 'prop-types';

export default class HierarchySelectorSelectButton extends React.PureComponent {
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item"><button className="btn-open-view" onClick={this.props.onClick}>{this.props.label}</button></li>
      </ul>
    );
  }
}

HierarchySelectorSelectButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
};

HierarchySelectorSelectButton.defaultProps = {
  label: 'Select...',
  onClick: () => {},
};
