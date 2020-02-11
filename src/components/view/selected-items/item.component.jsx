/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { hierarchyItemShape } from '../../../types';

export default class Item extends React.PureComponent {
  getRemoveIcon() {
    return this.props.removable ?
      <span className="component-icon clickable" onClick={this.removeClickHandler}>
        <FaTrashAlt />
      </span>
      : null;
  }

  clickHanlder = (e) => {
    e.stopPropagation();
  }

  removeClickHandler = (e) => {
    const {
      onRemoveClick,
      item,
      sourceId,
      referenceIds,
    } = this.props;
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
    const { item, itemRenderFunction, removable } = this.props;
    return (
      <div className="selected-item" onClick={this.clickHanlder}>
        <div className="left-block">
          {itemRenderFunction ?
            itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()}
        </div>
        {removable ?
          <div className="right-block">
            {this.getRemoveIcon()}
          </div> : null
        }
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
