"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkbox = _interopRequireDefault(require("./checkbox.component"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function defaultItemRenderFunction(item) {
  return _react["default"].createElement("span", null, item.name);
}

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (event) {
      _this.props.onClick(_this.props.item.id, event);
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (checkState) {
      _this.props.onCheck(_this.props.item.id, checkState);
    });

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
        checked = _this$props.checked,
        checkDisabled = _this$props.checkDisabled,
        selected = _this$props.selected,
        item = _this$props.item;
    if (checked !== nextProps.checked) return true;
    if (checkDisabled !== nextProps.checkDisabled) return true;
    if (selected !== nextProps.selected) return true;
    if (item !== nextProps.item || item.id !== nextProps.item.id) return true;
    return false;
  };

  _proto.render = function render() {
    var names = (0, _classnames["default"])({
      'oc-selectable-list-item': true,
      selected: this.props.selected
    });
    return _react["default"].createElement("div", {
      className: names,
      onClick: this.clickHandler
    }, _react["default"].createElement("div", {
      className: "oc-selectable-list-item-container"
    }, _react["default"].createElement(_checkbox["default"], {
      disabled: this.props.checkDisabled,
      onCheck: this.checkHandler,
      checked: this.props.checked
    }), _react["default"].createElement("div", {
      className: "oc-list-item-text-container"
    }, this.props.itemRenderFunction ? this.props.itemRenderFunction(this.props.item, defaultItemRenderFunction) : defaultItemRenderFunction(this.props.item))));
  };

  return ListItem;
}(_react["default"].Component);

