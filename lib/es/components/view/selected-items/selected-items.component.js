function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import CheckedItemHashList from '../../../models/checked-items/checked-item-hash-list';
import GroupItem from './group.component';
import Item from './item.component';
import './selected-items.scss';

var SelectedItems = function (_React$PureComponent) {
  _inherits(SelectedItems, _React$PureComponent);

  function SelectedItems(props) {
    _classCallCheck(this, SelectedItems);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getLastUpdateStamp = function (checkedItemHashLists) {
      return checkedItemHashLists.map(function (item) {
        return item.getLastUpdateStamp();
      }).join('-');
    };

    _this.getGroupItem = function (listId, checkedItemsHashList) {
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
            key: '' + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(React.createElement(
          GroupItem,
          {
            allLabel: _this.props.allLabel,
            count: checkedItems ? checkedItems.length : 0,
            key: listId + '-' + key,
            title: title,
            removable: true,
            selectedAll: isCheckedAll,
            referenceIds: parentIds,
            sourceId: listId,
            onRemoveClick: _this.groupRemoveClickHandler
          },
          React.createElement(ReactList, {
            itemRenderer: itemRenderer,
            length: checkedItems.length,
            type: 'uniform',
            useStaticSize: true
          })
        ));
      });
      return list;
    };

    _this.getcheckedItemsHashList = function (listId) {
      var checkedItemsHashLists = _this.props.checkedItemLists ? _this.props.checkedItemLists : [];
      return checkedItemsHashLists.find(function (list) {
        return listId === list.getId();
      });
    };

    _this.groupRemoveClickHandler = function (listId, referenceIds) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);
      if (checkedItemsHashList) {
        var parentIds = referenceIds.slice();
        var id = parentIds.pop();
        checkedItemsHashList.removeAll(parentIds, id);
        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::groupRemoveClickHandler(): No hash list of checked items found');
      }
    };

    _this.itemRemoveClickHandler = function (listId, referenceIds, itemId) {
      var checkedItemsHashList = _this.getcheckedItemsHashList(listId);
      if (checkedItemsHashList) {
        checkedItemsHashList.remove(referenceIds, itemId);
        _this.props.onItemRemove(checkedItemsHashList);
      } else {
        throw new Error('SelectedItems::itemRemoveClickHandler(): No hash list of checked items found');
      }
    };

    _this.state = {
      checkedItemsLastUpdate: 0
    };
    return _this;
  }

  SelectedItems.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedItemLists && nextProps.checkedItemLists.length > 0) {
      var lastUpdated = this.getLastUpdateStamp(nextProps.checkedItemLists);
      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  SelectedItems.prototype.render = function render() {
    var _this2 = this;

    var checkedItemsHashLists = this.props.checkedItemLists ? this.props.checkedItemLists : [];

    return React.createElement(
      'div',
      { className: 'oc-hierarchy-selector-selected-items-wrapper' },
      React.createElement(
        'p',
        null,
        this.props.listLabel
      ),
      React.createElement(
        'div',
        { className: 'oc-hierarchy-selector-selected-items' },
        React.createElement(
          'ul',
          { className: 'group-list' },
          checkedItemsHashLists.map(function (list) {
            return _this2.getGroupItem(list.getId(), list.get());
          })
        )
      )
    );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlJlYWN0TGlzdCIsIkNoZWNrZWRJdGVtSGFzaExpc3QiLCJHcm91cEl0ZW0iLCJJdGVtIiwiU2VsZWN0ZWRJdGVtcyIsInByb3BzIiwiZ2V0TGFzdFVwZGF0ZVN0YW1wIiwiY2hlY2tlZEl0ZW1IYXNoTGlzdHMiLCJtYXAiLCJpdGVtIiwiam9pbiIsImdldEdyb3VwSXRlbSIsImxpc3RJZCIsImNoZWNrZWRJdGVtc0hhc2hMaXN0IiwibGlzdCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY2hlY2tlZEl0ZW1zSGFzaCIsInBhcmVudHMiLCJnZXRQYXJlbnRzIiwicGFyZW50SWRzIiwicCIsImlkIiwiY2hlY2tlZEl0ZW1zIiwiZ2V0Q2hlY2tlZEl0ZW1zIiwiaXNDaGVja2VkQWxsIiwiaXNJdGVtUmVtb3ZhYmxlIiwidGl0bGUiLCJuYW1lIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtS2V5Iiwic2VsZWN0ZWRJdGVtIiwiYXNzaWduIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbVJlbW92ZUNsaWNrSGFuZGxlciIsInB1c2giLCJhbGxMYWJlbCIsImxlbmd0aCIsImdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyIiwiZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJjaGVja2VkSXRlbXNIYXNoTGlzdHMiLCJjaGVja2VkSXRlbUxpc3RzIiwiZmluZCIsImdldElkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJwb3AiLCJyZW1vdmVBbGwiLCJvbkl0ZW1SZW1vdmUiLCJFcnJvciIsIml0ZW1JZCIsInJlbW92ZSIsInN0YXRlIiwiY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJsYXN0VXBkYXRlZCIsInNldFN0YXRlIiwicmVuZGVyIiwibGlzdExhYmVsIiwiZ2V0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLE9BQU9DLG1CQUFQLE1BQWdDLHNEQUFoQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsbUJBQXRCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixrQkFBakI7QUFDQSxPQUFPLHVCQUFQOztJQUVxQkMsYTs7O0FBQ25CLHlCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBa0JuQkMsa0JBbEJtQixHQWtCRTtBQUFBLGFBQ25CQyxxQkFDR0MsR0FESCxDQUNPO0FBQUEsZUFBUUMsS0FBS0gsa0JBQUwsRUFBUjtBQUFBLE9BRFAsRUFFR0ksSUFGSCxDQUVRLEdBRlIsQ0FEbUI7QUFBQSxLQWxCRjs7QUFBQSxVQXdCbkJDLFlBeEJtQixHQXdCSixVQUFDQyxNQUFELEVBQVNDLG9CQUFULEVBQWtDO0FBQy9DLFVBQU1DLE9BQU8sRUFBYjtBQUNBQyxhQUFPQyxJQUFQLENBQVlILG9CQUFaLEVBQWtDSSxPQUFsQyxDQUEwQyxVQUFDQyxHQUFELEVBQVM7QUFDakQsWUFBTUMsbUJBQW1CTixxQkFBcUJLLEdBQXJCLENBQXpCO0FBQ0EsWUFBTUUsVUFBVUQsaUJBQWlCRSxVQUFqQixFQUFoQjtBQUNBLFlBQU1DLFlBQVlGLFFBQVFaLEdBQVIsQ0FBWTtBQUFBLGlCQUFLZSxFQUFFQyxFQUFQO0FBQUEsU0FBWixDQUFsQjtBQUNBLFlBQU1DLGVBQWVOLGlCQUFpQk8sZUFBakIsRUFBckI7QUFDQSxZQUFNQyxlQUFlUixpQkFBaUJRLFlBQWpCLEVBQXJCO0FBQ0EsWUFBTUMsa0JBQWtCLENBQUNELFlBQXpCO0FBQ0EsWUFB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QkFBVixJQUE4QmMsVUFBVWQsZ0JBQVYsQ0FBMkJKLE1BQTNCLEdBQW9DLENBQXRFLEVBQXlFO0FBQ3ZFLFVBQU1tQixjQUFjLEtBQUtyRCxrQkFBTCxDQUF3Qm9ELFVBQVVkLGdCQUFsQyxDQUFwQjtBQUNBLFVBQUllLGdCQUFnQixLQUFLSixLQUFMLENBQVdDLHNCQUEvQixFQUF1RDtBQUNyRCxhQUFLSSxRQUFMLENBQWM7QUFDWkosa0NBQXdCRztBQURaLFNBQWQ7QUFHRDtBQUNGO0FBQ0YsRzs7MEJBcUZERSxNLHFCQUFTO0FBQUE7O0FBQ1AsUUFBTWxCLHdCQUF3QixLQUFLdEMsS0FBTCxDQUFXdUMsZ0JBQVgsR0FBOEIsS0FBS3ZDLEtBQUwsQ0FBV3VDLGdCQUF6QyxHQUE0RCxFQUExRjs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsOENBQWY7QUFDRTtBQUFBO0FBQUE7QUFBSSxhQUFLdkMsS0FBTCxDQUFXeUQ7QUFBZixPQURGO0FBRUU7QUFBQTtBQUFBLFVBQUssV0FBVSxzQ0FBZjtBQUNFO0FBQUE7QUFBQSxZQUFJLFdBQVUsWUFBZDtBQUNHbkIsZ0NBQXNCbkMsR0FBdEIsQ0FBMEI7QUFBQSxtQkFBUSxPQUFLRyxZQUFMLENBQWtCRyxLQUFLZ0MsS0FBTCxFQUFsQixFQUFnQ2hDLEtBQUtpRCxHQUFMLEVBQWhDLENBQVI7QUFBQSxXQUExQjtBQURIO0FBREY7QUFGRixLQURGO0FBVUQsRzs7O0VBbkh3Q2pFLE1BQU1rRSxhOztTQUE1QjVELGE7OztBQThIckJBLGNBQWM2RCxZQUFkLEdBQTZCO0FBQzNCMUIsWUFBVSxLQURpQjtBQUUzQnVCLGFBQVcsZ0JBRmdCO0FBRzNCbEIsb0JBQWtCLElBSFM7QUFJM0JSLHNCQUFvQixJQUpPO0FBSzNCZSxnQkFBYyx3QkFBTSxDQUFFO0FBTEssQ0FBN0IiLCJmaWxlIjoic2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xuXG5pbXBvcnQgQ2hlY2tlZEl0ZW1IYXNoTGlzdCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0JztcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi9ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgJy4vc2VsZWN0ZWQtaXRlbXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGVkSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IDAsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzICYmIG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAobmV4dFByb3BzLmNoZWNrZWRJdGVtTGlzdHMpO1xuICAgICAgaWYgKGxhc3RVcGRhdGVkICE9PSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtc0xhc3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogbGFzdFVwZGF0ZWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9IGNoZWNrZWRJdGVtSGFzaExpc3RzID0+IChcbiAgICBjaGVja2VkSXRlbUhhc2hMaXN0c1xuICAgICAgLm1hcChpdGVtID0+IGl0ZW0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXG4gICAgICAuam9pbignLScpXG4gIClcblxuICBnZXRHcm91cEl0ZW0gPSAobGlzdElkLCBjaGVja2VkSXRlbXNIYXNoTGlzdCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSXRlbXNIYXNoTGlzdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoID0gY2hlY2tlZEl0ZW1zSGFzaExpc3Rba2V5XTtcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBjaGVja2VkSXRlbXNIYXNoLmdldFBhcmVudHMoKTtcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IHBhcmVudHMubWFwKHAgPT4gcC5pZCk7XG4gICAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbXNIYXNoLmdldENoZWNrZWRJdGVtcygpO1xuICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gY2hlY2tlZEl0ZW1zSGFzaC5pc0NoZWNrZWRBbGwoKTtcbiAgICAgIGNvbnN0IGlzSXRlbVJlbW92YWJsZSA9ICFpc0NoZWNrZWRBbGw7XG4gICAgICBjb25zdCB0aXRsZSA9IHBhcmVudHMubWFwKHAgPT4gcC5uYW1lKS5qb2luKCcgLyAnKTtcblxuICAgICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBpdGVtS2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGNoZWNrZWRJdGVtc1tpbmRleF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgIGl0ZW09e09iamVjdC5hc3NpZ24oe30sIHNlbGVjdGVkSXRlbSl9XG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW1LZXl9YH1cbiAgICAgICAgICAgIHJlbW92YWJsZT17aXNJdGVtUmVtb3ZhYmxlfVxuICAgICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRJZHN9XG4gICAgICAgICAgICBzb3VyY2VJZD17bGlzdElkfVxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uUmVtb3ZlQ2xpY2s9e3RoaXMuaXRlbVJlbW92ZUNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgbGlzdC5wdXNoKChcbiAgICAgICAgPEdyb3VwSXRlbVxuICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgIGNvdW50PXtjaGVja2VkSXRlbXMgPyBjaGVja2VkSXRlbXMubGVuZ3RoIDogMH1cbiAgICAgICAgICBrZXk9e2Ake2xpc3RJZH0tJHtrZXl9YH1cbiAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgcmVtb3ZhYmxlXG4gICAgICAgICAgc2VsZWN0ZWRBbGw9e2lzQ2hlY2tlZEFsbH1cbiAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudElkc31cbiAgICAgICAgICBzb3VyY2VJZD17bGlzdElkfVxuICAgICAgICAgIG9uUmVtb3ZlQ2xpY2s9e3RoaXMuZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8UmVhY3RMaXN0XG4gICAgICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cbiAgICAgICAgICAgIGxlbmd0aD17Y2hlY2tlZEl0ZW1zLmxlbmd0aH1cbiAgICAgICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgICAgICAvPlxuICAgICAgICA8L0dyb3VwSXRlbT5cbiAgICAgICkpO1xuICAgIH0pO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QgPSAobGlzdElkKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3RzID0gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzID8gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzIDogW107XG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtc0hhc2hMaXN0cy5maW5kKGxpc3QgPT4gbGlzdElkID09PSBsaXN0LmdldElkKCkpO1xuICB9XG5cbiAgZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIgPSAobGlzdElkLCByZWZlcmVuY2VJZHMpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1zSGFzaExpc3QpIHtcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IHJlZmVyZW5jZUlkcy5zbGljZSgpO1xuICAgICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XG4gICAgICBjaGVja2VkSXRlbXNIYXNoTGlzdC5yZW1vdmVBbGwocGFyZW50SWRzLCBpZCk7XG4gICAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZShjaGVja2VkSXRlbXNIYXNoTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWRJdGVtczo6Z3JvdXBSZW1vdmVDbGlja0hhbmRsZXIoKTogTm8gaGFzaCBsaXN0IG9mIGNoZWNrZWQgaXRlbXMgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGxpc3RJZCwgcmVmZXJlbmNlSWRzLCBpdGVtSWQpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1zSGFzaExpc3QpIHtcbiAgICAgIGNoZWNrZWRJdGVtc0hhc2hMaXN0LnJlbW92ZShyZWZlcmVuY2VJZHMsIGl0ZW1JZCk7XG4gICAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZShjaGVja2VkSXRlbXNIYXNoTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWRJdGVtczo6aXRlbVJlbW92ZUNsaWNrSGFuZGxlcigpOiBObyBoYXNoIGxpc3Qgb2YgY2hlY2tlZCBpdGVtcyBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdHMgPSB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgPyB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgOiBbXTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1pdGVtcy13cmFwcGVyXCI+XG4gICAgICAgIDxwPnt0aGlzLnByb3BzLmxpc3RMYWJlbH08L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWl0ZW1zXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImdyb3VwLWxpc3RcIj5cbiAgICAgICAgICAgIHtjaGVja2VkSXRlbXNIYXNoTGlzdHMubWFwKGxpc3QgPT4gdGhpcy5nZXRHcm91cEl0ZW0obGlzdC5nZXRJZCgpLCBsaXN0LmdldCgpKSl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdGVkSXRlbXMucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgbGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBjaGVja2VkSXRlbUxpc3RzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihDaGVja2VkSXRlbUhhc2hMaXN0KSksXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSXRlbVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5TZWxlY3RlZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBsaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIGNoZWNrZWRJdGVtTGlzdHM6IG51bGwsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgb25JdGVtUmVtb3ZlOiAoKSA9PiB7fSxcbn07XG4iXX0=