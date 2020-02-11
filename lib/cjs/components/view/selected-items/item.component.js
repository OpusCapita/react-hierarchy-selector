"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var _types = require("../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Item =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Item, _React$PureComponent);

  function Item() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHanlder", function (e) {
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "removeClickHandler", function (e) {
      var _this$props = _this.props,
          onRemoveClick = _this$props.onRemoveClick,
          item = _this$props.item,
          sourceId = _this$props.sourceId,
          referenceIds = _this$props.referenceIds;
      e.stopPropagation();
      onRemoveClick(sourceId, referenceIds.slice(), item.id);
    });

    _defineProperty(_assertThisInitialized(_this), "defaultItemRenderFunction", function () {
      var item = _this.props.item;
      return _react["default"].createElement("span", null, item.name);
    });

    return _this;
  }

  var _proto = Item.prototype;

  _proto.getRemoveIcon = function getRemoveIcon() {
    return this.props.removable ? _react["default"].createElement("span", {
      className: "component-icon clickable",
      onClick: this.removeClickHandler
    }, _react["default"].createElement(_fa.FaTrashAlt, null)) : null;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        item = _this$props2.item,
        itemRenderFunction = _this$props2.itemRenderFunction,
        removable = _this$props2.removable;
    return _react["default"].createElement("div", {
      className: "selected-item",
      onClick: this.clickHanlder
    }, _react["default"].createElement("div", {
      className: "left-block"
    }, itemRenderFunction ? itemRenderFunction(Object.assign({}, item)) : this.defaultItemRenderFunction()), removable ? _react["default"].createElement("div", {
      className: "right-block"
    }, this.getRemoveIcon()) : null);
  };

  return Item;
}(_react["default"].PureComponent);

