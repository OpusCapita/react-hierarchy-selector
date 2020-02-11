function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckSquare, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

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
        icon = _this.props.disabled ? React.createElement(FaCheckSquare, null) : React.createElement(FaRegCheckSquare, null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = React.createElement(FaRegSquare, null);
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
    return React.createElement("div", {
      className: "oc-list-item-checkbox",
      onClick: this.clickHandler
    }, this.getIcon());
  };

  return ItemCheckbox;
}(React.PureComponent);

export { ItemCheckbox as default };
ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFDaGVja1NxdWFyZSIsIkZhUmVnQ2hlY2tTcXVhcmUiLCJGYVJlZ1NxdWFyZSIsIkl0ZW1DaGVja2JveCIsInByb3BzIiwiaWNvbiIsInN0YXRlIiwiY2hlY2tlZCIsImRpc2FibGVkIiwibmV3Q2hlY2tlZFN0YXRlIiwic2V0U3RhdGUiLCJvbkNoZWNrIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsImNsaWNrSGFuZGxlciIsImdldEljb24iLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTtBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsYUFBVCxFQUF3QkMsZ0JBQXhCLEVBQTBDQyxXQUExQyxRQUE2RCxnQkFBN0Q7O0lBRXFCQyxZOzs7OztBQUNuQix3QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNqQiw0Q0FBTUEsS0FBTjs7QUFEaUIsOERBZVQsWUFBTTtBQUNkLFVBQUlDLElBQUksR0FBRyxJQUFYOztBQUNBLFVBQUksTUFBS0MsS0FBTCxDQUFXQyxPQUFmLEVBQXdCO0FBQ3RCRixRQUFBQSxJQUFJLEdBQUcsTUFBS0QsS0FBTCxDQUFXSSxRQUFYLEdBQXNCLG9CQUFDLGFBQUQsT0FBdEIsR0FBMEMsb0JBQUMsZ0JBQUQsT0FBakQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtILEtBQUwsQ0FBV0ksUUFBdkMsRUFBaUQ7QUFDdERILFFBQUFBLElBQUksR0FBRyxvQkFBQyxXQUFELE9BQVA7QUFDRDs7QUFFRCxhQUFPQSxJQUFQO0FBQ0QsS0F4QmtCOztBQUFBLG1FQTBCSixZQUFNO0FBQ25CLFVBQUksQ0FBQyxNQUFLRCxLQUFMLENBQVdJLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQU1DLGVBQWUsR0FBRyxDQUFDLE1BQUtILEtBQUwsQ0FBV0MsT0FBcEM7O0FBQ0EsY0FBS0csUUFBTCxDQUFjO0FBQ1pILFVBQUFBLE9BQU8sRUFBRUU7QUFERyxTQUFkOztBQUdBLGNBQUtMLEtBQUwsQ0FBV08sT0FBWCxDQUFtQkYsZUFBbkI7QUFDRDtBQUNGLEtBbENrQjs7QUFFakIsVUFBS0gsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLE9BQU8sRUFBRUgsS0FBSyxDQUFDRztBQURKLEtBQWI7QUFGaUI7QUFLbEI7Ozs7U0FFREsseUIsR0FBQSxtQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQ25DLFFBQUlBLFNBQVMsQ0FBQ04sT0FBVixLQUFzQixLQUFLRyxRQUFMLENBQWNILE9BQXhDLEVBQWlEO0FBQy9DLFdBQUtHLFFBQUwsQ0FBYztBQUNaSCxRQUFBQSxPQUFPLEVBQUVNLFNBQVMsQ0FBQ047QUFEUCxPQUFkO0FBR0Q7QUFDRixHOztTQXVCRE8sTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDLHVCQUFmO0FBQXVDLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXJELE9BQ0ksS0FBS0MsT0FBTCxFQURKLENBREY7QUFLRCxHOzs7RUEzQ3VDbEIsS0FBSyxDQUFDbUIsYTs7U0FBM0JkLFk7QUFvRHJCQSxZQUFZLENBQUNlLFlBQWIsR0FBNEI7QUFDMUJWLEVBQUFBLFFBQVEsRUFBRSxLQURnQjtBQUUxQkQsRUFBQUEsT0FBTyxFQUFFLEtBRmlCO0FBRzFCSSxFQUFBQSxPQUFPLEVBQUUsbUJBQU0sQ0FBRTtBQUhTLENBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmFDaGVja1NxdWFyZSwgRmFSZWdDaGVja1NxdWFyZSwgRmFSZWdTcXVhcmUgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1DaGVja2JveCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2hlY2tlZDogcHJvcHMuY2hlY2tlZCxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLmNoZWNrZWQgIT09IHRoaXMuc2V0U3RhdGUuY2hlY2tlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNoZWNrZWQ6IG5leHRQcm9wcy5jaGVja2VkLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbiA9ICgpID0+IHtcbiAgICBsZXQgaWNvbiA9IG51bGw7XG4gICAgaWYgKHRoaXMuc3RhdGUuY2hlY2tlZCkge1xuICAgICAgaWNvbiA9IHRoaXMucHJvcHMuZGlzYWJsZWQgPyA8RmFDaGVja1NxdWFyZSAvPiA6IDxGYVJlZ0NoZWNrU3F1YXJlIC8+O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY2hlY2tlZCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgaWNvbiA9IDxGYVJlZ1NxdWFyZSAvPjtcbiAgICB9XG5cbiAgICByZXR1cm4gaWNvbjtcbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnN0IG5ld0NoZWNrZWRTdGF0ZSA9ICF0aGlzLnN0YXRlLmNoZWNrZWQ7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZDogbmV3Q2hlY2tlZFN0YXRlLFxuICAgICAgfSk7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hlY2sobmV3Q2hlY2tlZFN0YXRlKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwib2MtbGlzdC1pdGVtLWNoZWNrYm94XCIgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9ID5cbiAgICAgICAgeyB0aGlzLmdldEljb24oKSB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkl0ZW1DaGVja2JveC5wcm9wVHlwZXMgPSB7XG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuSXRlbUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICBjaGVja2VkOiBmYWxzZSxcbiAgb25DaGVjazogKCkgPT4ge30sXG59O1xuIl19