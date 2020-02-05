"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactList = _interopRequireDefault(require("react-list"));

var _checkedItemHashList = _interopRequireDefault(require("../../../models/checked-items/checked-item-hash-list"));

var _group = _interopRequireDefault(require("./group.component"));

var _item = _interopRequireDefault(require("./item.component"));

require("./selected-items.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          return _react["default"].createElement(_item["default"], {
            item: Object.assign({}, selectedItem),
            key: "" + itemKey,
            removable: isItemRemovable,
            referenceIds: parentIds,
            sourceId: listId,
            itemRenderFunction: _this.props.itemRenderFunction,
            onRemoveClick: _this.itemRemoveClickHandler
          });
        };

        list.push(_react["default"].createElement(_group["default"], {
          allLabel: _this.props.allLabel,
          count: checkedItems ? checkedItems.length : 0,
          key: listId + "-" + key,
          title: title,
          removable: true,
          selectedAll: isCheckedAll,
          referenceIds: parentIds,
          sourceId: listId,
          onRemoveClick: _this.groupRemoveClickHandler
        }, _react["default"].createElement(_reactList["default"], {
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
    return _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-selected-items-wrapper"
    }, _react["default"].createElement("p", null, this.props.listLabel), _react["default"].createElement("div", {
      className: "oc-hierarchy-selector-selected-items"
    }, _react["default"].createElement("ul", {
      className: "group-list"
    }, checkedItemsHashLists.map(function (list) {
      return _this2.getGroupItem(list.getId(), list.get());
    }))));
  };

  return SelectedItems;
}(_react["default"].PureComponent);

