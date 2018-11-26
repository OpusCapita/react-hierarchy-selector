'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkSquareO = require('react-icons/lib/fa/check-square-o');

var _checkSquareO2 = _interopRequireDefault(_checkSquareO);

var _checkSquare = require('react-icons/lib/fa/check-square');

var _checkSquare2 = _interopRequireDefault(_checkSquare);

var _squareO = require('react-icons/lib/fa/square-o');

var _squareO2 = _interopRequireDefault(_squareO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

var ItemCheckbox = function (_React$PureComponent) {
  _inherits(ItemCheckbox, _React$PureComponent);

  function ItemCheckbox(props) {
    _classCallCheck(this, ItemCheckbox);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      var icon = null;
      if (_this.state.checked) {
        icon = _this.props.disabled ? _react2.default.createElement(_checkSquareO2.default, null) : _react2.default.createElement(_checkSquare2.default, null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = _react2.default.createElement(_squareO2.default, null);
      }

      return icon;
    };

    _this.clickHandler = function () {
      if (!_this.props.disabled) {
        var newCheckedState = !_this.state.checked;
        _this.setState({
          checked: newCheckedState
        });
        _this.props.onCheck(newCheckedState);
      }
    };

    _this.state = {
      checked: props.checked
    };
    return _this;
  }

  ItemCheckbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.setState.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  };

  ItemCheckbox.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'oc-list-item-checkbox', onClick: this.clickHandler },
      this.getIcon()
    );
  };

  return ItemCheckbox;
}(_react2.default.PureComponent);

exports.default = ItemCheckbox;


ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW1DaGVja2JveCIsInByb3BzIiwiZ2V0SWNvbiIsImljb24iLCJzdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNsaWNrSGFuZGxlciIsIm5ld0NoZWNrZWRTdGF0ZSIsInNldFN0YXRlIiwib25DaGVjayIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFQQTtBQUNBOztJQVFxQkEsWTs7O0FBQ25CLHdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBZW5CQyxPQWZtQixHQWVULFlBQU07QUFDZCxVQUFJQyxPQUFPLElBQVg7QUFDQSxVQUFJLE1BQUtDLEtBQUwsQ0FBV0MsT0FBZixFQUF3QjtBQUN0QkYsZUFBTyxNQUFLRixLQUFMLENBQVdLLFFBQVgsR0FBc0IsOEJBQUMsc0JBQUQsT0FBdEIsR0FBMkMsOEJBQUMscUJBQUQsT0FBbEQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtKLEtBQUwsQ0FBV0ssUUFBdkMsRUFBaUQ7QUFDdERILGVBQU8sOEJBQUMsaUJBQUQsT0FBUDtBQUNEOztBQUVELGFBQU9BLElBQVA7QUFDRCxLQXhCa0I7O0FBQUEsVUEwQm5CSSxZQTFCbUIsR0EwQkosWUFBTTtBQUNuQixVQUFJLENBQUMsTUFBS04sS0FBTCxDQUFXSyxRQUFoQixFQUEwQjtBQUN4QixZQUFNRSxrQkFBa0IsQ0FBQyxNQUFLSixLQUFMLENBQVdDLE9BQXBDO0FBQ0EsY0FBS0ksUUFBTCxDQUFjO0FBQ1pKLG1CQUFTRztBQURHLFNBQWQ7QUFHQSxjQUFLUCxLQUFMLENBQVdTLE9BQVgsQ0FBbUJGLGVBQW5CO0FBQ0Q7QUFDRixLQWxDa0I7O0FBRWpCLFVBQUtKLEtBQUwsR0FBYTtBQUNYQyxlQUFTSixNQUFNSTtBQURKLEtBQWI7QUFGaUI7QUFLbEI7O3lCQUVETSx5QixzQ0FBMEJDLFMsRUFBVztBQUNuQyxRQUFJQSxVQUFVUCxPQUFWLEtBQXNCLEtBQUtJLFFBQUwsQ0FBY0osT0FBeEMsRUFBaUQ7QUFDL0MsV0FBS0ksUUFBTCxDQUFjO0FBQ1pKLGlCQUFTTyxVQUFVUDtBQURQLE9BQWQ7QUFHRDtBQUNGLEc7O3lCQXVCRFEsTSxxQkFBUztBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSx1QkFBZixFQUF1QyxTQUFTLEtBQUtOLFlBQXJEO0FBQ0ksV0FBS0wsT0FBTDtBQURKLEtBREY7QUFLRCxHOzs7RUEzQ3VDWSxnQkFBTUMsYTs7a0JBQTNCZixZOzs7QUFvRHJCQSxhQUFhZ0IsWUFBYixHQUE0QjtBQUMxQlYsWUFBVSxLQURnQjtBQUUxQkQsV0FBUyxLQUZpQjtBQUcxQkssV0FBUyxtQkFBTSxDQUFFO0FBSFMsQ0FBNUIiLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hlY2tTcXVhcmVPIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjay1zcXVhcmUtbyc7XG5pbXBvcnQgRmFDaGVja1NxdWFyZSBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hlY2stc3F1YXJlJztcbmltcG9ydCBGYVNxdWFyZU8gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3NxdWFyZS1vJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkOiBwcm9wcy5jaGVja2VkLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZCAhPT0gdGhpcy5zZXRTdGF0ZS5jaGVja2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZDogbmV4dFByb3BzLmNoZWNrZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4ge1xuICAgIGxldCBpY29uID0gbnVsbDtcbiAgICBpZiAodGhpcy5zdGF0ZS5jaGVja2VkKSB7XG4gICAgICBpY29uID0gdGhpcy5wcm9wcy5kaXNhYmxlZCA/IDxGYUNoZWNrU3F1YXJlTyAvPiA6IDxGYUNoZWNrU3F1YXJlIC8+O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY2hlY2tlZCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgaWNvbiA9IDxGYVNxdWFyZU8gLz47XG4gICAgfVxuXG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBjbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBjb25zdCBuZXdDaGVja2VkU3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNoZWNrZWQ6IG5ld0NoZWNrZWRTdGF0ZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoZWNrKG5ld0NoZWNrZWRTdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWxpc3QtaXRlbS1jaGVja2JveFwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfSA+XG4gICAgICAgIHsgdGhpcy5nZXRJY29uKCkgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JdGVtQ2hlY2tib3gucHJvcFR5cGVzID0ge1xuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkl0ZW1DaGVja2JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgY2hlY2tlZDogZmFsc2UsXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==