/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import { hierarchyItemListShape } from '../../../types';
import { CLASS_NAME_SEARCH_FOCUSABLE } from '../constants';

export default class PopoverFoundItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onGroupClickHanlder = (e) => {
    e.preventDefault();
    this.toggleCollapse();
  }

  onClickHanlder = (e, key) => {
    e.preventDefault();
    this.selectItem(key);
  }

  onEnterPressed = (e, key) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.selectItem(key);
    }
  }

  getItems = () => {
    const { data } = this.props;

    const itemRenderer = (index, key) => {
      const item = data[index];
      return (
        <div
          className={`list-group-item found-item ${CLASS_NAME_SEARCH_FOCUSABLE}`}
          key={key}
          tabIndex="0"
          onKeyDown={e => this.onEnterPressed(e, index)}
          onClick={e => this.onClickHanlder(e, index)}
        >
          {item.name}
        </div>
      );
    };

    return (
      <ReactList
        itemRenderer={itemRenderer}
        length={data.length}
        type="uniform"
        useStaticSize
      />
    );
  }

  getIcon = () => {
    const className = `fa fa-${this.state.collapsed ? 'caret-right' : 'caret-down'}`;
    return <i className={className} />;
  };

  selectItem = (key) => {
    this.props.onSelect(this.props.data[key]);
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <li className="list-group-item found-group-item" onClick={this.onGroupClickHanlder}>
        {this.getIcon()}
        <span>{this.props.groupName}</span>
        {!this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null}
      </li>
    );
  }
}

PopoverFoundItems.propTypes = {
  onSelect: PropTypes.func,
  groupName: PropTypes.string.isRequired,
  data: hierarchyItemListShape,
};

PopoverFoundItems.defaultProps = {
  onSelect: () => {},
  data: [],
};
