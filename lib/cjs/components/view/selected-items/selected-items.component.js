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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RlZEl0ZW1zIiwicHJvcHMiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJjaGVja2VkSXRlbUhhc2hMaXN0cyIsIm1hcCIsIml0ZW0iLCJqb2luIiwiZ2V0R3JvdXBJdGVtIiwibGlzdElkIiwiY2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjaGVja2VkSXRlbXNIYXNoIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJwYXJlbnRJZHMiLCJwIiwiaWQiLCJjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkSXRlbXMiLCJpc0NoZWNrZWRBbGwiLCJpc0l0ZW1SZW1vdmFibGUiLCJ0aXRsZSIsIm5hbWUiLCJpdGVtUmVuZGVyZXIiLCJpbmRleCIsIml0ZW1LZXkiLCJzZWxlY3RlZEl0ZW0iLCJhc3NpZ24iLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHVzaCIsImFsbExhYmVsIiwibGVuZ3RoIiwiZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIiLCJnZXRjaGVja2VkSXRlbXNIYXNoTGlzdCIsImNoZWNrZWRJdGVtc0hhc2hMaXN0cyIsImNoZWNrZWRJdGVtTGlzdHMiLCJmaW5kIiwiZ2V0SWQiLCJyZWZlcmVuY2VJZHMiLCJzbGljZSIsInBvcCIsInJlbW92ZUFsbCIsIm9uSXRlbVJlbW92ZSIsIkVycm9yIiwiaXRlbUlkIiwicmVtb3ZlIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImxhc3RVcGRhdGVkIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsaXN0TGFiZWwiLCJnZXQiLCJSZWFjdCIsIlB1cmVDb21wb25l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d0JHO0FBRFosU0FBZDtBQUdEO0FBQ0Y7QUFDRixHOzswQkFxRkRFLE0scUJBQVM7QUFBQTs7QUFDUCxRQUFNbEIsd0JBQXdCLEtBQUt0QyxLQUFMLENBQVd1QyxnQkFBWCxHQUE4QixLQUFLdkMsS0FBTCxDQUFXdUMsZ0JBQXpDLEdBQTRELEVBQTFGOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSw4Q0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFJLGFBQUt2QyxLQUFMLENBQVd5RDtBQUFmLE9BREY7QUFFRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHNDQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUksV0FBVSxZQUFkO0FBQ0duQixnQ0FBc0JuQyxHQUF0QixDQUEwQjtBQUFBLG1CQUFRLE9BQUtHLFlBQUwsQ0FBa0JHLEtBQUtnQyxLQUFMLEVBQWxCLEVBQWdDaEMsS0FBS2lELEdBQUwsRUFBaEMsQ0FBUjtBQUFBLFdBQTFCO0FBREg7QUFERjtBQUZGLEtBREY7QUFVRCxHOzs7RUFuSHdDQyxnQkFBTUMsYTs7a0JBQTVCN0QsYTs7O0FBOEhyQkEsY0FBYzhELFlBQWQsR0FBNkI7QUFDM0IzQixZQUFVLEtBRGlCO0FBRTNCdUIsYUFBVyxnQkFGZ0I7QUFHM0JsQixvQkFBa0IsSUFIUztBQUkzQlIsc0JBQW9CLElBSk87QUFLM0JlLGdCQUFjLHdCQUFNLENBQUU7QUFMSyxDQUE3QiIsImZpbGUiOiJzZWxlY3RlZC1pdGVtcy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdExpc3QgZnJvbSAncmVhY3QtbGlzdCc7XG5cbmltcG9ydCBDaGVja2VkSXRlbUhhc2hMaXN0IGZyb20gJy4uLy4uLy4uL21vZGVscy9jaGVja2VkLWl0ZW1zL2NoZWNrZWQtaXRlbS1oYXNoLWxpc3QnO1xuaW1wb3J0IEdyb3VwSXRlbSBmcm9tICcuL2dyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0uY29tcG9uZW50JztcbmltcG9ydCAnLi9zZWxlY3RlZC1pdGVtcy5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0ZWRJdGVtcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogMCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmNoZWNrZWRJdGVtTGlzdHMgJiYgbmV4dFByb3BzLmNoZWNrZWRJdGVtTGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbGFzdFVwZGF0ZWQgPSB0aGlzLmdldExhc3RVcGRhdGVTdGFtcChuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyk7XG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFzdFVwZGF0ZVN0YW1wID0gY2hlY2tlZEl0ZW1IYXNoTGlzdHMgPT4gKFxuICAgIGNoZWNrZWRJdGVtSGFzaExpc3RzXG4gICAgICAubWFwKGl0ZW0gPT4gaXRlbS5nZXRMYXN0VXBkYXRlU3RhbXAoKSlcbiAgICAgIC5qb2luKCctJylcbiAgKVxuXG4gIGdldEdyb3VwSXRlbSA9IChsaXN0SWQsIGNoZWNrZWRJdGVtc0hhc2hMaXN0KSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGNoZWNrZWRJdGVtc0hhc2hMaXN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2ggPSBjaGVja2VkSXRlbXNIYXNoTGlzdFtrZXldO1xuICAgICAgY29uc3QgcGFyZW50cyA9IGNoZWNrZWRJdGVtc0hhc2guZ2V0UGFyZW50cygpO1xuICAgICAgY29uc3QgcGFyZW50SWRzID0gcGFyZW50cy5tYXAocCA9PiBwLmlkKTtcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtcyA9IGNoZWNrZWRJdGVtc0hhc2guZ2V0Q2hlY2tlZEl0ZW1zKCk7XG4gICAgICBjb25zdCBpc0NoZWNrZWRBbGwgPSBjaGVja2VkSXRlbXNIYXNoLmlzQ2hlY2tlZEFsbCgpO1xuICAgICAgY29uc3QgaXNJdGVtUmVtb3ZhYmxlID0gIWlzQ2hlY2tlZEFsbDtcbiAgICAgIGNvbnN0IHRpdGxlID0gcGFyZW50cy5tYXAocCA9PiBwLm5hbWUpLmpvaW4oJyAvICcpO1xuXG4gICAgICBjb25zdCBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGl0ZW1LZXkpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gY2hlY2tlZEl0ZW1zW2luZGV4XTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8SXRlbVxuICAgICAgICAgICAgaXRlbT17T2JqZWN0LmFzc2lnbih7fSwgc2VsZWN0ZWRJdGVtKX1cbiAgICAgICAgICAgIGtleT17YCR7aXRlbUtleX1gfVxuICAgICAgICAgICAgcmVtb3ZhYmxlPXtpc0l0ZW1SZW1vdmFibGV9XG4gICAgICAgICAgICByZWZlcmVuY2VJZHM9e3BhcmVudElkc31cbiAgICAgICAgICAgIHNvdXJjZUlkPXtsaXN0SWR9XG4gICAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9ufVxuICAgICAgICAgICAgb25SZW1vdmVDbGljaz17dGhpcy5pdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICBsaXN0LnB1c2goKFxuICAgICAgICA8R3JvdXBJdGVtXG4gICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgY291bnQ9e2NoZWNrZWRJdGVtcyA/IGNoZWNrZWRJdGVtcy5sZW5ndGggOiAwfVxuICAgICAgICAgIGtleT17YCR7bGlzdElkfS0ke2tleX1gfVxuICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICByZW1vdmFibGVcbiAgICAgICAgICBzZWxlY3RlZEFsbD17aXNDaGVja2VkQWxsfVxuICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50SWRzfVxuICAgICAgICAgIHNvdXJjZUlkPXtsaXN0SWR9XG4gICAgICAgICAgb25SZW1vdmVDbGljaz17dGhpcy5ncm91cFJlbW92ZUNsaWNrSGFuZGxlcn1cbiAgICAgICAgPlxuICAgICAgICAgIDxSZWFjdExpc3RcbiAgICAgICAgICAgIGl0ZW1SZW5kZXJlcj17aXRlbVJlbmRlcmVyfVxuICAgICAgICAgICAgbGVuZ3RoPXtjaGVja2VkSXRlbXMubGVuZ3RofVxuICAgICAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxuICAgICAgICAgICAgdXNlU3RhdGljU2l6ZVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvR3JvdXBJdGVtPlxuICAgICAgKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXRjaGVja2VkSXRlbXNIYXNoTGlzdCA9IChsaXN0SWQpID0+IHtcbiAgICBjb25zdCBjaGVja2VkSXRlbXNIYXNoTGlzdHMgPSB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgPyB0aGlzLnByb3BzLmNoZWNrZWRJdGVtTGlzdHMgOiBbXTtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1zSGFzaExpc3RzLmZpbmQobGlzdCA9PiBsaXN0SWQgPT09IGxpc3QuZ2V0SWQoKSk7XG4gIH1cblxuICBncm91cFJlbW92ZUNsaWNrSGFuZGxlciA9IChsaXN0SWQsIHJlZmVyZW5jZUlkcykgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0ID0gdGhpcy5nZXRjaGVja2VkSXRlbXNIYXNoTGlzdChsaXN0SWQpO1xuICAgIGlmIChjaGVja2VkSXRlbXNIYXNoTGlzdCkge1xuICAgICAgY29uc3QgcGFyZW50SWRzID0gcmVmZXJlbmNlSWRzLnNsaWNlKCk7XG4gICAgICBjb25zdCBpZCA9IHBhcmVudElkcy5wb3AoKTtcbiAgICAgIGNoZWNrZWRJdGVtc0hhc2hMaXN0LnJlbW92ZUFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICAgIHRoaXMucHJvcHMub25JdGVtUmVtb3ZlKGNoZWNrZWRJdGVtc0hhc2hMaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZEl0ZW1zOjpncm91cFJlbW92ZUNsaWNrSGFuZGxlcigpOiBObyBoYXNoIGxpc3Qgb2YgY2hlY2tlZCBpdGVtcyBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIGl0ZW1SZW1vdmVDbGlja0hhbmRsZXIgPSAobGlzdElkLCByZWZlcmVuY2VJZHMsIGl0ZW1JZCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0ID0gdGhpcy5nZXRjaGVja2VkSXRlbXNIYXNoTGlzdChsaXN0SWQpO1xuICAgIGlmIChjaGVja2VkSXRlbXNIYXNoTGlzdCkge1xuICAgICAgY2hlY2tlZEl0ZW1zSGFzaExpc3QucmVtb3ZlKHJlZmVyZW5jZUlkcywgaXRlbUlkKTtcbiAgICAgIHRoaXMucHJvcHMub25JdGVtUmVtb3ZlKGNoZWNrZWRJdGVtc0hhc2hMaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZEl0ZW1zOjppdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyKCk6IE5vIGhhc2ggbGlzdCBvZiBjaGVja2VkIGl0ZW1zIGZvdW5kJyk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0cyA9IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA/IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA6IFtdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdGVkLWl0ZW1zLXdyYXBwZXJcIj5cbiAgICAgICAgPHA+e3RoaXMucHJvcHMubGlzdExhYmVsfTwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtaXRlbXNcIj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwiZ3JvdXAtbGlzdFwiPlxuICAgICAgICAgICAge2NoZWNrZWRJdGVtc0hhc2hMaXN0cy5tYXAobGlzdCA9PiB0aGlzLmdldEdyb3VwSXRlbShsaXN0LmdldElkKCksIGxpc3QuZ2V0KCkpKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuU2VsZWN0ZWRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBsaXN0TGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGNoZWNrZWRJdGVtTGlzdHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5pbnN0YW5jZU9mKENoZWNrZWRJdGVtSGFzaExpc3QpKSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25JdGVtUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblNlbGVjdGVkSXRlbXMuZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGxpc3RMYWJlbDogJ1NlbGVjdGVkIGl0ZW1zJyxcbiAgY2hlY2tlZEl0ZW1MaXN0czogbnVsbCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBvbkl0ZW1SZW1vdmU6ICgpID0+IHt9LFxufTtcbiJdfQ==