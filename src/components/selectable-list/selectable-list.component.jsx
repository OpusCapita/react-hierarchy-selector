import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import ListItem from './list-item.component';
import { hierarchyItemListShape } from '../../types';
import './selectable-list.scss';


export default class SelectableList extends React.PureComponent {

  itemRenderer = (index, key) => {
    const { items, checkDisabled } = this.props;
    const item = items[index];
    const isChildren = item.children && item.children.length > 0;
    const checked = this.props.checkedAll
    || this.props.checkedIds.indexOf(item.id) !== -1;

    return (
      <ListItem
        key={`${key}`}
        checked={checked}
        checkDisabled={checkDisabled || isChildren}
        item={item}
        itemRenderFunction={this.props.itemRenderFunction}
        selected={this.props.selectedId === String(item.id)}
        onCheck={this.props.onCheck}
        onClick={this.props.onClick}
      />);
  }

  render() {
    return (
      <div className="oc-selectable-list-wrapper">
        <div>
          <ReactList
            itemRenderer={this.itemRenderer}
            length={this.props.items.length}
            type="uniform"
            useStaticSize
          />
        </div>
      </div>
    );
  }
}

SelectableList.propTypes = {
  checkedAll: PropTypes.bool,
  items: hierarchyItemListShape,
  itemRenderFunction: PropTypes.func,
  checkedIds: PropTypes.arrayOf(PropTypes.number),
  checkDisabled: PropTypes.bool,
  selectedId: PropTypes.string,
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
};

SelectableList.defaultProps = {
  checkedAll: false,
  items: [],
  itemRenderFunction: null,
  checkedIds: [],
  checkDisabled: false,
  selectedId: null,
  onCheck: () => {},
  onClick: () => {},
};
