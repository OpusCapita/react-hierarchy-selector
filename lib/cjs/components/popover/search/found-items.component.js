"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactList = _interopRequireDefault(require("react-list"));

var _fa = require("react-icons/fa");

var _types = require("../../../types");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PopoverFoundItems =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(PopoverFoundItems, _React$PureComponent);

  function PopoverFoundItems(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onGroupClickHanlder", function (e) {
      e.preventDefault();

      _this.toggleCollapse();
    });

    _defineProperty(_assertThisInitialized(_this), "onClickHanlder", function (e, key) {
      e.preventDefault();

      _this.selectItem(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnterPressed", function (e, key) {
      if (e.keyCode === 13) {
        e.preventDefault();

        _this.selectItem(key);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      var data = _this.props.data;

      var itemRenderer = function itemRenderer(index, key) {
        var item = data[index];
        return _react["default"].createElement("div", {
          className: "list-group-item found-item " + _constants.CLASS_NAME_SEARCH_FOCUSABLE,
          key: key,
          tabIndex: "0",
          onKeyDown: function onKeyDown(e) {
            return _this.onEnterPressed(e, index);
          },
          onClick: function onClick(e) {
            return _this.onClickHanlder(e, index);
          }
        }, _this.props.itemRenderFunction ? _this.props.itemRenderFunction(item, _this.defaultItemRenderFunction) : _this.defaultItemRenderFunction(item));
      };

      return _react["default"].createElement(_reactList["default"], {
        itemRenderer: itemRenderer,
        length: data.length,
        type: "uniform",
        useStaticSize: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getIcon", function () {
      return _this.state.collapsed ? _react["default"].createElement(_fa.FaCaretRight, null) : _react["default"].createElement(_fa.FaCaretDown, null);
    });

    _defineProperty(_assertThisInitialized(_this), "defaultItemRenderFunction", function (item) {
      return _react["default"].createElement("span", null, item.name);
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (key) {
      var flags = {
        interactive: true
      };

      _this.props.onSelect(_this.props.data[key], flags);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCollapse", function () {
      _this.setState({
        collapsed: !_this.state.collapsed
      });
    });

    _this.state = {
      collapsed: false
    };
    return _this;
  }

  var _proto = PopoverFoundItems.prototype;

  _proto.render = function render() {
    return _react["default"].createElement("li", {
      className: "list-group-item found-group-item",
      onClick: this.onGroupClickHanlder
    }, this.getIcon(), _react["default"].createElement("span", null, this.props.groupName), !this.state.collapsed && this.props.data.length > 0 ? this.getItems() : null);
  };

  return PopoverFoundItems;
}(_react["default"].PureComponent);

exports["default"] = PopoverFoundItems;
PopoverFoundItems.defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  itemRenderFunction: null
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc2VhcmNoL2ZvdW5kLWl0ZW1zLmNvbXBvbmVudC5qc3giXSwibmFtZXMiOlsiUG9wb3ZlckZvdW5kSXRlbXMiLCJwcm9wcyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNvbGxhcHNlIiwia2V5Iiwic2VsZWN0SXRlbSIsImtleUNvZGUiLCJkYXRhIiwiaXRlbVJlbmRlcmVyIiwiaW5kZXgiLCJpdGVtIiwiQ0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFIiwib25FbnRlclByZXNzZWQiLCJvbkNsaWNrSGFubGRlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsImRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24iLCJsZW5ndGgiLCJzdGF0ZSIsImNvbGxhcHNlZCIsIm5hbWUiLCJmbGFncyIsImludGVyYWN0aXZlIiwib25TZWxlY3QiLCJzZXRTdGF0ZSIsInJlbmRlciIsIm9uR3JvdXBDbGlja0hhbmxkZXIiLCJnZXRJY29uIiwiZ3JvdXBOYW1lIiwiZ2V0SXRlbXMiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGlCOzs7OztBQUNuQiw2QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIsMEVBT0csVUFBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0EsWUFBS0MsY0FBTDtBQUNELEtBVmtCOztBQUFBLHFFQVlGLFVBQUNGLENBQUQsRUFBSUcsR0FBSixFQUFZO0FBQzNCSCxNQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0EsWUFBS0csVUFBTCxDQUFnQkQsR0FBaEI7QUFDRCxLQWZrQjs7QUFBQSxxRUFpQkYsVUFBQ0gsQ0FBRCxFQUFJRyxHQUFKLEVBQVk7QUFDM0Is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QUZ5QjtBQUcvQk8sRUFBQUEsa0JBQWtCLEVBQUU7QUFIVyxDQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLW5vbmludGVyYWN0aXZlLXRhYmluZGV4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0TGlzdCBmcm9tICdyZWFjdC1saXN0JztcbmltcG9ydCB7IEZhQ2FyZXRSaWdodCwgRmFDYXJldERvd24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmltcG9ydCB7IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUgfSBmcm9tICcuLi8uLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBDTEFTU19OQU1FX1NFQVJDSF9GT0NVU0FCTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BvdmVyRm91bmRJdGVtcyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgb25Hcm91cENsaWNrSGFubGRlciA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMudG9nZ2xlQ29sbGFwc2UoKTtcbiAgfVxuXG4gIG9uQ2xpY2tIYW5sZGVyID0gKGUsIGtleSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgfVxuXG4gIG9uRW50ZXJQcmVzc2VkID0gKGUsIGtleSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdEl0ZW0oa2V5KTtcbiAgICB9XG4gIH1cblxuICBnZXRJdGVtcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBpdGVtUmVuZGVyZXIgPSAoaW5kZXgsIGtleSkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaW5kZXhdO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17YGxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1pdGVtICR7Q0xBU1NfTkFNRV9TRUFSQ0hfRk9DVVNBQkxFfWB9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbktleURvd249e2UgPT4gdGhpcy5vbkVudGVyUHJlc3NlZChlLCBpbmRleCl9XG4gICAgICAgICAgb25DbGljaz17ZSA9PiB0aGlzLm9uQ2xpY2tIYW5sZGVyKGUsIGluZGV4KX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbihpdGVtLCB0aGlzLmRlZmF1bHRJdGVtUmVuZGVyRnVuY3Rpb24pIDpcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbihpdGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0TGlzdFxuICAgICAgICBpdGVtUmVuZGVyZXI9e2l0ZW1SZW5kZXJlcn1cbiAgICAgICAgbGVuZ3RoPXtkYXRhLmxlbmd0aH1cbiAgICAgICAgdHlwZT1cInVuaWZvcm1cIlxuICAgICAgICB1c2VTdGF0aWNTaXplXG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4gKHRoaXMuc3RhdGUuY29sbGFwc2VkID8gPEZhQ2FyZXRSaWdodCAvPiA6IDxGYUNhcmV0RG93biAvPik7XG5cbiAgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbiA9IGl0ZW0gPT4gKDxzcGFuPntpdGVtLm5hbWV9PC9zcGFuPik7XG5cbiAgc2VsZWN0SXRlbSA9IChrZXkpID0+IHtcbiAgICBjb25zdCBmbGFncyA9IHtcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLmRhdGFba2V5XSwgZmxhZ3MpO1xuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb2xsYXBzZWQ6ICF0aGlzLnN0YXRlLmNvbGxhcHNlZCxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBmb3VuZC1ncm91cC1pdGVtXCIgb25DbGljaz17dGhpcy5vbkdyb3VwQ2xpY2tIYW5sZGVyfT5cbiAgICAgICAge3RoaXMuZ2V0SWNvbigpfVxuICAgICAgICA8c3Bhbj57dGhpcy5wcm9wcy5ncm91cE5hbWV9PC9zcGFuPlxuICAgICAgICB7IXRoaXMuc3RhdGUuY29sbGFwc2VkICYmIHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPiAwID8gdGhpcy5nZXRJdGVtcygpIDogbnVsbH1cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5Qb3BvdmVyRm91bmRJdGVtcy5wcm9wVHlwZXMgPSB7XG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgZ3JvdXBOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhdGE6IGhpZXJhcmNoeUl0ZW1MaXN0U2hhcGUsXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5Qb3BvdmVyRm91bmRJdGVtcy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgZGF0YTogW10sXG4gIGl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbn07XG4iXX0=