exports["default"] = Item;
Item.defaultProps = {
  onRemoveClick: function onRemoveClick() {},
  itemRenderFunction: null,
  referenceIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvc2VsZWN0ZWQtaXRlbXMvaXRlbS5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW0iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicHJvcHMiLCJvblJlbW92ZUNsaWNrIiwiaXRlbSIsInNvdXJjZUlkIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJpZCIsIm5hbWUiLCJnZXRSZW1vdmVJY29uIiwicmVtb3ZhYmxlIiwicmVtb3ZlQ2xpY2tIYW5kbGVyIiwicmVuZGVyIiwiaXRlbVJlbmRlckZ1bmN0aW9uIiwiY2xpY2tIYW5sZGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7Ozs7bUVBU0osVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCQSxNQUFBQSxDQUFDLENBQUNDLGVBQUY7QUFDRCxLOzt5RUFFb0IsVUFBQ0QsQ0FBRCxFQUFPO0FBQUEsd0JBTXRCLE1BQUtFLEtBTmlCO0FBQUEsVUFFeEJDLGFBRndCLGVBRXhCQSxhQUZ3QjtBQUFBLFVBR3hCQyxJQUh3QixlQUd4QkEsSUFId0I7QUFBQSxVQUl4QkMsUUFKd0IsZUFJeEJBLFFBSndCO0FBQUEsVUFLeEJDLFlBTHdCLGVBS3hCQSxZQUx3QjtBQU8xQk4sTUFBQUEsQ0FBQyxDQUFDQyxlQUFGO0FBQ0FFLE1BQUFBLGFBQWEsQ0FBQ0UsUUFBRCxFQUFXQyxZQUFZLENBQUNDLEtBQWIsRUFBWCxFQUFpQ0gsSUFBSSxDQUFDSSxFQUF0QyxDQUFiO0FBQ0QsSzs7Z0ZBRTJCLFlBQU07QUFBQSxVQUN4QkosSUFEd0IsR0FDZixNQUFLRixLQURVLENBQ3hCRSxJQUR3QjtBQUVoQyxhQUNFLDhDQUNHQSxJQUFJLENBQUNLLElBRFIsQ0FERjtBQUtELEs7Ozs7Ozs7U0E5QkRDLGEsR0FBQSx5QkFBZ0I7QUFDZCxXQUFPLEtBQUtSLEtBQUwsQ0FBV1MsU0FBWCxHQUNMO0FBQU0sTUFBQSxTQUFTLEVBQUMsMEJBQWhCO0FBQTJDLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXpELE9BQ0UsZ0NBQUMsY0FBRCxPQURGLENBREssR0FJSCxJQUpKO0FBS0QsRzs7U0EwQkRDLE0sR0FBQSxrQkFBUztBQUFBLHVCQUN5QyxLQUFLWCxLQUQ5QztBQUFBLFFBQ0NFLElBREQsZ0JBQ0NBLElBREQ7QUFBQSxRQUNPVSxrQkFEUCxnQkFDT0Esa0JBRFA7QUFBQSxRQUMyQkgsU0FEM0IsZ0JBQzJCQSxTQUQzQjtBQUVQLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQyxlQUFmO0FBQStCLE1BQUEsT0FBTyxFQUFFLEtBQUtJO0FBQTdDLE9BQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0dELGtCQUFrQixHQUNqQkEsa0JBQWtCLENBQUNFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JiLElBQWxCLENBQUQsQ0FERCxHQUM2QixLQUFLYyx5QkFBTCxFQUZsRCxDQURGLEVBS0dQLFNBQVMsR0FDUjtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLRCxhQUFMLEVBREgsQ0FEUSxHQUdDLElBUmIsQ0FERjtBQWFELEc7OztFQWhEK0JTLGtCQUFNQyxhOzs7QUE0RHhDckIsSUFBSSxDQUFDc0IsWUFBTCxHQUFvQjtBQUNsQmxCLEVBQUFBLGFBQWEsRUFBRSx5QkFBTSxDQUFFLENBREw7QUFFbEJXLEVBQUFBLGtCQUFrQixFQUFFLElBRkY7QUFHbEJSLEVBQUFBLFlBQVksRUFBRTtBQUhJLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmFUcmFzaEFsdCB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1TaGFwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBnZXRSZW1vdmVJY29uKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnJlbW92YWJsZSA/XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJjb21wb25lbnQtaWNvbiBjbGlja2FibGVcIiBvbkNsaWNrPXt0aGlzLnJlbW92ZUNsaWNrSGFuZGxlcn0+XG4gICAgICAgIDxGYVRyYXNoQWx0IC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA6IG51bGw7XG4gIH1cblxuICBjbGlja0hhbmxkZXIgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICByZW1vdmVDbGlja0hhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uUmVtb3ZlQ2xpY2ssXG4gICAgICBpdGVtLFxuICAgICAgc291cmNlSWQsXG4gICAgICByZWZlcmVuY2VJZHMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBvblJlbW92ZUNsaWNrKHNvdXJjZUlkLCByZWZlcmVuY2VJZHMuc2xpY2UoKSwgaXRlbS5pZCk7XG4gIH1cblxuICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4+XG4gICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGl0ZW0sIGl0ZW1SZW5kZXJGdW5jdGlvbiwgcmVtb3ZhYmxlIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdGVkLWl0ZW1cIiBvbkNsaWNrPXt0aGlzLmNsaWNrSGFubGRlcn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGVmdC1ibG9ja1wiPlxuICAgICAgICAgIHtpdGVtUmVuZGVyRnVuY3Rpb24gP1xuICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uKE9iamVjdC5hc3NpZ24oe30sIGl0ZW0pKSA6IHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbigpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3JlbW92YWJsZSA/XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1ibG9ja1wiPlxuICAgICAgICAgICAge3RoaXMuZ2V0UmVtb3ZlSWNvbigpfVxuICAgICAgICAgIDwvZGl2PiA6IG51bGxcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JdGVtLnByb3BUeXBlcyA9IHtcbiAgaXRlbTogaGllcmFyY2h5SXRlbVNoYXBlLmlzUmVxdWlyZWQsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gIHJlbW92YWJsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgc291cmNlSWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgcmVmZXJlbmNlSWRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSkpLFxuICBvblJlbW92ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICBvblJlbW92ZUNsaWNrOiAoKSA9PiB7fSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxufTtcbiJdfQ==