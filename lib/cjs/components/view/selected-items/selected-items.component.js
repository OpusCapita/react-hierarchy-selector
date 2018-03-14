'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _checkedItemHashList = require('../../../models/checked-items/checked-item-hash-list');

var _checkedItemHashList2 = _interopRequireDefault(_checkedItemHashList);

var _group = require('./group.component');

var _group2 = _interopRequireDefault(_group);

var _item = require('./item.component');

var _item2 = _interopRequireDefault(_item);

require('./selected-items.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          return _react2.default.createElement(_item2.default, {
            item: Object.assign({}, selectedItem),
            key: '' + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(_react2.default.createElement(
          _group2.default,
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
          _react2.default.createElement(_reactList2.default, {
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

    return _react2.default.createElement(
      'div',
      { className: 'oc-hierarchy-selector-selected-items-wrapper' },
      _react2.default.createElement(
        'p',
        null,
        this.props.listLabel
      ),
      _react2.default.createElement(
        'div',
        { className: 'oc-hierarchy-selector-selected-items' },
        _react2.default.createElement(
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
}(_react2.default.PureComponent);

exports.default = SelectedItems;


SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: function onItemRemove() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RlZEl0ZW1zIiwicHJvcHMiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJjaGVja2VkSXRlbUhhc2hMaXN0cyIsIm1hcCIsIml0ZW0iLCJqb2luIiwiZ2V0R3JvdXBJdGVtIiwibGlzdElkIiwiY2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjaGVja2VkSXRlbXNIYXNoIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJwYXJlbnRJZHMiLCJwIiwiaWQiLCJjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkSXRlbXMiLCJpc0NoZWNrZWRBbGwiLCJpc0l0ZW1SZW1vdmFibGUiLCJ0aXRsZSIsIm5hbWUiLCJpdGVtUmVuZGVyZXIiLCJpbmRleCIsIml0ZW1LZXkiLCJzZWxlY3RlZEl0ZW0iLCJhc3NpZ24iLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHVzaCIsImFsbExhYmVsIiwibGVuZ3RoIiwiZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIiLCJnZXRjaGVja2VkSXRlbXNIYXNoTGlzdCIsImNoZWNrZWRJdGVtc0hhc2hMaXN0cyIsImNoZWNrZWRJdGVtTGlzdHMiLCJmaW5kIiwiZ2V0SWQiLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsInBvcCIsInJlbW92ZUFsbCIsIm9uSXRlbVJlbW92ZSIsIkVycm9yIiwiaXRlbUlkIiwicmVtb3ZlIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImxhc3RVcGRhdGVkIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsaXN0TGFiZWwiLCJnZXQiLCJQdXJlQ29tcG9uZW50IiwiZGVm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REUsTSxxQkFBUztBQUFBOztBQUNQLFFBQU1sQix3QkFBd0IsS0FBS3RDLEtBQUwsQ0FBV3VDLGdCQUFYLEdBQThCLEtBQUt2QyxLQUFMLENBQVd1QyxnQkFBekMsR0FBNEQsRUFBMUY7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDhDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUksYUFBS3ZDLEtBQUwsQ0FBV3lEO0FBQWYsT0FERjtBQUVFO0FBQUE7QUFBQSxVQUFLLFdBQVUsc0NBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSSxXQUFVLFlBQWQ7QUFDR25CLGdDQUFzQm5DLEdBQXRCLENBQTBCO0FBQUEsbUJBQVEsT0FBS0csWUFBTCxDQUFrQkcsS0FBS2dDLEtBQUwsRUFBbEIsRUFBZ0NoQyxLQUFLaUQsR0FBTCxFQUFoQyxDQUFSO0FBQUEsV0FBMUI7QUFESDtBQURGO0FBRkYsS0FERjtBQVVELEc7OztFQW5Id0MsZ0JBQU1DLGE7O2tCQUE1QjVELGE7OztBQThIckJBLGNBQWM2RCxZQUFkLEdBQTZCO0FBQzNCMUIsWUFBVSxLQURpQjtBQUUzQnVCLGFBQVcsZ0JBRmdCO0FBRzNCbEIsb0JBQWtCLElBSFM7QUFJM0JSLHNCQUFvQixJQUpPO0FBSzNCZSxnQkFBYyx3QkFBTSxDQUFFO0FBTEssQ0FBN0IiLCJmaWxlIjoic2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RMaXN0IGZyb20gJ3JlYWN0LWxpc3QnO1xuXG5pbXBvcnQgQ2hlY2tlZEl0ZW1IYXNoTGlzdCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY2hlY2tlZC1pdGVtcy9jaGVja2VkLWl0ZW0taGFzaC1saXN0JztcbmltcG9ydCBHcm91cEl0ZW0gZnJvbSAnLi9ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgJy4vc2VsZWN0ZWQtaXRlbXMuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGVkSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IDAsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzICYmIG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxhc3RVcGRhdGVkID0gdGhpcy5nZXRMYXN0VXBkYXRlU3RhbXAobmV4dFByb3BzLmNoZWNrZWRJdGVtTGlzdHMpO1xuICAgICAgaWYgKGxhc3RVcGRhdGVkICE9PSB0aGlzLnN0YXRlLmNoZWNrZWRJdGVtc0xhc3RVcGRhdGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogbGFzdFVwZGF0ZWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldExhc3RVcGRhdGVTdGFtcCA9IGNoZWNrZWRJdGVtSGFzaExpc3RzID0+IChcbiAgICBjaGVja2VkSXRlbUhhc2hMaXN0c1xuICAgICAgLm1hcChpdGVtID0+IGl0ZW0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXG4gICAgICAuam9pbignLScpXG4gIClcblxuICBnZXRHcm91cEl0ZW0gPSAobGlzdElkLCBjaGVja2VkSXRlbXNIYXNoTGlzdCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSXRlbXNIYXNoTGlzdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoID0gY2hlY2tlZEl0ZW1zSGFzaExpc3Rba2V5XTtcbiAgICAgIGNvbnN0IHBhcmVudHMgPSBjaGVja2VkSXRlbXNIYXNoLmdldFBhcmVudHMoKTtcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IHBhcmVudHMubWFwKHAgPT4gcC5pZCk7XG4gICAgICBjb25zdCBjaGVja2VkSXRlbXMgPSBjaGVja2VkSXRlbXNIYXNoLmdldENoZWNrZWRJdGVtcygpO1xuICAgICAgY29uc3QgaXNDaGVja2VkQWxsID0gY2hlY2tlZEl0ZW1zSGFzaC5pc0NoZWNrZWRBbGwoKTtcbiAgICAgIGNvbnN0IGlzSXRlbVJlbW92YWJsZSA9ICFpc0NoZWNrZWRBbGw7XG4gICAgICBjb25zdCB0aXRsZSA9IHBhcmVudHMubWFwKHAgPT4gcC5uYW1lKS5qb2luKCcgLyAnKTtcblxuICAgICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBpdGVtS2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGNoZWNrZWRJdGVtc1tpbmRleF07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEl0ZW1cbiAgICAgICAgICAgIGl0ZW09e09iamVjdC5hc3NpZ24oe30sIHNlbGVjdGVkSXRlbSl9XG4gICAgICAgICAgICBrZXk9e2Ake2l0ZW1LZXl9YH1cbiAgICAgICAgICAgIHJlbW92YWJsZT17aXNJdGVtUmVtb3ZhYmxlfVxuICAgICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRJZHN9XG4gICAgICAgICAgICBzb3VyY2VJZD17bGlzdElkfVxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cbiAgICAgICAgICAgIG9uUmVtb3ZlQ2xpY2s9e3RoaXMuaXRlbVJlbW92ZUNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgbGlzdC5wdXNoKChcbiAgICAgICAgPEdyb3VwSXRlbVxuICAgICAgICAgIGFsbExhYmVsPXt0aGlzLnByb3BzLmFsbExhYmVsfVxuICAgICAgICAgIGNvdW50PXtjaGVja2VkSXRlbXMgPyBjaGVja2VkSXRlbXMubGVuZ3RoIDogMH1cbiAgICAgICAgICBrZXk9e2Ake2xpc3RJZH0tJHtrZXl9YH1cbiAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgcmVtb3ZhYmxlXG4gICAgICAgICAgc2VsZWN0ZWRBbGw9e2lzQ2hlY2tlZEFsbH1cbiAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudElkc31cbiAgICAgICAgICBzb3VyY2VJZD17bGlzdElkfVxuICAgICAgICAgIG9uUmVtb3ZlQ2xpY2s9e3RoaXMuZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8UmVhY3RMaXN0XG4gICAgICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cbiAgICAgICAgICAgIGxlbmd0aD17Y2hlY2tlZEl0ZW1zLmxlbmd0aH1cbiAgICAgICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcbiAgICAgICAgICAgIHVzZVN0YXRpY1NpemVcbiAgICAgICAgICAvPlxuICAgICAgICA8L0dyb3VwSXRlbT5cbiAgICAgICkpO1xuICAgIH0pO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QgPSAobGlzdElkKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3RzID0gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzID8gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzIDogW107XG4gICAgcmV0dXJuIGNoZWNrZWRJdGVtc0hhc2hMaXN0cy5maW5kKGxpc3QgPT4gbGlzdElkID09PSBsaXN0LmdldElkKCkpO1xuICB9XG5cbiAgZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIgPSAobGlzdElkLCByZWZlcmVuY2VJZHMpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1zSGFzaExpc3QpIHtcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IHJlZmVyZW5jZUlkcy5zbGljZSgpO1xuICAgICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XG4gICAgICBjaGVja2VkSXRlbXNIYXNoTGlzdC5yZW1vdmVBbGwocGFyZW50SWRzLCBpZCk7XG4gICAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZShjaGVja2VkSXRlbXNIYXNoTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWRJdGVtczo6Z3JvdXBSZW1vdmVDbGlja0hhbmRsZXIoKTogTm8gaGFzaCBsaXN0IG9mIGNoZWNrZWQgaXRlbXMgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGxpc3RJZCwgcmVmZXJlbmNlSWRzLCBpdGVtSWQpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcbiAgICBpZiAoY2hlY2tlZEl0ZW1zSGFzaExpc3QpIHtcbiAgICAgIGNoZWNrZWRJdGVtc0hhc2hMaXN0LnJlbW92ZShyZWZlcmVuY2VJZHMsIGl0ZW1JZCk7XG4gICAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZShjaGVja2VkSXRlbXNIYXNoTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VsZWN0ZWRJdGVtczo6aXRlbVJlbW92ZUNsaWNrSGFuZGxlcigpOiBObyBoYXNoIGxpc3Qgb2YgY2hlY2tlZCBpdGVtcyBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdHMgPSB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgPyB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgOiBbXTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1pdGVtcy13cmFwcGVyXCI+XG4gICAgICAgIDxwPnt0aGlzLnByb3BzLmxpc3RMYWJlbH08L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWl0ZW1zXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImdyb3VwLWxpc3RcIj5cbiAgICAgICAgICAgIHtjaGVja2VkSXRlbXNIYXNoTGlzdHMubWFwKGxpc3QgPT4gdGhpcy5nZXRHcm91cEl0ZW0obGlzdC5nZXRJZCgpLCBsaXN0LmdldCgpKSl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblNlbGVjdGVkSXRlbXMucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgbGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBjaGVja2VkSXRlbUxpc3RzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuaW5zdGFuY2VPZihDaGVja2VkSXRlbUhhc2hMaXN0KSksXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uSXRlbVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5TZWxlY3RlZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWxsTGFiZWw6ICdBbGwnLFxuICBsaXN0TGFiZWw6ICdTZWxlY3RlZCBpdGVtcycsXG4gIGNoZWNrZWRJdGVtTGlzdHM6IG51bGwsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgb25JdGVtUmVtb3ZlOiAoKSA9PiB7fSxcbn07XG4iXX0=