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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIkl0ZW1DaGVja2JveCIsInByb3BzIiwiZ2V0SWNvbiIsImljb24iLCJzdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNsaWNrSGFuZGxlciIsIm5ld0NoZWNrZWRTdGF0ZSIsInNldFN0YXRlIiwib25DaGVjayIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBUEE7QUFDQTs7SUFRcUJBLFk7OztBQUNuQix3QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQWVuQkMsT0FmbUIsR0FlVCxZQUFNO0FBQ2QsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsVUFBSSxNQUFLQyxLQUFMLENBQVdDLE9BQWYsRUFBd0I7QUFDdEJGLGVBQU8sTUFBS0YsS0FBTCxDQUFXSyxRQUFYLEdBQXNCLDJEQUF0QixHQUEyQywwREFBbEQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtKLEtBQUwsQ0FBV0ssUUFBdkMsRUFBaUQ7QUFDdERILGVBQU8sc0RBQVA7QUFDRDs7QUFFRCxhQUFPQSxJQUFQO0FBQ0QsS0F4QmtCOztBQUFBLFVBMEJuQkksWUExQm1CLEdBMEJKLFlBQU07QUFDbkIsVUFBSSxDQUFDLE1BQUtOLEtBQUwsQ0FBV0ssUUFBaEIsRUFBMEI7QUFDeEIsWUFBTUUsa0JBQWtCLENBQUMsTUFBS0osS0FBTCxDQUFXQyxPQUFwQztBQUNBLGNBQUtJLFFBQUwsQ0FBYztBQUNaSixtQkFBU0c7QUFERyxTQUFkO0FBR0EsY0FBS1AsS0FBTCxDQUFXUyxPQUFYLENBQW1CRixlQUFuQjtBQUNEO0FBQ0YsS0FsQ2tCOztBQUVqQixVQUFLSixLQUFMLEdBQWE7QUFDWEMsZUFBU0osTUFBTUk7QUFESixLQUFiO0FBRmlCO0FBS2xCOzt5QkFFRE0seUIsc0NBQTBCQyxTLEVBQVc7QUFDbkMsUUFBSUEsVUFBVVAsT0FBVixLQUFzQixLQUFLSSxRQUFMLENBQWNKLE9BQXhDLEVBQWlEO0FBQy9DLFdBQUtJLFFBQUwsQ0FBYztBQUNaSixpQkFBU08sVUFBVVA7QUFEUCxPQUFkO0FBR0Q7QUFDRixHOzt5QkF1QkRRLE0scUJBQVM7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsdUJBQWYsRUFBdUMsU0FBUyxLQUFLTixZQUFyRDtBQUNJLFdBQUtMLE9BQUw7QUFESixLQURGO0FBS0QsRzs7O0VBM0N1QyxnQkFBTVksYTs7a0JBQTNCZCxZOzs7QUFvRHJCQSxhQUFhZSxZQUFiLEdBQTRCO0FBQzFCVCxZQUFVLEtBRGdCO0FBRTFCRCxXQUFTLEtBRmlCO0FBRzFCSyxXQUFTLG1CQUFNLENBQUU7QUFIUyxDQUE1QiIsImZpbGUiOiJjaGVja2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgRmFDaGVja1NxdWFyZU8gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL2NoZWNrLXNxdWFyZS1vJztcbmltcG9ydCBGYUNoZWNrU3F1YXJlIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjay1zcXVhcmUnO1xuaW1wb3J0IEZhU3F1YXJlTyBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvc3F1YXJlLW8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtQ2hlY2tib3ggZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNoZWNrZWQ6IHByb3BzLmNoZWNrZWQsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkICE9PSB0aGlzLnNldFN0YXRlLmNoZWNrZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGVja2VkOiBuZXh0UHJvcHMuY2hlY2tlZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24gPSAoKSA9PiB7XG4gICAgbGV0IGljb24gPSBudWxsO1xuICAgIGlmICh0aGlzLnN0YXRlLmNoZWNrZWQpIHtcbiAgICAgIGljb24gPSB0aGlzLnByb3BzLmRpc2FibGVkID8gPEZhQ2hlY2tTcXVhcmVPIC8+IDogPEZhQ2hlY2tTcXVhcmUgLz47XG4gICAgfSBlbHNlIGlmICghdGhpcy5zdGF0ZS5jaGVja2VkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBpY29uID0gPEZhU3F1YXJlTyAvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gaWNvbjtcbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnN0IG5ld0NoZWNrZWRTdGF0ZSA9ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZDogbmV3Q2hlY2tlZFN0YXRlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hlY2sobmV3Q2hlY2tlZFN0YXRlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtbGlzdC1pdGVtLWNoZWNrYm94XCIgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9ID5cbiAgICAgICAgeyB0aGlzLmdldEljb24oKSB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkl0ZW1DaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSXRlbUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBjaGVja2VkOiBmYWxzZSxcbiAgb25DaGVjazogKCkgPT4ge30sXG59O1xuIl19