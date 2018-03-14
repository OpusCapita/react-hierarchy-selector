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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGFibGUtbGlzdC9jaGVja2JveC5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmFDaGVja1NxdWFyZU8iLCJGYUNoZWNrU3F1YXJlIiwiRmFTcXVhcmVPIiwiSXRlbUNoZWNrYm94IiwicHJvcHMiLCJnZXRJY29uIiwiaWNvbiIsInN0YXRlIiwiY2hlY2tlZCIsImRpc2FibGVkIiwiY2xpY2tIYW5kbGVyIiwibmV3Q2hlY2tlZFN0YXRlIiwic2V0U3RhdGUiLCJvbkNoZWNrIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxjQUFQLE1BQTJCLG1DQUEzQjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsaUNBQTFCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQiw2QkFBdEI7O0lBRXFCQyxZOzs7QUFDbkIsd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFlbkJDLE9BZm1CLEdBZVQsWUFBTTtBQUNkLFVBQUlDLE9BQU8sSUFBWDtBQUNBLFVBQUksTUFBS0MsS0FBTCxDQUFXQyxPQUFmLEVBQXdCO0FBQ3RCRixlQUFPLE1BQUtGLEtBQUwsQ0FBV0ssUUFBWCxHQUFzQixvQkFBQyxjQUFELE9BQXRCLEdBQTJDLG9CQUFDLGFBQUQsT0FBbEQ7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDLE1BQUtGLEtBQUwsQ0FBV0MsT0FBWixJQUF1QixDQUFDLE1BQUtKLEtBQUwsQ0FBV0ssUUFBdkMsRUFBaUQ7QUFDdERILGVBQU8sb0JBQUMsU0FBRCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0EsSUFBUDtBQUNELEtBeEJrQjs7QUFBQSxVQTBCbkJJLFlBMUJtQixHQTBCSixZQUFNO0FBQ25CLFVBQUksQ0FBQyxNQUFLTixLQUFMLENBQVdLLFFBQWhCLEVBQTBCO0FBQ3hCLFlBQU1FLGtCQUFrQixDQUFDLE1BQUtKLEtBQUwsQ0FBV0MsT0FBcEM7QUFDQSxjQUFLSSxRQUFMLENBQWM7QUFDWkosbUJBQVNHO0FBREcsU0FBZDtBQUdBLGNBQUtQLEtBQUwsQ0FBV1MsT0FBWCxDQUFtQkYsZUFBbkI7QUFDRDtBQUNGLEtBbENrQjs7QUFFakIsVUFBS0osS0FBTCxHQUFhO0FBQ1hDLGVBQVNKLE1BQU1JO0FBREosS0FBYjtBQUZpQjtBQUtsQjs7eUJBRURNLHlCLHNDQUEwQkMsUyxFQUFXO0FBQ25DLFFBQUlBLFVBQVVQLE9BQVYsS0FBc0IsS0FBS0ksUUFBTCxDQUFjSixPQUF4QyxFQUFpRDtBQUMvQyxXQUFLSSxRQUFMLENBQWM7QUFDWkosaUJBQVNPLFVBQVVQO0FBRFAsT0FBZDtBQUdEO0FBQ0YsRzs7eUJBdUJEUSxNLHFCQUFTO0FBQ1AsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHVCQUFmLEVBQXVDLFNBQVMsS0FBS04sWUFBckQ7QUFDSSxXQUFLTCxPQUFMO0FBREosS0FERjtBQUtELEc7OztFQTNDdUNQLE1BQU1tQixhOztTQUEzQmQsWTs7O0FBb0RyQkEsYUFBYWUsWUFBYixHQUE0QjtBQUMxQlQsWUFBVSxLQURnQjtBQUUxQkQsV0FBUyxLQUZpQjtBQUcxQkssV0FBUyxtQkFBTSxDQUFFO0FBSFMsQ0FBNUIiLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBGYUNoZWNrU3F1YXJlTyBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hlY2stc3F1YXJlLW8nO1xyXG5pbXBvcnQgRmFDaGVja1NxdWFyZSBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvY2hlY2stc3F1YXJlJztcclxuaW1wb3J0IEZhU3F1YXJlTyBmcm9tICdyZWFjdC1pY29ucy9saWIvZmEvc3F1YXJlLW8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUNoZWNrYm94IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGNoZWNrZWQ6IHByb3BzLmNoZWNrZWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIGlmIChuZXh0UHJvcHMuY2hlY2tlZCAhPT0gdGhpcy5zZXRTdGF0ZS5jaGVja2VkKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGNoZWNrZWQ6IG5leHRQcm9wcy5jaGVja2VkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEljb24gPSAoKSA9PiB7XHJcbiAgICBsZXQgaWNvbiA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5jaGVja2VkKSB7XHJcbiAgICAgIGljb24gPSB0aGlzLnByb3BzLmRpc2FibGVkID8gPEZhQ2hlY2tTcXVhcmVPIC8+IDogPEZhQ2hlY2tTcXVhcmUgLz47XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmNoZWNrZWQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcclxuICAgICAgaWNvbiA9IDxGYVNxdWFyZU8gLz47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGljb247XHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcclxuICAgICAgY29uc3QgbmV3Q2hlY2tlZFN0YXRlID0gIXRoaXMuc3RhdGUuY2hlY2tlZDtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY2hlY2tlZDogbmV3Q2hlY2tlZFN0YXRlLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wcm9wcy5vbkNoZWNrKG5ld0NoZWNrZWRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWxpc3QtaXRlbS1jaGVja2JveFwiIG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfSA+XHJcbiAgICAgICAgeyB0aGlzLmdldEljb24oKSB9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbkl0ZW1DaGVja2JveC5wcm9wVHlwZXMgPSB7XHJcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gIGNoZWNrZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gIG9uQ2hlY2s6IFByb3BUeXBlcy5mdW5jLFxyXG59O1xyXG5cclxuSXRlbUNoZWNrYm94LmRlZmF1bHRQcm9wcyA9IHtcclxuICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgY2hlY2tlZDogZmFsc2UsXHJcbiAgb25DaGVjazogKCkgPT4ge30sXHJcbn07XHJcbiJdfQ==