exports["default"] = SelectedItems;
SelectedItems.defaultProps = {
  allLabel: 'All',
  listLabel: 'Selected items',
  checkedItemLists: null,
  itemRenderFunction: null,
  onItemRemove: function onItemRemove() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvc2VsZWN0ZWQtaXRlbXMuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJTZWxlY3RlZEl0ZW1zIiwicHJvcHMiLCJjaGVja2VkSXRlbUhhc2hMaXN0cyIsIm1hcCIsIml0ZW0iLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJqb2luIiwibGlzdElkIiwiY2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJsaXN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjaGVja2VkSXRlbXNIYXNoIiwicGFyZW50cyIsImdldFBhcmVudHMiLCJwYXJlbnRJZHMiLCJwIiwiaWQiLCJjaGVja2VkSXRlbXMiLCJnZXRDaGVja2VkSXRlbXMiLCJpc0NoZWNrZWRBbGwiLCJpc0l0ZW1SZW1vdmFibGUiLCJ0aXRsZSIsIm5hbWUiLCJpdGVtUmVuZGVyZXIiLCJpbmRleCIsIml0ZW1LZXkiLCJzZWxlY3RlZEl0ZW0iLCJhc3NpZ24iLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJpdGVtUmVtb3ZlQ2xpY2tIYW5kbGVyIiwicHVzaCIsImFsbExhYmVsIiwibGVuZ3RoIiwiZ3JvdXBSZW1vdmVDbGlja0hhbmRsZXIiLCJjaGVja2VkSXRlbXNIYXNoTGlzdHMiLCJjaGVja2VkSXRlbUxpc3RzIiwiZmluZCIsImdldElkIiwicmVmZXJlbmNlSWRzIiwiZ2V0Y2hlY2tlZEl0ZW1zSGFzaExpc3QiLCJzbGljZSIsInBvcCIsInJlbW92ZUFsbCIsIm9uSXRlbVJlbW92ZSIsIkVycm9yIiwiaXRlbUlkIiwicmVtb3ZlIiwic3RhdGUiLCJjaGVja2VkSXRlbXNMYXN0VXBkYXRlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImxhc3RVcGRhdGVkIiwic2V0U3RhdGUiLCJyZW5kZXIiLCJsaXN0TGFiZWwiLCJnZXRHcm91cEl0ZW0iLCJnZXQiLCJSZWFjdCIsIlB1cmVDb21wb25l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O0FBOEhqRDdELGFBQWEsQ0FBQzhELFlBQWQsR0FBNkI7QUFDM0I1QixFQUFBQSxRQUFRLEVBQUUsS0FEaUI7QUFFM0J1QixFQUFBQSxTQUFTLEVBQUUsZ0JBRmdCO0FBRzNCbkIsRUFBQUEsZ0JBQWdCLEVBQUUsSUFIUztBQUkzQlAsRUFBQUEsa0JBQWtCLEVBQUUsSUFKTztBQUszQmUsRUFBQUEsWUFBWSxFQUFFLHdCQUFNLENBQUU7QUFMSyxDQUE3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcblxuaW1wb3J0IENoZWNrZWRJdGVtSGFzaExpc3QgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NoZWNrZWQtaXRlbXMvY2hlY2tlZC1pdGVtLWhhc2gtbGlzdCc7XG5pbXBvcnQgR3JvdXBJdGVtIGZyb20gJy4vZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCBJdGVtIGZyb20gJy4vaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0ICcuL3NlbGVjdGVkLWl0ZW1zLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RlZEl0ZW1zIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyAmJiBuZXh0UHJvcHMuY2hlY2tlZEl0ZW1MaXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IHRoaXMuZ2V0TGFzdFVwZGF0ZVN0YW1wKG5leHRQcm9wcy5jaGVja2VkSXRlbUxpc3RzKTtcbiAgICAgIGlmIChsYXN0VXBkYXRlZCAhPT0gdGhpcy5zdGF0ZS5jaGVja2VkSXRlbXNMYXN0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNoZWNrZWRJdGVtc0xhc3RVcGRhdGU6IGxhc3RVcGRhdGVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRMYXN0VXBkYXRlU3RhbXAgPSBjaGVja2VkSXRlbUhhc2hMaXN0cyA9PiAoXG4gICAgY2hlY2tlZEl0ZW1IYXNoTGlzdHNcbiAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLmdldExhc3RVcGRhdGVTdGFtcCgpKVxuICAgICAgLmpvaW4oJy0nKVxuICApXG5cbiAgZ2V0R3JvdXBJdGVtID0gKGxpc3RJZCwgY2hlY2tlZEl0ZW1zSGFzaExpc3QpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gW107XG4gICAgT2JqZWN0LmtleXMoY2hlY2tlZEl0ZW1zSGFzaExpc3QpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaCA9IGNoZWNrZWRJdGVtc0hhc2hMaXN0W2tleV07XG4gICAgICBjb25zdCBwYXJlbnRzID0gY2hlY2tlZEl0ZW1zSGFzaC5nZXRQYXJlbnRzKCk7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSBwYXJlbnRzLm1hcChwID0+IHAuaWQpO1xuICAgICAgY29uc3QgY2hlY2tlZEl0ZW1zID0gY2hlY2tlZEl0ZW1zSGFzaC5nZXRDaGVja2VkSXRlbXMoKTtcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IGNoZWNrZWRJdGVtc0hhc2guaXNDaGVja2VkQWxsKCk7XG4gICAgICBjb25zdCBpc0l0ZW1SZW1vdmFibGUgPSAhaXNDaGVja2VkQWxsO1xuICAgICAgY29uc3QgdGl0bGUgPSBwYXJlbnRzLm1hcChwID0+IHAubmFtZSkuam9pbignIC8gJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW1SZW5kZXJlciA9IChpbmRleCwgaXRlbUtleSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBjaGVja2VkSXRlbXNbaW5kZXhdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxJdGVtXG4gICAgICAgICAgICBpdGVtPXtPYmplY3QuYXNzaWduKHt9LCBzZWxlY3RlZEl0ZW0pfVxuICAgICAgICAgICAga2V5PXtgJHtpdGVtS2V5fWB9XG4gICAgICAgICAgICByZW1vdmFibGU9e2lzSXRlbVJlbW92YWJsZX1cbiAgICAgICAgICAgIHJlZmVyZW5jZUlkcz17cGFyZW50SWRzfVxuICAgICAgICAgICAgc291cmNlSWQ9e2xpc3RJZH1cbiAgICAgICAgICAgIGl0ZW1SZW5kZXJGdW5jdGlvbj17dGhpcy5wcm9wcy5pdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICBvblJlbW92ZUNsaWNrPXt0aGlzLml0ZW1SZW1vdmVDbGlja0hhbmRsZXJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIGxpc3QucHVzaCgoXG4gICAgICAgIDxHcm91cEl0ZW1cbiAgICAgICAgICBhbGxMYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICBjb3VudD17Y2hlY2tlZEl0ZW1zID8gY2hlY2tlZEl0ZW1zLmxlbmd0aCA6IDB9XG4gICAgICAgICAga2V5PXtgJHtsaXN0SWR9LSR7a2V5fWB9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIHJlbW92YWJsZVxuICAgICAgICAgIHNlbGVjdGVkQWxsPXtpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRJZHN9XG4gICAgICAgICAgc291cmNlSWQ9e2xpc3RJZH1cbiAgICAgICAgICBvblJlbW92ZUNsaWNrPXt0aGlzLmdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyfVxuICAgICAgICA+XG4gICAgICAgICAgPFJlYWN0TGlzdFxuICAgICAgICAgICAgaXRlbVJlbmRlcmVyPXtpdGVtUmVuZGVyZXJ9XG4gICAgICAgICAgICBsZW5ndGg9e2NoZWNrZWRJdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICB0eXBlPVwidW5pZm9ybVwiXG4gICAgICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Hcm91cEl0ZW0+XG4gICAgICApKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldGNoZWNrZWRJdGVtc0hhc2hMaXN0ID0gKGxpc3RJZCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtc0hhc2hMaXN0cyA9IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA/IHRoaXMucHJvcHMuY2hlY2tlZEl0ZW1MaXN0cyA6IFtdO1xuICAgIHJldHVybiBjaGVja2VkSXRlbXNIYXNoTGlzdHMuZmluZChsaXN0ID0+IGxpc3RJZCA9PT0gbGlzdC5nZXRJZCgpKTtcbiAgfVxuXG4gIGdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyID0gKGxpc3RJZCwgcmVmZXJlbmNlSWRzKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3QgPSB0aGlzLmdldGNoZWNrZWRJdGVtc0hhc2hMaXN0KGxpc3RJZCk7XG4gICAgaWYgKGNoZWNrZWRJdGVtc0hhc2hMaXN0KSB7XG4gICAgICBjb25zdCBwYXJlbnRJZHMgPSByZWZlcmVuY2VJZHMuc2xpY2UoKTtcbiAgICAgIGNvbnN0IGlkID0gcGFyZW50SWRzLnBvcCgpO1xuICAgICAgY2hlY2tlZEl0ZW1zSGFzaExpc3QucmVtb3ZlQWxsKHBhcmVudElkcywgaWQpO1xuICAgICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUoY2hlY2tlZEl0ZW1zSGFzaExpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdGVkSXRlbXM6Omdyb3VwUmVtb3ZlQ2xpY2tIYW5kbGVyKCk6IE5vIGhhc2ggbGlzdCBvZiBjaGVja2VkIGl0ZW1zIGZvdW5kJyk7XG4gICAgfVxuICB9XG5cbiAgaXRlbVJlbW92ZUNsaWNrSGFuZGxlciA9IChsaXN0SWQsIHJlZmVyZW5jZUlkcywgaXRlbUlkKSA9PiB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3QgPSB0aGlzLmdldGNoZWNrZWRJdGVtc0hhc2hMaXN0KGxpc3RJZCk7XG4gICAgaWYgKGNoZWNrZWRJdGVtc0hhc2hMaXN0KSB7XG4gICAgICBjaGVja2VkSXRlbXNIYXNoTGlzdC5yZW1vdmUocmVmZXJlbmNlSWRzLCBpdGVtSWQpO1xuICAgICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUoY2hlY2tlZEl0ZW1zSGFzaExpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdGVkSXRlbXM6Oml0ZW1SZW1vdmVDbGlja0hhbmRsZXIoKTogTm8gaGFzaCBsaXN0IG9mIGNoZWNrZWQgaXRlbXMgZm91bmQnKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1zSGFzaExpc3RzID0gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzID8gdGhpcy5wcm9wcy5jaGVja2VkSXRlbUxpc3RzIDogW107XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3Itc2VsZWN0ZWQtaXRlbXMtd3JhcHBlclwiPlxuICAgICAgICA8cD57dGhpcy5wcm9wcy5saXN0TGFiZWx9PC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3RlZC1pdGVtc1wiPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJncm91cC1saXN0XCI+XG4gICAgICAgICAgICB7Y2hlY2tlZEl0ZW1zSGFzaExpc3RzLm1hcChsaXN0ID0+IHRoaXMuZ2V0R3JvdXBJdGVtKGxpc3QuZ2V0SWQoKSwgbGlzdC5nZXQoKSkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5TZWxlY3RlZEl0ZW1zLnByb3BUeXBlcyA9IHtcbiAgYWxsTGFiZWw6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIGxpc3RMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY2hlY2tlZEl0ZW1MaXN0czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoQ2hlY2tlZEl0ZW1IYXNoTGlzdCkpLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBvbkl0ZW1SZW1vdmU6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuU2VsZWN0ZWRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgbGlzdExhYmVsOiAnU2VsZWN0ZWQgaXRlbXMnLFxuICBjaGVja2VkSXRlbUxpc3RzOiBudWxsLFxuICBpdGVtUmVuZGVyRnVuY3Rpb246IG51bGwsXG4gIG9uSXRlbVJlbW92ZTogKCkgPT4ge30sXG59O1xuIl19