"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ItemCheckbox =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ItemCheckbox, _React$PureComponent);

  function ItemCheckbox(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getIcon", function () {
      var icon = null;

      if (_this.state.checked) {
        icon = _this.props.disabled ? _react["default"].createElement(_fa.FaCheckSquare, null) : _react["default"].createElement(_fa.FaRegCheckSquare, null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = _react["default"].createElement(_fa.FaRegSquare, null);
      }

      return icon;
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function () {
      if (!_this.props.disabled) {
        var newCheckedState = !_this.state.checked;

        _this.setState({
          checked: newCheckedState
        });

        _this.props.onCheck(newCheckedState);
      }
    });

    _this.state = {
      checked: props.checked
    };
    return _this;
  }

  var _proto = ItemCheckbox.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.setState.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  };

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      className: "oc-list-item-checkbox",
      onClick: this.clickHandler
    }, this.getIcon());
  };

  return ItemCheckbox;
}(_react["default"].PureComponent);

exports["default"] = ItemCheckbox;
ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW1DaGVja2JveCIsInByb3BzIiwiaWNvbiIsInN0YXRlIiwiY2hlY2tlZCIsImRpc2FibGVkIiwibmV3Q2hlY2tlZFN0YXRlIiwic2V0U3RhdGUiLCJvbkNoZWNrIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImNsaWNrSGFuZGxlciIsImdldEljb24iLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7O0FBQ25CLHdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLDRDQUFNQSxLQUFOOztBQURpQiw4REFlVCxZQUFNO0FBQ2QsVUFBSUMsSUFBSSxHQUFHLElBQVg7O0FBQ0EsVUFBSSxNQUFLQyxLQUFMLENBQVdDLE9BQWYsRUFBd0I7QUFDdEJGLFFBQUFBLElBQUksR0FBRyxNQUFLRCxLQUFMLENBQVdJLFFBQVgsR0FBc0IsZ0NBQUMsaUJBQUQsT0FBdEIsR0FBMEMsZ0NBQUMsb0JBQUQsT0FBakQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtILEtBQUwsQ0FBV0ksUUFBdkMsRUFBaUQ7QUFDdERILFFBQUFBLElBQUksR0FBRyxnQ0FBQyxlQUFELE9BQVA7QUFDRDs7QUFFRCxhQUFPQSxJQUFQO0FBQ0QsS0F4QmtCOztBQUFBLG1FQTBCSixZQUFNO0FBQ25CLFVBQUksQ0FBQyxNQUFLRCxLQUFMLENBQVdJLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQU1DLGVBQWUsR0FBRyxDQUFDLE1BQUtILEtBQUwsQ0FBV0MsT0FBcEM7O0FBQ0EsY0FBS0csUUFBTCxDQUFjO0FBQ1pILFVBQUFBLE9BQU8sRUFBRUU7QUFERyxTQUFkOztBQUdBLGNBQUtMLEtBQUwsQ0FBV08sT0FBWCxDQUFtQkYsZUFBbkI7QUFDRDtBQUNGLEtBbENrQjs7QUFFakIsVUFBS0gsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLE9BQU8sRUFBRUgsS0FBSyxDQUFDRztBQURKLEtBQWI7QUFGaUI7QUFLbEI7Ozs7U0FFREsseUIsR0FBQSxtQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQ25DLFFBQUlBLFNBQVMsQ0FBQ04sT0FBVixLQUFzQixLQUFLRyxRQUFMLENBQWNILE9BQXhDLEVBQWlEO0FBQy9DLFdBQUtHLFFBQUwsQ0FBYztBQUNaSCxRQUFBQSxPQUFPLEVBQUVNLFNBQVMsQ0FBQ047QUFEUCxPQUFkO0FBR0Q7QUFDRixHOztTQXVCRE8sTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDLHVCQUFmO0FBQXVDLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXJELE9BQ0ksS0FBS0MsT0FBTCxFQURKLENBREY7QUFLRCxHOzs7RUEzQ3VDQyxrQkFBTUMsYTs7O0FBb0RoRGYsWUFBWSxDQUFDZ0IsWUFBYixHQUE0QjtBQUMxQlgsRUFBQUEsUUFBUSxFQUFFLEtBRGdCO0FBRTFCRCxFQUFBQSxPQUFPLEVBQUUsS0FGaUI7QUFHMUJJLEVBQUFBLE9BQU8sRUFBRSxtQkFBTSxDQUFFO0FBSFMsQ0FBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGYUNoZWNrU3F1YXJlLCBGYVJlZ0NoZWNrU3F1YXJlLCBGYVJlZ1NxdWFyZSB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkOiBwcm9wcy5jaGVja2VkLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZCAhPT0gdGhpcy5zZXRTdGF0ZS5jaGVja2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZDogbmV4dFByb3BzLmNoZWNrZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4ge1xuICAgIGxldCBpY29uID0gbnVsbDtcbiAgICBpZiAodGhpcy5zdGF0ZS5jaGVja2VkKSB7XG4gICAgICBpY29uID0gdGhpcy5wcm9wcy5kaXNhYmxlZCA/IDxGYUNoZWNrU3F1YXJlIC8+IDogPEZhUmVnQ2hlY2tTcXVhcmUgLz47XG4gICAgfSBlbHNlIGlmICghdGhpcy5zdGF0ZS5jaGVja2VkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBpY29uID0gPEZhUmVnU3F1YXJlIC8+O1xuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgY2xpY2tIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgY29uc3QgbmV3Q2hlY2tlZFN0YXRlID0gIXRoaXMuc3RhdGUuY2hlY2tlZDtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGVja2VkOiBuZXdDaGVja2VkU3RhdGUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMucHJvcHMub25DaGVjayhuZXdDaGVja2VkU3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1saXN0LWl0ZW0tY2hlY2tib3hcIiBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn0gPlxuICAgICAgICB7IHRoaXMuZ2V0SWNvbigpIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuSXRlbUNoZWNrYm94LnByb3BUeXBlcyA9IHtcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5JdGVtQ2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xuICBkaXNhYmxlZDogZmFsc2UsXG4gIGNoZWNrZWQ6IGZhbHNlLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbn07XG4iXX0=