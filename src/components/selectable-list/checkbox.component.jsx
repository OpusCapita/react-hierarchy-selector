/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const classes = classNames({
      fa: true,
      'fa-check-square-o': this.state.checked && this.props.disabled,
      'fa-check-square': this.state.checked && !this.props.disabled,
      'fa-square-o': !this.state.checked && !this.props.disabled,
    });

    return <i className={classes} />;
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
