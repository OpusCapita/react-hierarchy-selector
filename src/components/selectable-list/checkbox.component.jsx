/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckSquare, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

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
      icon = this.props.disabled ? <FaCheckSquare /> : <FaRegCheckSquare />;
    } else if (!this.state.checked && !this.props.disabled) {
      icon = <FaRegSquare />;
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
