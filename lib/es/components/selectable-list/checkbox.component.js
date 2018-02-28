function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import FaCheckSquareO from 'react-icons/lib/fa/check-square-o';
import FaCheckSquare from 'react-icons/lib/fa/check-square';
import FaSquareO from 'react-icons/lib/fa/square-o';

var ItemCheckbox = function (_React$PureComponent) {
  _inherits(ItemCheckbox, _React$PureComponent);

  function ItemCheckbox(props) {
    _classCallCheck(this, ItemCheckbox);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.getIcon = function () {
      var icon = null;
      if (_this.state.checked) {
        icon = _this.props.disabled ? React.createElement(FaCheckSquareO, null) : React.createElement(FaCheckSquare, null);
      } else if (!_this.state.checked && !_this.props.disabled) {
        icon = React.createElement(FaSquareO, null);
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
    return React.createElement(
      'div',
      { className: 'oc-list-item-checkbox', onClick: this.clickHandler },
      this.getIcon()
    );
  };

  return ItemCheckbox;
}(React.PureComponent);

export { ItemCheckbox as default };


ItemCheckbox.defaultProps = {
  disabled: false,
  checked: false,
  onCheck: function onCheck() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFDaGVja1NxdWFyZU8iLCJGYUNoZWNrU3F1YXJlIiwiRmFTcXVhcmVPIiwiSXRlbUNoZWNrYm94IiwicHJvcHMiLCJnZXRJY29uIiwiaWNvbiIsInN0YXRlIiwiY2hlY2tlZCIsImRpc2FibGVkIiwiY2xpY2tIYW5kbGVyIiwibmV3Q2hlY2tlZFN0YXRlIiwic2V0U3RhdGUiLCJvbkNoZWNrIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLG1DQUEzQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsaUNBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQiw2QkFBdEI7O0lBRXFCQyxZOzs7QUFDbkIsd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFlbkJDLE9BZm1CLEdBZVQsWUFBTTtBQUNkLFVBQUlDLE9BQU8sSUFBWDtBQUNBLFVBQUksTUFBS0MsS0FBTCxDQUFXQyxPQUFmLEVBQXdCO0FBQ3RCRixlQUFPLE1BQUtGLEtBQUwsQ0FBV0ssUUFBWCxHQUFzQixvQkFBQyxjQUFELE9BQXRCLEdBQTJDLG9CQUFDLGFBQUQsT0FBbEQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtKLEtBQUwsQ0FBV0ssUUFBdkMsRUFBaUQ7QUFDdERILGVBQU8sb0JBQUMsU0FBRCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0EsSUFBUDtBQUNELEtBeEJrQjs7QUFBQSxVQTBCbkJJLFlBMUJtQixHQTBCSixZQUFNO0FBQ25CLFVBQUksQ0FBQyxNQUFLTixLQUFMLENBQVdLLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQU1FLGtCQUFrQixDQUFDLE1BQUtKLEtBQUwsQ0FBV0MsT0FBcEM7QUFDQSxjQUFLSSxRQUFMLENBQWM7QUFDWkosbUJBQVNHO0FBREcsU0FBZDtBQUdBLGNBQUtQLEtBQUwsQ0FBV1MsT0FBWCxDQUFtQkYsZUFBbkI7QUFDRDtBQUNGLEtBbENrQjs7QUFFakIsVUFBS0osS0FBTCxHQUFhO0FBQ1hDLGVBQVNKLE1BQU1JO0FBREosS0FBYjtBQUZpQjtBQUtsQjs7eUJBRURNLHlCLHNDQUEwQkMsUyxFQUFXO0FBQ25DLFFBQUlBLFVBQVVQLE9BQVYsS0FBc0IsS0FBS0ksUUFBTCxDQUFjSixPQUF4QyxFQUFpRDtBQUMvQyxXQUFLSSxRQUFMLENBQWM7QUFDWkosaUJBQVNPLFVBQVVQO0FBRFAsT0FBZDtBQUdEO0FBQ0YsRzs7eUJBdUJEUSxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHVCQUFmLEVBQXVDLFNBQVMsS0FBS04sWUFBckQ7QUFDSSxXQUFLTCxPQUFMO0FBREosS0FERjtBQUtELEc7OztFQTNDdUNQLE1BQU1tQixhOztTQUEzQmQsWTs7O0FBb0RyQkEsYUFBYWUsWUFBYixHQUE0QjtBQUMxQlQsWUFBVSxLQURnQjtBQUUxQkQsV0FBUyxLQUZpQjtBQUcxQkssV0FBUyxtQkFBTSxDQUFFO0FBSFMsQ0FBNUIiLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEZhQ2hlY2tTcXVhcmVPIGZyb20gJ3JlYWN0LWljb25zL2xpYi9mYS9jaGVjay1zcXVhcmUtbyc7XG5pbXBvcnQgRmFDaGVja1NxdWFyZSBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hlY2stc3F1YXJlJztcbmltcG9ydCBGYVNxdWFyZU8gZnJvbSAncmVhY3QtaWNvbnMvbGliL2ZhL3NxdWFyZS1vJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkOiBwcm9wcy5jaGVja2VkLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZCAhPT0gdGhpcy5zZXRTdGF0ZS5jaGVja2VkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hlY2tlZDogbmV4dFByb3BzLmNoZWNrZWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRJY29uID0gKCkgPT4ge1xuICAgIGxldCBpY29uID0gbnVsbDtcbiAgICBpZiAodGhpcy5zdGF0ZS5jaGVja2VkKSB7XG4gICAgICBpY29uID0gdGhpcy5wcm9wcy5kaXNhYmxlZCA/IDxGYUNoZWNrU3F1YXJlTyAvPiA6IDxGYUNoZWNrU3F1YXJlIC8+O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuY2hlY2tlZCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgaWNvbiA9IDxGYVNxdWFyZU8gLz47XG4gICAgfVxuXG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBjbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBjb25zdCBuZXdDaGVja2VkU3RhdGUgPSAhdGhpcy5zdGF0ZS5jaGVja2VkO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNoZWNrZWQ6IG5ld0NoZWNrZWRTdGF0ZSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoZWNrKG5ld0NoZWNrZWRTdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWxpc3QtaXRlbS1jaGVja2JveFwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfSA+XG4gICAgICAgIHsgdGhpcy5nZXRJY29uKCkgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5JdGVtQ2hlY2tib3gucHJvcFR5cGVzID0ge1xuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxuICBvbkNoZWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbkl0ZW1DaGVja2JveC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgY2hlY2tlZDogZmFsc2UsXG4gIG9uQ2hlY2s6ICgpID0+IHt9LFxufTtcbiJdfQ==