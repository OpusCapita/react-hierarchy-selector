/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import { hierarchyItemShape } from '../../../types';

export default class Item extends React.PureComponent {

  getRemoveIcon() {
    return this.props.removable ?
      <span className="component-icon clickable" onClick={this.removeClickHandler}>
        <i className="fa fa-trash-o" />
      </span>
      : null;
  }

  clickHanlder = (e) => {
    e.stopPropagation();
  }

  removeClickHandler = (e) => {
    const { onRemoveClick, item, sourceId, referenceIds } = this.props;
    e.stopPropagation();
    onRemoveClick(sourceId, referenceIds.slice(), item.id);
  }

  defaultItemRenderFunction = () => {
    const { item } = this.props;
    return (
      <span>
        {item.name}
      </span>
    );
  }

  render() {
    const { item, itemRenderFunction } = this.props;
    return (
      <div className="selected-item" onClick={this.clickHanlder}>
        {itemRenderFunction ?
          itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()}
        <div className="right-block">
          {this.getRemoveIcon()}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: hierarchyItemShape.isRequired,
  itemRenderFunction: PropTypes.func,
  removable: PropTypes.bool.isRequired,
  sourceId: PropTypes.string.isRequired,
  referenceIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onRemoveClick: PropTypes.func,
};

Item.defaultProps = {
  onRemoveClick: () => {},
  itemRenderFunction: null,
  referenceIds: [],
};
