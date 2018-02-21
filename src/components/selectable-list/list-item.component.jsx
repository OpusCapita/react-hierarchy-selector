/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Checkbox from './checkbox.component';
import { hierarchyItemShape } from '../../types';

function defaultItemRenderFunction(item) {
  return (
    <span>
      {item.name}
    </span>
  );
}

export default class ListItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    const { checked, checkDisabled, selected, item } = this.props;

    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;

    return false;
  }

  clickHandler = (event) => {
    this.props.onClick(this.props.item.id, event);
  }

  checkHandler = (checkState) => {
    this.props.onCheck(this.props.item.id, checkState);
  }

  render() {
    const names = classNames({
      'oc-selectable-list-item': true,
      selected: this.props.selected,
    });
    return (
      <div className={names} onClick={this.clickHandler} >
        <div className="oc-selectable-list-item-container">
          <Checkbox
            disabled={this.props.checkDisabled}
            onCheck={this.checkHandler}
            checked={this.props.checked}
          />
          <div className="oc-list-item-text-container">
            {this.props.itemRenderFunction ?
              this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) :
              defaultItemRenderFunction(this.props.item)
            }
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  checked: PropTypes.bool,
  checkDisabled: PropTypes.bool,
  item: hierarchyItemShape.isRequired,
  itemRenderFunction: PropTypes.func,
  selected: PropTypes.bool,
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
};

ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: () => {},
  onClick: () => {},
};
