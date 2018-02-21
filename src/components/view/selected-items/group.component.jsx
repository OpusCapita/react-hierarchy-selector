/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import HSBadge from '../../badge';

export default class GroupItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  getIcon = () => {
    const classes = className({
      fa: true,
      'fa-caret-down': !this.state.collapsed,
      'fa-caret-right': this.state.collapsed,
    });
    return <i className={classes} />;
  }

  getRemoveIcon() {
    return this.props.removable ?
      <span className="component-icon clickable" onClick={this.removeClickHandler}>
        <i className="fa fa-trash" />
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
        {this.getIcon()}
        <span>{title}</span>
        <div className="right-block">
          {selecteAllContent}
          <HSBadge className="badge-orange">{count}</HSBadge>
          {this.getRemoveIcon()}
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