exports["default"] = ListItem;
ListItem.defaultProps = {
  checked: false,
  checkDisabled: false,
  itemRenderFunction: null,
  selected: false,
  onCheck: function onCheck() {},
  onClick: function onClick() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9saXN0LWl0ZW0uY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uIiwiaXRlbSIsIm5hbWUiLCJMaXN0SXRlbSIsImV2ZW50IiwicHJvcHMiLCJvbkNsaWNrIiwiaWQiLCJjaGVja1N0YXRlIiwib25DaGVjayIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImNoZWNrZWQiLCJjaGVja0Rpc2FibGVkIiwic2VsZWN0ZWQiLCJyZW5kZXIiLCJuYW1lcyIsImNsaWNrSGFuZGxlciIsImNoZWNrSGFuZGxlciIsIml0ZW1SZW5kZXJGdW5jdGlvbiIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUdBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EseUJBQVQsQ0FBbUNDLElBQW5DLEVBQXlDO0FBQ3ZDLFNBQ0UsOENBQ0dBLElBQUksQ0FBQ0MsSUFEUixDQURGO0FBS0Q7O0lBRW9CQyxROzs7Ozs7Ozs7Ozs7OzttRUFpQkosVUFBQ0MsS0FBRCxFQUFXO0FBQ3hCLFlBQUtDLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixNQUFLRCxLQUFMLENBQVdKLElBQVgsQ0FBZ0JNLEVBQW5DLEVBQXVDSCxLQUF2QztBQUNELEs7O21FQUVjLFVBQUNJLFVBQUQsRUFBZ0I7QUFDN0IsWUFBS0gsS0FBTCxDQUFXSSxPQUFYLENBQW1CLE1BQUtKLEtBQUwsQ0FBV0osSUFBWCxDQUFnQk0sRUFBbkMsRUFBdUNDLFVBQXZDO0FBQ0QsSzs7Ozs7OztTQXRCREUscUIsR0FBQSwrQkFBc0JDLFNBQXRCLEVBQWlDO0FBQUEsc0JBTTNCLEtBQUtOLEtBTnNCO0FBQUEsUUFFN0JPLE9BRjZCLGVBRTdCQSxPQUY2QjtBQUFBLFFBRzdCQyxhQUg2QixlQUc3QkEsYUFINkI7QUFBQSxRQUk3QkMsUUFKNkIsZUFJN0JBLFFBSjZCO0FBQUEsUUFLN0JiLElBTDZCLGVBSzdCQSxJQUw2QjtBQVEvQixRQUFJVyxPQUFPLEtBQUtELFNBQVMsQ0FBQ0MsT0FBMUIsRUFBbUMsT0FBTyxJQUFQO0FBQ25DLFFBQUlDLGFBQWEsS0FBS0YsU0FBUyxDQUFDRSxhQUFoQyxFQUErQyxPQUFPLElBQVA7QUFDL0MsUUFBSUMsUUFBUSxLQUFLSCxTQUFTLENBQUNHLFFBQTNCLEVBQXFDLE9BQU8sSUFBUDtBQUNyQyxRQUFJYixJQUFJLEtBQUtVLFNBQVMsQ0FBQ1YsSUFBbkIsSUFBMkJBLElBQUksQ0FBQ00sRUFBTCxLQUFZSSxTQUFTLENBQUNWLElBQVYsQ0FBZU0sRUFBMUQsRUFBOEQsT0FBTyxJQUFQO0FBRTlELFdBQU8sS0FBUDtBQUNELEc7O1NBVURRLE0sR0FBQSxrQkFBUztBQUNQLFFBQU1DLEtBQUssR0FBRyw0QkFBVztBQUN2QixpQ0FBMkIsSUFESjtBQUV2QkYsTUFBQUEsUUFBUSxFQUFFLEtBQUtULEtBQUwsQ0FBV1M7QUFGRSxLQUFYLENBQWQ7QUFJQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUVFLEtBQWhCO0FBQXVCLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXJDLE9BQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0UsZ0NBQUMsb0JBQUQ7QUFDRSxNQUFBLFFBQVEsRUFBRSxLQUFLWixLQUFMLENBQVdRLGFBRHZCO0FBRUUsTUFBQSxPQUFPLEVBQUUsS0FBS0ssWUFGaEI7QUFHRSxNQUFBLE9BQU8sRUFBRSxLQUFLYixLQUFMLENBQVdPO0FBSHRCLE1BREYsRUFNRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLUCxLQUFMLENBQVdjLGtCQUFYLEdBQ0MsS0FBS2QsS0FBTCxDQUFXYyxrQkFBWCxDQUE4QixLQUFLZCxLQUFMLENBQVdKLElBQXpDLEVBQStDRCx5QkFBL0MsQ0FERCxHQUVDQSx5QkFBeUIsQ0FBQyxLQUFLSyxLQUFMLENBQVdKLElBQVosQ0FIN0IsQ0FORixDQURGLENBREY7QUFpQkQsRzs7O0VBL0NtQ21CLGtCQUFNQyxTOzs7QUE0RDVDbEIsUUFBUSxDQUFDbUIsWUFBVCxHQUF3QjtBQUN0QlYsRUFBQUEsT0FBTyxFQUFFLEtBRGE7QUFFdEJDLEVBQUFBLGFBQWEsRUFBRSxLQUZPO0FBR3RCTSxFQUFBQSxrQkFBa0IsRUFBRSxJQUhFO0FBSXRCTCxFQUFBQSxRQUFRLEVBQUUsS0FKWTtBQUt0QkwsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUUsQ0FMSztBQU10QkgsRUFBQUEsT0FBTyxFQUFFLG1CQUFNLENBQUU7QUFOSyxDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi9jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgaGllcmFyY2h5SXRlbVNoYXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKGl0ZW0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3Bhbj5cbiAgICAgIHtpdGVtLm5hbWV9XG4gICAgPC9zcGFuPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGVja2VkLFxuICAgICAgY2hlY2tEaXNhYmxlZCxcbiAgICAgIHNlbGVjdGVkLFxuICAgICAgaXRlbSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChjaGVja2VkICE9PSBuZXh0UHJvcHMuY2hlY2tlZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGNoZWNrRGlzYWJsZWQgIT09IG5leHRQcm9wcy5jaGVja0Rpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc2VsZWN0ZWQgIT09IG5leHRQcm9wcy5zZWxlY3RlZCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGl0ZW0gIT09IG5leHRQcm9wcy5pdGVtIHx8IGl0ZW0uaWQgIT09IG5leHRQcm9wcy5pdGVtLmlkKSByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9IChldmVudCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLml0ZW0uaWQsIGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChjaGVja1N0YXRlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkNoZWNrKHRoaXMucHJvcHMuaXRlbS5pZCwgY2hlY2tTdGF0ZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbmFtZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICdvYy1zZWxlY3RhYmxlLWxpc3QtaXRlbSc6IHRydWUsXG4gICAgICBzZWxlY3RlZDogdGhpcy5wcm9wcy5zZWxlY3RlZCxcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e25hbWVzfSBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn0gPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLXNlbGVjdGFibGUtbGlzdC1pdGVtLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuY2hlY2tEaXNhYmxlZH1cbiAgICAgICAgICAgIG9uQ2hlY2s9e3RoaXMuY2hlY2tIYW5kbGVyfVxuICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1saXN0LWl0ZW0tdGV4dC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLml0ZW1SZW5kZXJGdW5jdGlvbiA/XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKHRoaXMucHJvcHMuaXRlbSwgZGVmYXVsdEl0ZW1SZW5kZXJGdW5jdGlvbikgOlxuICAgICAgICAgICAgICBkZWZhdWx0SXRlbVJlbmRlckZ1bmN0aW9uKHRoaXMucHJvcHMuaXRlbSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxpc3RJdGVtLnByb3BUeXBlcyA9IHtcbiAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoZWNrRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBpdGVtOiBoaWVyYXJjaHlJdGVtU2hhcGUuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5MaXN0SXRlbS5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoZWNrZWQ6IGZhbHNlLFxuICBjaGVja0Rpc2FibGVkOiBmYWxzZSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWxlY3RlZDogZmFsc2UsXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=