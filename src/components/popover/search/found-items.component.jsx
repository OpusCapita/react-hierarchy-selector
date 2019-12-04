/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

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
          {this.props.itemRenderFunction ?
            this.props.itemRenderFunction(item, this.defaultItemRenderFunction) :
            this.defaultItemRenderFunction(item)
          }
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

  getIcon = () => (this.state.collapsed ? <FaCaretRight /> : <FaCaretDown />);

  defaultItemRenderFunction = item => (<span>{item.name}</span>);

  selectItem = (key) => {
    const flags = {
      interactive: true,
    };
    this.props.onSelect(this.props.data[key], flags);
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
  itemRenderFunction: PropTypes.func,
};

PopoverFoundItems.defaultProps = {
  onSelect: () => {},
  data: [],
  itemRenderFunction: null,
};
