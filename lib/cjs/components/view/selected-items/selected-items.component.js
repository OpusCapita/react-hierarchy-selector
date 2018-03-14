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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RlZEl0ZW1zIiwicHJvcHMiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJjaGVja2VkSXRlbUhhc2hMaXN0cyIsIm1hcCIsIml0ZW0iLCJqb2luIiwiZ2V0R3JvdXBJdGVtIiwibGlzdElkIiwiY2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjaGVja2VkSXRlbXNIYXNoIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJwYXJlbnRJZHMiLCJwIiwiaWQiLCJjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkSXRlbXMiLCJpc0NoZWNrZWRBbGwiLCJpc0l0ZW1SZW1vdmFibGUiLCJ0aXRsZSIsIm5hbWUiLCJpdGVtUmVuZGVyZXIiLCJpbmRleCIsIml0ZW1LZXkiLCJzZWxlY3RlZEl0ZW0iLCJhc3NpZ24iLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHVzaCIsImFsbExhYmVsIiwibGVuZ3RoIiwiZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIiLCJnZXRjaGVja2VkSXRlbXNIYXNoTGlzdCIsImNoZWNrZWRJdGVtc0hhc2hMaXN0cyIsImNoZWNrZWRJdGVtTGlzdHMiLCJmaW5kIiwiZ2V0SWQiLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsInBvcCIsInJlbW92ZUFsbCIsIm9uSXRlbVJlbW92ZSIsIkVycm9yIiwiaXRlbUlkIiwicmVtb3ZlIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImxhc3RVcGRhdGVkIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsaXN0TGFiZWwiLCJnZXQiLCJQdXJlQ29tcG9uZW50IiwiZGVm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REUsTSxxQkFBUztBQUFBOztBQUNQLFFBQU1sQix3QkFBd0IsS0FBS3RDLEtBQUwsQ0FBV3VDLGdCQUFYLEdBQThCLEtBQUt2QyxLQUFMLENBQVd1QyxnQkFBekMsR0FBNEQsRUFBMUY7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDhDQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUksYUFBS3ZDLEtBQUwsQ0FBV3lEO0FBQWYsT0FERjtBQUVFO0FBQUE7QUFBQSxVQUFLLFdBQVUsc0NBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSSxXQUFVLFlBQWQ7QUFDR25CLGdDQUFzQm5DLEdBQXRCLENBQTBCO0FBQUEsbUJBQVEsT0FBS0csWUFBTCxDQUFrQkcsS0FBS2dDLEtBQUwsRUFBbEIsRUFBZ0NoQyxLQUFLaUQsR0FBTCxFQUFoQyxDQUFSO0FBQUEsV0FBMUI7QUFESDtBQURGO0FBRkYsS0FERjtBQVVELEc7OztFQW5Id0MsZ0JBQU1DLGE7O2tCQUE1QjVELGE7OztBQThIckJBLGNBQWM2RCxZQUFkLEdBQTZCO0FBQzNCMUIsWUFBVSxLQURpQjtBQUUzQnVCLGFBQVcsZ0JBRmdCO0FBRzNCbEIsb0JBQWtCLElBSFM7QUFJM0JSLHNCQUFvQixJQUpPO0FBSzNCZSxnQkFBYyx3QkFBTSxDQUFFO0FBTEssQ0FBN0IiLCJmaWxlIjoic2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcclxuXHJcbmltcG9ydCBDaGVja2VkSXRlbUhhc2hMaXN0IGZyb20gJy4uLy4uLy4uL21vZGVscy9jaGVja2VkLWl0ZW1zL2NoZWNrZWQtaXRlbS1oYXNoLWxpc3QnO1xyXG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4vZ3JvdXAuY29tcG9uZW50JztcclxuaW1wb3J0IEl0ZW0gZnJvbSAnLi9pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCAnLi9zZWxlY3RlZC1pdGVtcy5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdGVkSXRlbXMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogMCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzICYmIG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbGFzdFVwZGF0ZWQgPSB0aGlzLmdldExhc3RVcGRhdGVTdGFtcChuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyk7XHJcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPT4gKFxyXG4gICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHNcclxuICAgICAgLm1hcChpdGVtID0+IGl0ZW0uZ2V0TGFzdFVwZGF0ZVN0YW1wKCkpXHJcbiAgICAgIC5qb2luKCctJylcclxuICApXHJcblxyXG4gIGdldEdyb3VwSXRlbSA9IChsaXN0SWQsIGNoZWNrZWRJdGVtc0hhc2hMaXN0KSA9PiB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhjaGVja2VkSXRlbXNIYXNoTGlzdCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2ggPSBjaGVja2VkSXRlbXNIYXNoTGlzdFtrZXldO1xyXG4gICAgICBjb25zdCBwYXJlbnRzID0gY2hlY2tlZEl0ZW1zSGFzaC5nZXRQYXJlbnRzKCk7XHJcbiAgICAgIGNvbnN0IHBhcmVudElkcyA9IHBhcmVudHMubWFwKHAgPT4gcC5pZCk7XHJcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWRJdGVtc0hhc2guZ2V0Q2hlY2tlZEl0ZW1zKCk7XHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IGNoZWNrZWRJdGVtc0hhc2guaXNDaGVja2VkQWxsKCk7XHJcbiAgICAgIGNvbnN0IGlzSXRlbVJlbW92YWJsZSA9ICFpc0NoZWNrZWRBbGw7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gcGFyZW50cy5tYXAocCA9PiBwLm5hbWUpLmpvaW4oJyAvICcpO1xyXG5cclxuICAgICAgY29uc3QgaXRlbVJlbmRlcmVyID0gKGluZGV4LCBpdGVtS2V5KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gY2hlY2tlZEl0ZW1zW2luZGV4XTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPEl0ZW1cclxuICAgICAgICAgICAgaXRlbT17T2JqZWN0LmFzc2lnbih7fSwgc2VsZWN0ZWRJdGVtKX1cclxuICAgICAgICAgICAga2V5PXtgJHtpdGVtS2V5fWB9XHJcbiAgICAgICAgICAgIHJlbW92YWJsZT17aXNJdGVtUmVtb3ZhYmxlfVxyXG4gICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudElkc31cclxuICAgICAgICAgICAgc291cmNlSWQ9e2xpc3RJZH1cclxuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbn1cclxuICAgICAgICAgICAgb25SZW1vdmVDbGljaz17dGhpcy5pdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGlzdC5wdXNoKChcclxuICAgICAgICA8R3JvdXBJdGVtXHJcbiAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cclxuICAgICAgICAgIGNvdW50PXtjaGVja2VkSXRlbXMgPyBjaGVja2VkSXRlbXMubGVuZ3RoIDogMH1cclxuICAgICAgICAgIGtleT17YCR7bGlzdElkfS0ke2tleX1gfVxyXG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxyXG4gICAgICAgICAgcmVtb3ZhYmxlXHJcbiAgICAgICAgICBzZWxlY3RlZEFsbD17aXNDaGVja2VkQWxsfVxyXG4gICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRJZHN9XHJcbiAgICAgICAgICBzb3VyY2VJZD17bGlzdElkfVxyXG4gICAgICAgICAgb25SZW1vdmVDbGljaz17dGhpcy5ncm91cFJlbW92ZUNsaWNrSGFuZGxlcn1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8UmVhY3RMaXN0XHJcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxyXG4gICAgICAgICAgICBsZW5ndGg9e2NoZWNrZWRJdGVtcy5sZW5ndGh9XHJcbiAgICAgICAgICAgIHR5cGU9XCJ1bmlmb3JtXCJcclxuICAgICAgICAgICAgdXNlU3RhdGljU2l6ZVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0dyb3VwSXRlbT5cclxuICAgICAgKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QgPSAobGlzdElkKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdHMgPSB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgPyB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgOiBbXTtcclxuICAgIHJldHVybiBjaGVja2VkSXRlbXNIYXNoTGlzdHMuZmluZChsaXN0ID0+IGxpc3RJZCA9PT0gbGlzdC5nZXRJZCgpKTtcclxuICB9XHJcblxyXG4gIGdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGxpc3RJZCwgcmVmZXJlbmNlSWRzKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcclxuICAgIGlmIChjaGVja2VkSXRlbXNIYXNoTGlzdCkge1xyXG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcclxuICAgICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XHJcbiAgICAgIGNoZWNrZWRJdGVtc0hhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcclxuICAgICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUoY2hlY2tlZEl0ZW1zSGFzaExpc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZEl0ZW1zOjpncm91cFJlbW92ZUNsaWNrSGFuZGxlcigpOiBObyBoYXNoIGxpc3Qgb2YgY2hlY2tlZCBpdGVtcyBmb3VuZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXRlbVJlbW92ZUNsaWNrSGFuZGxlciA9IChsaXN0SWQsIHJlZmVyZW5jZUlkcywgaXRlbUlkKSA9PiB7XHJcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdCA9IHRoaXMuZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QobGlzdElkKTtcclxuICAgIGlmIChjaGVja2VkSXRlbXNIYXNoTGlzdCkge1xyXG4gICAgICBjaGVja2VkSXRlbXNIYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpdGVtSWQpO1xyXG4gICAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZShjaGVja2VkSXRlbXNIYXNoTGlzdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdGVkSXRlbXM6Oml0ZW1SZW1vdmVDbGlja0hhbmRsZXIoKTogTm8gaGFzaCBsaXN0IG9mIGNoZWNrZWQgaXRlbXMgZm91bmQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0cyA9IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA/IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA6IFtdO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWl0ZW1zLXdyYXBwZXJcIj5cclxuICAgICAgICA8cD57dGhpcy5wcm9wcy5saXN0TGFiZWx9PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWl0ZW1zXCI+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZ3JvdXAtbGlzdFwiPlxyXG4gICAgICAgICAgICB7Y2hlY2tlZEl0ZW1zSGFzaExpc3RzLm1hcChsaXN0ID0+IHRoaXMuZ2V0R3JvdXBJdGVtKGxpc3QuZ2V0SWQoKSwgbGlzdC5nZXQoKSkpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuU2VsZWN0ZWRJdGVtcy5wcm9wVHlwZXMgPSB7XHJcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXHJcbiAgbGlzdExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxyXG4gIGNoZWNrZWRJdGVtTGlzdHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKENoZWNrZWRJdGVtSGFzaExpc3QpKSxcclxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gIG9uSXRlbVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5TZWxlY3RlZEl0ZW1zLmRlZmF1bHRQcm9wcyA9IHtcclxuICBhbGxMYWJlbDogJ0FsbCcsXHJcbiAgbGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxyXG4gIGNoZWNrZWRJdGVtTGlzdHM6IG51bGwsXHJcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxyXG4gIG9uSXRlbVJlbW92ZTogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==