/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o';
import FaCheckSquare from 'react-icons/lib/fa/check-square';
import FaSquareO from 'react-icons/lib/fa/square-o';

export default class ItemCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.setState.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  getIcon = () => {
    let icon = null;
    if (this.state.checked) {
      icon = this.props.disabled ? <FaCheckSquareO /> : <FaCheckSquare />;
    } else if (!this.state.checked && !this.props.disabled) {
      icon = <FaSquareO />;
    }

    return icon;
  }

  clickHandler = () => {
    if (!this.props.disabled) {
      const newCheckedState = !this.state.checked;
      this.setState({
        checked: newCheckedState,
      });
      this.props.onCheck(newCheckedState);
    }
  }

  render() {
    return (
      <div className="oc-list-item-checkbox" onClick={this.clickHandler} >
        { this.getIcon() }
      </div>
    );
  }
}

ItemCheckbox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onCheck: PropTypes.func,
};

ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: () => {},
};
