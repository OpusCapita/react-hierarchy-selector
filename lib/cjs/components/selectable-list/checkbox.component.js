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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW1DaGVja2JveCIsInByb3BzIiwiZ2V0SWNvbiIsImljb24iLCJzdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNsaWNrSGFuZGxlciIsIm5ld0NoZWNrZWRTdGF0ZSIsInNldFN0YXRlIiwib25DaGVjayIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBUEE7QUFDQTs7SUFRcUJBLFk7OztBQUNuQix3QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWVuQkMsT0FmbUIsR0FlVCxZQUFNO0FBQ2QsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSSxNQUFLQyxLQUFMLENBQVdDLE9BQWYsRUFBd0I7QUFDdEJGLGVBQU8sTUFBS0YsS0FBTCxDQUFXSyxRQUFYLEdBQXNCLDJEQUF0QixHQUEyQywwREFBbEQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtKLEtBQUwsQ0FBV0ssUUFBdkMsRUFBaUQ7QUFDdERILGVBQU8sc0RBQVA7QUFDRDs7QUFFRCxhQUFPQSxJQUFQO0FBQ0QsS0F4QmtCOztBQUFBLFVBMEJuQkksWUExQm1CLEdBMEJKLFlBQU07QUFDbkIsVUFBSSxDQUFDLE1BQUtOLEtBQUwsQ0FBV0ssUUFBaEIsRUFBMEI7QUFDeEIsWUFBTUUsa0JBQWtCLENBQUMsTUFBS0osS0FBTCxDQUFXQyxPQUFwQztBQUNBLGNBQUtJLFFBQUwsQ0FBYztBQUNaSixtQkFBU0c7QUFERyxTQUFkO0FBR0EsY0FBS1AsS0FBTCxDQUFXUyxPQUFYLENBQW1CRixlQUFuQjtBQUNEO0FBQ0YsS0FsQ2tCOztBQUVqQixVQUFLSixLQUFMLEdBQWE7QUFDWEMsZUFBU0osTUFBTUk7QUFESixLQUFiO0FBRmlCO0FBS2xCOzt5QkFFRE0seUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVVAsT0FBVixLQUFzQixLQUFLSSxRQUFMLENBQWNKLE9BQXhDLEVBQWlEO0FBQy9DLFdBQUtJLFFBQUwsQ0FBYztBQUNaSixpQkFBU08sVUFBVVA7QUFEUCxPQUFkO0FBR0Q7QUFDRixHOzt5QkF1QkRRLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsdUJBQWYsRUFBdUMsU0FBUyxLQUFLTixZQUFyRDtBQUNJLFdBQUtMLE9BQUw7QUFESixLQURGO0FBS0QsRzs7O0VBM0N1QyxnQkFBTVksYTs7a0JBQTNCZCxZOzs7QUFvRHJCQSxhQUFhZSxZQUFiLEdBQTRCO0FBQzFCVCxZQUFVLEtBRGdCO0FBRTFCRCxXQUFTLEtBRmlCO0FBRzFCSyxXQUFTLG1CQUFNLENBQUU7QUFIUyxDQUE1QiIsImZpbGUiOiJjaGVja2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IEZhQ2hlY2tTcXVhcmVPIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjay1zcXVhcmUtbyc7XHJcbmltcG9ydCBGYUNoZWNrU3F1YXJlIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjay1zcXVhcmUnO1xyXG5pbXBvcnQgRmFTcXVhcmVPIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9zcXVhcmUtbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2hlY2tlZDogcHJvcHMuY2hlY2tlZCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkICE9PSB0aGlzLnNldFN0YXRlLmNoZWNrZWQpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY2hlY2tlZDogbmV4dFByb3BzLmNoZWNrZWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SWNvbiA9ICgpID0+IHtcclxuICAgIGxldCBpY29uID0gbnVsbDtcclxuICAgIGlmICh0aGlzLnN0YXRlLmNoZWNrZWQpIHtcclxuICAgICAgaWNvbiA9IHRoaXMucHJvcHMuZGlzYWJsZWQgPyA8RmFDaGVja1NxdWFyZU8gLz4gOiA8RmFDaGVja1NxdWFyZSAvPjtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY2hlY2tlZCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xyXG4gICAgICBpY29uID0gPEZhU3F1YXJlTyAvPjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWNvbjtcclxuICB9XHJcblxyXG4gIGNsaWNrSGFuZGxlciA9ICgpID0+IHtcclxuICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xyXG4gICAgICBjb25zdCBuZXdDaGVja2VkU3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBjaGVja2VkOiBuZXdDaGVja2VkU3RhdGUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnByb3BzLm9uQ2hlY2sobmV3Q2hlY2tlZFN0YXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtbGlzdC1pdGVtLWNoZWNrYm94XCIgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9ID5cclxuICAgICAgICB7IHRoaXMuZ2V0SWNvbigpIH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuSXRlbUNoZWNrYm94LnByb3BUeXBlcyA9IHtcclxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXHJcbn07XHJcblxyXG5JdGVtQ2hlY2tib3guZGVmYXVsdFByb3BzID0ge1xyXG4gIGRpc2FibGVkOiBmYWxzZSxcclxuICBjaGVja2VkOiBmYWxzZSxcclxuICBvbkNoZWNrOiAoKSA9PiB7fSxcclxufTtcclxuIl19