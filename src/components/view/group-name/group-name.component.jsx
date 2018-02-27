import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import './group-name.scss';

export default class GroupName extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changedByUser: props.initialValue.trim() !== '',
      value: props.initialValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.changedByUser) {
      const newValue = nextProps.initialValue;
      this.setState({
        value: newValue,
      });
    }
  }

  changeHandler = (e) => {
    this.setState({
      changedByUser: true,
      value: e.target.value,
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="oc-hierarchy-selector-group-name-wrapper">
        <p>{this.props.label}</p>
        <FormControl
          type="text"
          placeholder={this.props.placeHolder}
          onChange={this.changeHandler}
          value={this.state.value}
        />
      </div>
    );
  }
}

GroupName.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeHolder: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

GroupName.defaultProps = {
  label: 'Group name',
  placeHolder: 'Please, fill a group name',
  initialValue: '',
  onChange: () => {},
};
