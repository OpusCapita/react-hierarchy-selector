/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaCaretRight, FaCaretDown } from 'react-icons/fa';

import HSBadge from '../../badge';

export default class GroupItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  getIcon = () => (this.state.collapsed ? <FaCaretRight /> : <FaCaretDown />);

  getRemoveIcon() {
    return this.props.removable ?
      <span className="component-icon clickable" onClick={this.removeClickHandler}>
        <FaTrashAlt />
      </span>
      : null;
  }

  clickHanlder = (e) => {
    e.preventDefault();
    this.toggleCollapse();
  }

  removeClickHandler = (e) => {
    e.stopPropagation();
    this.props.onRemoveClick(this.props.sourceId, this.props.referenceIds.slice());
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const content = !this.state.collapsed ? this.props.children : null;
    const { count, title, selectedAll } = this.props;

    const selecteAllContent = selectedAll ?
      <span>{this.props.allLabel}</span> : null;

    return (
      <li className="group-list-item" onClick={this.clickHanlder}>
        <div className="title-block">
          <div className="left-block">
            {this.getIcon()}
            <span>{title}</span>
          </div>
          <div className="right-block">
            {selecteAllContent}
            <HSBadge className="badge-orange">{count}</HSBadge>
            {this.getRemoveIcon()}
          </div>
        </div>
        {content}
      </li>
    );
  }
}

GroupItem.propTypes = {
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  count: PropTypes.number.isRequired,
  children: PropTypes.node,
  referenceIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  removable: PropTypes.bool.isRequired,
  sourceId: PropTypes.string.isRequired,
  selectedAll: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func,
};

GroupItem.defaultProps = {
  allLabel: 'All',
  children: null,
  referenceIds: [],
  onRemoveClick: () => {},
};
