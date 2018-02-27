import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import CheckedItemHashList from '../../../models/checked-items/checked-item-hash-list';
import GroupItem from './group.component';
import Item from './item.component';
import './selected-items.scss';

export default class SelectedItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkedItemsLastUpdate: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkedItemLists && nextProps.checkedItemLists.length > 0) {
      const lastUpdated = this.getLastUpdateStamp(nextProps.checkedItemLists);
      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated,
        });
      }
    }
  }

  getLastUpdateStamp = checkedItemHashLists => (
    checkedItemHashLists
      .map(item => item.getLastUpdateStamp())
      .join('-')
  )

  getGroupItem = (listId, checkedItemsHashList) => {
    const list = [];
    Object.keys(checkedItemsHashList).forEach((key) => {
      const checkedItemsHash = checkedItemsHashList[key];
      const parents = checkedItemsHash.getParents();
      const parentIds = parents.map(p => p.id);
      const checkedItems = checkedItemsHash.getCheckedItems();
      const isCheckedAll = checkedItemsHash.isCheckedAll();
      const isItemRemovable = !isCheckedAll;
      const title = parents.map(p => p.name).join(' / ');

      const itemRenderer = (index, itemKey) => {
        const selectedItem = checkedItems[index];
        return (
          <Item
            item={Object.assign({}, selectedItem)}
            key={`${itemKey}`}
            removable={isItemRemovable}
            referenceIds={parentIds}
            sourceId={listId}
            itemRenderFunction={this.props.itemRenderFunction}
            onRemoveClick={this.itemRemoveClickHandler}
          />
        );
      };

      list.push((
        <GroupItem
          allLabel={this.props.allLabel}
          count={checkedItems ? checkedItems.length : 0}
          key={`${listId}-${key}`}
          title={title}
          removable
          selectedAll={isCheckedAll}
          referenceIds={parentIds}
          sourceId={listId}
          onRemoveClick={this.groupRemoveClickHandler}
        >
          <ReactList
            itemRenderer={itemRenderer}
            length={checkedItems.length}
            type="uniform"
            useStaticSize
          />
        </GroupItem>
      ));
    });
    return list;
  }

  getcheckedItemsHashList = (listId) => {
    const checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];
    return checkedItemsHashLists.find(list => listId === list.getId());
  }

  groupRemoveClickHandler = (listId, referenceIds) => {
    const checkedItemsHashList = this.getcheckedItemsHashList(listId);
    if (checkedItemsHashList) {
      const parentIds = referenceIds.slice();
      const id = parentIds.pop();
      checkedItemsHashList.removeAll(parentIds, id);
      this.props.onItemRemove(checkedItemsHashList);
    } else {
      throw new Error('SelectedItems::groupRemoveClickHandler(): No hash list of checked items found');
    }
  }

  itemRemoveClickHandler = (listId, referenceIds, itemId) => {
    const checkedItemsHashList = this.getcheckedItemsHashList(listId);
    if (checkedItemsHashList) {
      checkedItemsHashList.remove(referenceIds, itemId);
      this.props.onItemRemove(checkedItemsHashList);
    } else {
      throw new Error('SelectedItems::itemRemoveClickHandler(): No hash list of checked items found');
    }
  }

  render() {
    const checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];

    return (
      <div className="oc-hierarchy-selector-selected-items-wrapper">
        <p>{this.props.listLabel}</p>
        <div className="oc-hierarchy-selector-selected-items">
          <ul className="group-list">
            {checkedItemsHashLists.map(list => this.getGroupItem(list.getId(), list.get()))}
          </ul>
        </div>
      </div>
    );
  }
}

SelectedItems.propTypes = {
  allLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  listLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  checkedItemLists: PropTypes.arrayOf(PropTypes.instanceOf(CheckedItemHashList)),
  itemRenderFunction: PropTypes.func,
  onItemRemove: PropTypes.func,
};

SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: () => {},
};
