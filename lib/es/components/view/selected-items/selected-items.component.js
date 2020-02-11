function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
import CheckedItemHashList from '../../../models/checked-items/checked-item-hash-list';
import GroupItem from './group.component';
import Item from './item.component';
import './selected-items.scss';

var SelectedItems =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(SelectedItems, _React$PureComponent);

  function SelectedItems(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getLastUpdateStamp", function (checkedItemHashLists) {
      return checkedItemHashLists.map(function (item) {
        return item.getLastUpdateStamp();
      }).join('-');
    });

    _defineProperty(_assertThisInitialized(_this), "getGroupItem", function (listId, checkedItemsHashList) {
      var list = [];
      Object.keys(checkedItemsHashList).forEach(function (key) {
        var checkedItemsHash = checkedItemsHashList[key];
        var parents = checkedItemsHash.getParents();
        var parentIds = parents.map(function (p) {
          return p.id;
        });
        var checkedItems = checkedItemsHash.getCheckedItems();
        var isCheckedAll = checkedItemsHash.isCheckedAll();
        var isItemRemovable = !isCheckedAll;
        var title = parents.map(function (p) {
          return p.name;
        }).join(' / ');

        var itemRenderer = function itemRenderer(index, itemKey) {
          var selectedItem = checkedItems[index];
          return React.createElement(Item, {
            item: Object.assign({}, selectedItem),
            key: "" + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(React.createElement(GroupItem, {
          allLabel: _this.props.allLabel,
          count: checkedItems ? checkedItems.length : 0,
          key: listId + "-" + key,
          title: title,
          removable: true,
          selectedAll: isCheckedAll,
          referenceIds: parentIds,
          sourceId: listId,
          onRemoveClick: _this.groupRemoveClickHandler
        }, React.createElement(ReactList, {
          itemRenderer: itemRenderer,
          length: checkedItems.length,
          type: "uniform",
          useStaticSize: true
        })));
      });
      return list;
    });

    _defineProperty(_assertThisInitialized(_this), "getcheckedItemsHashList", function (listId) {
      var checkedItemsHashLists = _this.props.checkedItemLists ? _this.props.checkedItemLists : [];
      return checkedItemsHashLists.find(function (list) {
        return listId === list.getId();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "groupRemoveClickHandler", function (listId, referenceIds) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);

      if (checkedItemsHashList) {
        var parentIds = referenceIds.slice();
        var id = parentIds.pop();
        checkedItemsHashList.removeAll(parentIds, id);

        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::groupRemoveClickHandler(): No hash list of checked items found');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "itemRemoveClickHandler", function (listId, referenceIds, itemId) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);

      if (checkedItemsHashList) {
        checkedItemsHashList.remove(referenceIds, itemId);

        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::itemRemoveClickHandler(): No hash list of checked items found');
      }
    });

    _this.state = {
      checkedItemsLastUpdate: 0
    };
    return _this;
  }

  var _proto = SelectedItems.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedItemLists && nextProps.checkedItemLists.length > 0) {
      var lastUpdated = this.getLastUpdateStamp(nextProps.checkedItemLists);

      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];
    return React.createElement("div", {
      className: "oc-hierarchy-selector-selected-items-wrapper"
    }, React.createElement("p", null, this.props.listLabel), React.createElement("div", {
      className: "oc-hierarchy-selector-selected-items"
    }, React.createElement("ul", {
      className: "group-list"
    }, checkedItemsHashLists.map(function (list) {
      return _this2.getGroupItem(list.getId(), list.get());
    }))));
  };

  return SelectedItems;
}(React.PureComponent);

export { SelectedItems as default };
SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: function onItemRemove() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0TGlzdCIsIkNoZWNrZWRJdGVtSGFzaExpc3QiLCJHcm91cEl0ZW0iLCJJdGVtIiwiU2VsZWN0ZWRJdGVtcyIsInByb3BzIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJtYXAiLCJpdGVtIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwiam9pbiIsImxpc3RJZCIsImNoZWNrZWRJdGVtc0hhc2hMaXN0IiwibGlzdCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY2hlY2tlZEl0ZW1zSGFzaCIsInBhcmVudHMiLCJnZXRQYXJlbnRzIiwicGFyZW50SWRzIiwicCIsImlkIiwiY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZEl0ZW1zIiwiaXNDaGVja2VkQWxsIiwiaXNJdGVtUmVtb3ZhYmxlIiwidGl0bGUiLCJuYW1lIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtS2V5Iiwic2VsZWN0ZWRJdGVtIiwiYXNzaWduIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUNsaWNrSGFuZGxlciIsInB1c2giLCJhbGxMYWJlbCIsImxlbmd0aCIsImdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyIiwiY2hlY2tlZEl0ZW1zSGFzaExpc3RzIiwiY2hlY2tlZEl0ZW1MaXN0cyIsImZpbmQiLCJnZXRJZCIsInJlZmVyZW5jZUlkcyIsImdldGNoZWNrZWRJdGVtc0hhc2hMaXN0Iiwic2xpY2UiLCJwb3AiLCJyZW1vdmVBbGwiLCJvbkl0ZW1SZW1vdmUiLCJFcnJvciIsIml0ZW1JZCIsInJlbW92ZSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJsYXN0VXBkYXRlZCIsInNldFN0YXRlIiwicmVuZGVyIiwibGlzdExhYmVsIiwiZ2V0R3JvdXBJdGVtIiwiZ2V0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBRUEsT0FBT0MsbUJBQVAsTUFBZ0Msc0RBQWhDO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixtQkFBdEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGtCQUFqQjtBQUNBLE9BQU8sdUJBQVA7O0lBRXFCQyxhOzs7OztBQUNuQix5QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIseUVBa0JFLFVBQUFDLG9CQUFvQjtBQUFBLGFBQ3ZDQSxvQkFBb0IsQ0FDakJDLEdBREgsQ0FDTyxVQUFBQyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDQyxrQkFBTCxFQUFKO0FBQUEsT0FEWCxFQUVHQyxJQUZILENBRVEsR0FGUixDQUR1QztBQUFBLEtBbEJ0Qjs7QUFBQSxtRUF3QkosVUFBQ0MsTUFBRCxFQUFTQyxvQkFBVCxFQUFrQztBQUMvQyxVQUFNQyxJQUFJLEdBQUcsRUFBYjtBQUNBQyxNQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUgsb0JBQVosRUFBa0NJLE9BQWxDLENBQTBDLFVBQUNDLEdBQUQsRUFBUztBQUNqRCxZQUFNQyxnQkFBZ0IsR0FBR04sb0JBQW9CLENBQUNLLEdBQUQsQ0FBN0M7QUFDQSxZQUFNRSxPQUFPLEdBQUdELGdCQUFnQixDQUFDRSxVQUFqQixFQUFoQjtBQUNBLFlBQU1DLFNBQVMsR0FBR0YsT0FBTyxDQUFDWixHQUFSLENBQVksVUFBQWUsQ0FBQztBQUFBLGlCQUFJQSxDQUFDLENBQUNDLEVBQU47QUFBQSxTQUFiLENBQWxCO0FBQ0EsWUFBTUMsWUFBWSxHQUFHTixnQkFBZ0IsQ0FBQ08sZUFBakIsRUFBckI7QUFDQSxZ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O0FBQWQsT0FDR3BCLHFCQUFxQixDQUFDbEMsR0FBdEIsQ0FBMEIsVUFBQU0sSUFBSTtBQUFBLGFBQUksTUFBSSxDQUFDaUQsWUFBTCxDQUFrQmpELElBQUksQ0FBQytCLEtBQUwsRUFBbEIsRUFBZ0MvQixJQUFJLENBQUNrRCxHQUFMLEVBQWhDLENBQUo7QUFBQSxLQUE5QixDQURILENBREYsQ0FGRixDQURGO0FBVUQsRzs7O0VBbkh3Q2pFLEtBQUssQ0FBQ2tFLGE7O1NBQTVCNUQsYTtBQThIckJBLGFBQWEsQ0FBQzZELFlBQWQsR0FBNkI7QUFDM0IzQixFQUFBQSxRQUFRLEVBQUUsS0FEaUI7QUFFM0J1QixFQUFBQSxTQUFTLEVBQUUsZ0JBRmdCO0FBRzNCbkIsRUFBQUEsZ0JBQWdCLEVBQUUsSUFIUztBQUkzQlAsRUFBQUEsa0JBQWtCLEVBQUUsSUFKTztBQUszQmUsRUFBQUEsWUFBWSxFQUFFLHdCQUFNLENBQUU7QUFMSyxDQUE3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcblxuaW1wb3J0IENoZWNrZWRJdGVtSGFzaExpc3QgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NoZWNrZWQtaXRlbXMvY2hlY2tlZC1pdGVtLWhhc2gtbGlzdCc7XG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4vZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCBJdGVtIGZyb20gJy4vaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0ICcuL3NlbGVjdGVkLWl0ZW1zLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RlZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyAmJiBuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzKTtcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGxhc3RVcGRhdGVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSBjaGVja2VkSXRlbUhhc2hMaXN0cyA9PiAoXG4gICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHNcbiAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLmdldExhc3RVcGRhdGVTdGFtcCgpKVxuICAgICAgLmpvaW4oJy0nKVxuICApXG5cbiAgZ2V0R3JvdXBJdGVtID0gKGxpc3RJZCwgY2hlY2tlZEl0ZW1zSGFzaExpc3QpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEl0ZW1zSGFzaExpc3QpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaCA9IGNoZWNrZWRJdGVtc0hhc2hMaXN0W2tleV07XG4gICAgICBjb25zdCBwYXJlbnRzID0gY2hlY2tlZEl0ZW1zSGFzaC5nZXRQYXJlbnRzKCk7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBwYXJlbnRzLm1hcChwID0+IHAuaWQpO1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1zSGFzaC5nZXRDaGVja2VkSXRlbXMoKTtcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IGNoZWNrZWRJdGVtc0hhc2guaXNDaGVja2VkQWxsKCk7XG4gICAgICBjb25zdCBpc0l0ZW1SZW1vdmFibGUgPSAhaXNDaGVja2VkQWxsO1xuICAgICAgY29uc3QgdGl0bGUgPSBwYXJlbnRzLm1hcChwID0+IHAubmFtZSkuam9pbignIC8gJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW1SZW5kZXJlciA9IChpbmRleCwgaXRlbUtleSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBjaGVja2VkSXRlbXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICBpdGVtPXtPYmplY3QuYXNzaWduKHt9LCBzZWxlY3RlZEl0ZW0pfVxuICAgICAgICAgICAga2V5PXtgJHtpdGVtS2V5fWB9XG4gICAgICAgICAgICByZW1vdmFibGU9e2lzSXRlbVJlbW92YWJsZX1cbiAgICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50SWRzfVxuICAgICAgICAgICAgc291cmNlSWQ9e2xpc3RJZH1cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvblJlbW92ZUNsaWNrPXt0aGlzLml0ZW1SZW1vdmVDbGlja0hhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIGxpc3QucHVzaCgoXG4gICAgICAgIDxHcm91cEl0ZW1cbiAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICBjb3VudD17Y2hlY2tlZEl0ZW1zID8gY2hlY2tlZEl0ZW1zLmxlbmd0aCA6IDB9XG4gICAgICAgICAga2V5PXtgJHtsaXN0SWR9LSR7a2V5fWB9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIHJlbW92YWJsZVxuICAgICAgICAgIHNlbGVjdGVkQWxsPXtpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRJZHN9XG4gICAgICAgICAgc291cmNlSWQ9e2xpc3RJZH1cbiAgICAgICAgICBvblJlbW92ZUNsaWNrPXt0aGlzLmdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyfVxuICAgICAgICA+XG4gICAgICAgICAgPFJlYWN0TGlzdFxuICAgICAgICAgICAgaXRlbVJlbmRlcmVyPXtpdGVtUmVuZGVyZXJ9XG4gICAgICAgICAgICBsZW5ndGg9e2NoZWNrZWRJdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Hcm91cEl0ZW0+XG4gICAgICApKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldGNoZWNrZWRJdGVtc0hhc2hMaXN0ID0gKGxpc3RJZCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0cyA9IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA/IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA6IFtdO1xuICAgIHJldHVybiBjaGVja2VkSXRlbXNIYXNoTGlzdHMuZmluZChsaXN0ID0+IGxpc3RJZCA9PT0gbGlzdC5nZXRJZCgpKTtcbiAgfVxuXG4gIGdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGxpc3RJZCwgcmVmZXJlbmNlSWRzKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3QgPSB0aGlzLmdldGNoZWNrZWRJdGVtc0hhc2hMaXN0KGxpc3RJZCk7XG4gICAgaWYgKGNoZWNrZWRJdGVtc0hhc2hMaXN0KSB7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcbiAgICAgIGNvbnN0IGlkID0gcGFyZW50SWRzLnBvcCgpO1xuICAgICAgY2hlY2tlZEl0ZW1zSGFzaExpc3QucmVtb3ZlQWxsKHBhcmVudElkcywgaWQpO1xuICAgICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUoY2hlY2tlZEl0ZW1zSGFzaExpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdGVkSXRlbXM6Omdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyKCk6IE5vIGhhc2ggbGlzdCBvZiBjaGVja2VkIGl0ZW1zIGZvdW5kJyk7XG4gICAgfVxuICB9XG5cbiAgaXRlbVJlbW92ZUNsaWNrSGFuZGxlciA9IChsaXN0SWQsIHJlZmVyZW5jZUlkcywgaXRlbUlkKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3QgPSB0aGlzLmdldGNoZWNrZWRJdGVtc0hhc2hMaXN0KGxpc3RJZCk7XG4gICAgaWYgKGNoZWNrZWRJdGVtc0hhc2hMaXN0KSB7XG4gICAgICBjaGVja2VkSXRlbXNIYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpdGVtSWQpO1xuICAgICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUoY2hlY2tlZEl0ZW1zSGFzaExpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdGVkSXRlbXM6Oml0ZW1SZW1vdmVDbGlja0hhbmRsZXIoKTogTm8gaGFzaCBsaXN0IG9mIGNoZWNrZWQgaXRlbXMgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3RzID0gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzID8gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzIDogW107XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtaXRlbXMtd3JhcHBlclwiPlxuICAgICAgICA8cD57dGhpcy5wcm9wcy5saXN0TGFiZWx9PC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1pdGVtc1wiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJncm91cC1saXN0XCI+XG4gICAgICAgICAgICB7Y2hlY2tlZEl0ZW1zSGFzaExpc3RzLm1hcChsaXN0ID0+IHRoaXMuZ2V0R3JvdXBJdGVtKGxpc3QuZ2V0SWQoKSwgbGlzdC5nZXQoKSkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RlZEl0ZW1zLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGxpc3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY2hlY2tlZEl0ZW1MaXN0czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoQ2hlY2tlZEl0ZW1IYXNoTGlzdCkpLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvbkl0ZW1SZW1vdmU6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuU2VsZWN0ZWRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgbGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxuICBjaGVja2VkSXRlbUxpc3RzOiBudWxsLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIG9uSXRlbVJlbW92ZTogKCkgPT4ge30sXG59O1xuIl19